const request = require('request');

app.get('/advertiser/adv_influencer_list', async (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    const updateInfSnsInfo = await go(
        QUERY `SELECT id, sns_info FROM users WHERE auth = 'influencer' and sns_info is not null`,
        map(async a => {
            let instagramMedia = await getInstagramMedia(a.sns_info.instagram_id, a.sns_info.instagram_access_token, 6).then(data => data);
            a.sns_info.instagram_followers = instagramMedia.followers_count;
            a.sns_info.instagram_follows = instagramMedia.follows_count;
            a.sns_info.instagram_profile_img = instagramMedia.profile_picture_url;
            let [commentAverage, likeAverage] = go(
                instagramMedia.media.data,
                a => {
                    let commentC = 0;
                    let likeC = 0;
                    for (const iter of a) {
                        commentC += iter.comments_count;
                        likeC += iter.like_count;
                    }
                    return [Math.ceil(commentC/a.length), Math.ceil(likeC/a.length)];
                }
            );
            Object.assign(a.sns_info, {"instagram_media" : instagramMedia.media.data}, {"instagram_comment_average" : commentAverage}, {"instagram_like_average" : likeAverage});
            QUERY `UPDATE users SET sns_info = ${JSON.stringify(a.sns_info)} WHERE id = ${a.id}`;
            return a;
        })
    )
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
            인플루언서 목록
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_influencer_list.js"></script>
            <script>

            </script>
        `
    }));
});

const getInstagramMedia = async (id, accessToken, limit) => {
    !limit ? limit = 3 : limit;
    return new Promise((resolve, reject) => request.get(`https://graph.facebook.com/v3.2/${id}/?fields=media.limit(${limit})%7Bcaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Ctimestamp%2Cthumbnail_url%7D%2Cfollowers_count%2Cfollows_count%2Cprofile_picture_url&limit=3&access_token=${accessToken}`, 
        (err, res, body) => resolve(JSON.parse(body)))
    );
}
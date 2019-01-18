const request = require('request');

app.get('/advertiser/adv_influencer_list', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');

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
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_influencer_list_common.css"/>
            <link rel="stylesheet" href="/front/css/advertiser/adv_influencer_list.css"/>
        `,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
        <div id="main">
            <div class="container">
                <div class="breadcrumbs">
                    <a>홈</a>
                    <span>캠페인 리스트</span>
                </div>
                <div class="terms_wrap">
                    <button type="button" class="terms_btn">조건 초기화</button>
                    <h3>검색조건</h3>
                    <table class="terms">
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <select title="카테고리 대분류" class="form">
                                    <option>대분류</option>
                                    <option>뷰티샵</option>
                                    <option>패션샵</option>
                                    <option>푸드건강</option>
                                    <option>라이프</option>
                                </select>
                            </td>
                            <td>
                                <select title="카테고리 대분류" class="form">
                                    <option>중분류</option>
                                    <option>뷰티샵</option>
                                    <option>패션샵</option>
                                    <option>푸드건강</option>
                                    <option>라이프</option>
                                </select>
                            </td>
                            <td>
                                <select title="카테고리 대분류" class="form">
                                    <option>소분류</option>
                                    <option>뷰티샵</option>
                                    <option>패션샵</option>
                                    <option>푸드건강</option>
                                    <option>라이프</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>연령대</th>
                            <td>
                                <select title="연령대에서" class="form">
                                    <option>전체</option>
                                    <option>10대</option>
                                    <option>20대</option>
                                    <option>30대</option>
                                    <option>40대</option>
                                    <option>50대</option>
                                    <option>60대</option>
                                </select>
                                <em>~</em>
                                <select title="연령대까지" class="form">
                                    <option>전체</option>
                                    <option>10대</option>
                                    <option>20대</option>
                                    <option>30대</option>
                                    <option>40대</option>
                                    <option>50대</option>
                                    <option>60대</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>팔로우 수</th>
                            <td>
                                <select title="팔로우수에서" class="form">
                                    <option>500</option>
                                    <option>1,000</option>
                                    <option>5,000</option>
                                    <option>10,000</option>
                                    <option>15,000</option>
                                    <option>20,000</option>
                                    <option>25,000</option>
                                    <option>30,000</option>
                                    <option>35,000</option>
                                    <option>40,000</option>
                                    <option>45,000</option>
                                    <option>50,000</option>
                                </select>
                                <em>~</em>
                                <select title="팔로우수까지" class="form">
                                    <option>500</option>
                                    <option>1,000</option>
                                    <option>5,000</option>
                                    <option>10,000</option>
                                    <option>15,000</option>
                                    <option>20,000</option>
                                    <option>25,000</option>
                                    <option>30,000</option>
                                    <option>35,000</option>
                                    <option>40,000</option>
                                    <option>45,000</option>
                                    <option>50,000</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="please_wrap">
                    <h3>인플루언서 리스트</h3>
                    <button type="button" class="make_btn">캠페인만들기</button>
                    <select title="정열 옵션" class="list_form">
                        <option>정열 옵션</option> 
                        <option>전체</option>
                        <option>레벨 높은 순</option>
                        <option>팔로우 많은 순</option>
                        <option>구매전환율 높은 순</option>
                    </select>
                    <table class="please">
                        <caption>캠페인 리스트 등록안내 게시판</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="inf_check">
                                    <input type="checkbox" name="sale_chk" id="inf_click" value="progress">
                                    <label for="inf_click"></label>
                                </th>
                                <th scope="col" class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></th>
                                <th scope="col" class="inf_id">아이디</th>
                                <th scope="col" class="inf_level">레벨</th>
                                <th scope="col" class="inf_follow">총 팔로워수</th>
                                <th scope="col" class="inf_category">카테고리</th>
                                <th scope="col" class="inf_category">연령대</th>
                            </tr>
                        </thead>
                        <tbody id="click_wrap">
                            ${infList(JSON.stringify(updateInfSnsInfo))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_influencer_list.js"></script>
            <script>
                //log($.all('.target'))
                go('#click_wrap', $, AdvInfluencerList.Do.clickTarget);
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

const infList = data => go(
    JSON.parse(data),
    map(a => writeInfList(a.id, a.sns_info.instagram_followers, ['IT','패션'], a.sns_info.instagram_media[0].like_count, a.sns_info.instagram_media[0].comments_count, a.sns_info.instagram_media[0].caption, a.sns_info.instagram_media[0].media_url, go(a.sns_info.instagram_media, map(a => a.media_url))))
)

const writeInfList = (id, followers, category, firstPostLike, firstPostComment, firstPostCaption, firstPostImg, postImg) => {
    let htmlCategoryList = go(
        category,
        map(a => html`
        <li>${a}</li>`)
    );
    let htmlImgList;
    if (postImg.length > 1) {
        htmlImgList = go(
            postImg,
            a => {
                let result;
                for (let i = 1; i < a.length; i++) {
                    result += html`
                    <img src=${a[i]}>`
                }
                return result;
            }
        );
    }
    return html`
    <tr class="target" target="${id}">
        <td class="inf_check">
            <input type="checkbox" name="sale_chk" id="inf_click1" value="progress">
            <label for="inf_click1"></label>
        </td>
        <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
        <td class="inf_id">${id}</td>
        <td class="inf_level">Master</td>
        <td class="inf_follow">${followers}</td>
        <td class="inf_category">
            <ul>
                ${htmlCategoryList}
            </ul>
        </td>
    </tr>
    <tr class="click_hidden hidden" name="${id}">
        <td>
            <img src=${firstPostImg} alt="인스타그램 이미지">
            <div class="click_txt">
                <strong class="like">좋아요 ${firstPostLike}개</strong>
                <strong>댓글수 ${firstPostComment}개</strong>
                <div class="click_main">
                    <strong class="click_comment">${firstPostCaption}</strong>
                </div>
            </div>
            <div class="click_img">
                ${htmlImgList}
            </div>
        </td>
    </tr>`
}
const { get } = require('../../../module/back/util/request');

app.get('/advertiser/adv_campaign_detail', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    const [notification] = await QUERY`SELECT * FROM user_notification WHERE id = ${req.session.user.id}`;
    let notiCount = list => go(
        list,
        a => {
            if (!a) return [];
            let arr = [];
            for (const key in a) {
                if (a[key].read === false) a.push(key);
            }
            return arr;
        },
        b => b.length
    )
    let campaignId = req.query.id;
    let [campaignDetail] = await QUERY`SELECT * FROM campaign WHERE id = ${campaignId}`;
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_detail.css" />
            <link rel="stylesheet" href="/front/css/advertiser/media/media_adv_campaign_detail.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name, user.id, notiCount(notification.notification_list)),
        nav: TMPL.layout.advNav(user.info.company_name),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="/">홈</a>
                        <a href="/advertiser/adv_campaign_management">캠페인 리스트</a>
                        <a href="/advertiser/adv_campaign_detail">캠페인 상세</a>
                    </div>
                    <div class="info_wrap">
                        <h2>캠페인 정보</h2>
                        <div class="info_pd">
                            <span>캠페인</span>
                            <div class="pd_img">
                            <img src="${campaignDetail.img}?${new Date()}" alt="캠페인이미지" />
                            </div>
                            <p>${campaignDetail.name}</p>
                            <a class="modify" href="/advertiser/adv_campaign_modify?id=${campaignId}">수정하기</a>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <div class="list_top">
                            <div>
                                <p>참여 인플루언서:</p>
                                <span class="infu_count">${Object.keys(campaignDetail.influencer_id).length} 명</span>
                                <em>/</em>
                                <p>선택한 인플루언서:</p>
                                <span class="infu_count">${go(campaignDetail.influencer_id, countSelectedInf)} 명</span>
                                <button class="submit">선정하기</button>
                            </div>
                        </div>
                        <table>
                        <caption>캠페인 리스트 전체 인플루언서 게시판</caption>
                        <thead>
                            <tr>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                <th scope="col" class="inf_check">
                                    <input type="checkbox" class="inf_check_all" name="inf_check_all" id="inf_click" value="progress">
                                    <label for="inf_click"></label>
                                </th>
                                <th scope="col" class="infu_name">인플루언서 이름</th>
                                <th scope="col" class="column up">팔로워 수</th>
                                <th scope="col" class="column_phone">휴대폰 번호</th>
                                <th scope="col" class="camp_state up">상태</th>
                                <th scope="col" class="post_status up">게시물</th>
                            </tr>
                        </thead>
                        <tbody class="apply_inf_list" campaign_id = "${campaignId}">
                            ${await go(campaignDetail.influencer_id, TMPL.AdvCampaignDetail.getInfList)}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_campaign_detail.js"></script>
            <script>
                go('.apply_inf_list', $, AdvCampaignDetail.Do.clickRefreshBtn);
                go('.apply_inf_list', $, AdvCampaignDetail.Do.clickTarget);
                go('.list_wrap', $, AdvCampaignDetail.Do.submitSelectInfo);
                go('.inf_check_all', $, AdvCampaignDetail.Do.checkAll);
                go('.column', $, AdvCampaignDetail.Do.sortByFollower);
                go('.camp_state', $, AdvCampaignDetail.Do.sortByStatus);
                
            </script>
        `
    }));
});

/*
    인플루언서 선정하기 버튼 누를 시 동작
    - 선정된 인플루언서 상태 업데이트
 */
app.put('/api/advertiser/adv_campaign_detail', async (req, res) => {
    let campaignId = req.body.campaign_id;
    let [appliedInf] = await QUERY`SELECT influencer_id FROM campaign WHERE id = ${campaignId}`;
    !req.body.select_id? "" : go(req.body.select_id, map(a => appliedInf.influencer_id[a].selected = "true"));
    !req.body.except_id? "" : go(req.body.except_id, map(a => appliedInf.influencer_id[a].selected = "false"));
    let [isUpdate] = await QUERY`UPDATE campaign SET influencer_id = ${JSON.stringify(appliedInf.influencer_id)} WHERE id = ${campaignId} RETURNING TRUE`
    res.json(isUpdate);
});

app.post('/api/advertiser/adv_campaign_detail', async (req, res) => {
    let userName = req.body.name;

    let [participant] = await QUERY`SELECT info ->> 'hash_tag' as hash_tag, influencer_id -> ${userName} ->> 'selected' as selected FROM campaign WHERE id = ${req.body.campaign_id}`;
    if (participant.selected === null) {res.json({"res":"user not found"}); return;}
    if (participant.selected === "false") {res.json({"res":"unselected user"}); return;}

    const [infSnsInfo] = await QUERY`SELECT sns_info FROM users WHERE id = ${userName}`;
    let instagramMedia = await getInfMedia(infSnsInfo.sns_info.instagram_id, infSnsInfo.sns_info.instagram_access_token, 7);
    if (!instagramMedia.media) {res.json({"res":"media dose not exist"}); return;}

    return go(
        instagramMedia.media.data,
        map(a => {
            let matchingHashTagCount = 0;
            matchingHashTagCount = getMatchingHashTagCount(a.caption, participant.hash_tag);
            return Object.assign(a, {"matching_hash_tag_count" : matchingHashTagCount}, {"key_hash_tag_count":getHashTag(participant.hash_tag).length});
        }),
        b => b.sort((a, b) => b.matching_hash_tag_count - a.matching_hash_tag_count),
        c => c.shift(),
        async d => {
            let [infData] = await QUERY`SELECT influencer_id FROM campaign WHERE id = ${req.body.campaign_id}`;
            let resMessage = "";
            if (d.key_hash_tag_count === d.matching_hash_tag_count) {
                infData.influencer_id[userName].post_status = "true";
                infData.influencer_id[userName].post_url = d.permalink;
                resMessage = "successful data import and found the post";
            } else {
                infData.influencer_id[userName].post_status = "false";
                infData.influencer_id[userName].post_url = null;
                resMessage = "successful data import but could not found the post"
            }
            let [isUpdate] = await updateDB('influencer_id', JSON.stringify(infData.influencer_id), req.body.campaign_id);
            if (isUpdate.bool) return ({"res":resMessage, "post":d});
            else return ({"res":"fail to update database"});
        },
        res.json
    )
});
const getMatchingHashTagCount = (targetText, keyText) => go(getHashTag(keyText), map(a => {
    for (const iter of getHashTag(targetText)) if (iter === a) return true;
    return false;
    }),
    b => {
        let count = 0;
        for (const iter of b) if (iter) count += 1;
        return count;
    }
);

const getInfMedia = (id, accessToken, limit) => {
    !limit ? limit = 7 : limit;
    return get(`https://graph.facebook.com/v3.2/${id}?fields=media.limit(${limit})%7Bcaption%2Ctimestamp%2Ccomments_count%2Clike_count%2Cmedia_url%2Cthumbnail_url%2Cpermalink%7D&access_token=${accessToken}`, ``);
}
const countSelectedInf = infList => {
    let count = 0;
    for (const key in infList) if (infList[key].selected === "true") count += 1;
    return count;
}
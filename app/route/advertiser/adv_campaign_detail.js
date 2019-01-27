app.get('/advertiser/adv_campaign_detail', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    let campaignId = req.query.id;
    let [campaignDetail] = await QUERY`SELECT * FROM campaign WHERE id = ${campaignId}`;
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_detail.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name),
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
                go('.apply_inf_list', $, AdvCampaignDetail.Do.clickTarget);
                go('.list_wrap', $, AdvCampaignDetail.Do.submitSelectInfo);
                go('.inf_check_all', $, AdvCampaignDetail.Do.checkAll);
                go('.column', $, AdvCampaignDetail.Do.sortByFollower);
                go('.camp_state', $, AdvCampaignDetail.Do.sortByStatus);
            </script>
        `
    }));
});

app.post('/api/advertiser/adv_campaign_detail', async (req, res) => {
    let campaignId = req.body.campaign_id;
    let [appliedInf] = await QUERY`SELECT influencer_id FROM campaign WHERE id = ${campaignId}`;
    !req.body.select_id? "" : go(req.body.select_id, map(a => appliedInf.influencer_id[a].selected = "true"));
    !req.body.except_id? "" : go(req.body.except_id, map(a => appliedInf.influencer_id[a].selected = "false"));
    let [isUpdate] = await QUERY`UPDATE campaign SET influencer_id = ${JSON.stringify(appliedInf.influencer_id)} WHERE id = ${campaignId} RETURNING TRUE`
    res.json(isUpdate);
})

const countSelectedInf = infList => {
    let count = 0;
    for (const key in infList) if (infList[key].selected === "true") count += 1;
    return count;
}
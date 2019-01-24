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
                                <p>선택된 인플루언서:</p>
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
                            ${await go(campaignDetail.influencer_id, getInfList)}
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

const getInfList = async infs => {
    let infInfoArr = [];
    for (const key in infs) {
        let [userInfo] = await QUERY`SELECT * FROM users WHERE id = ${key}`;
        infInfoArr.push({
            id: key,
            name: userInfo.info.name,
            instagram_username: userInfo.sns_info.instagram_username,
            profile_url: userInfo.sns_info.instagram_profile_img,
            followers: userInfo.sns_info.instagram_followers,
            phone_number: (!userInfo.info.phone_num)? "휴대폰 번호 없음" : userInfo.info.phone_num,
            memo: infs[key].memo,
            address: infs[key].address,
            selected: infs[key].selected
        });
    }
    return go(
        infInfoArr,
        map(a => writeInfListHtml(a.profile_url, a.id, a.instagram_username, a.followers, a.phone_number, a.memo, a.address, a.selected)),
        b => html`${b}`
    );
}
const writeInfListHtml = (profile_url, userName, snsName, followers, phoneNum, memo, address, status) => {
    return html`
    <tr class="target" target="${userName}">
        <td class="inf_check">
            <input type="checkbox" name="inf_chk" id="${userName}" value="${userName}" status="${status}">
            <label for="${userName}"></label>
        </td>
        <td class="infu_name">
            <img src=${profile_url} class = "profile_img" alt="인플루언서 프로필"/>
            <p>${userName}</p>
            <p>${snsName}</p>
        </td>
        <td class="column">${followers}</td>
        <td class="column_phone">${phoneNum}</td>
        <td class="camp_state">
            <span class="${convertStatusBox(status)}" name="camp_state">${convertStatus(status)}</span>
        </td>
    </tr>
    <tr class="target_down hidden" name="${userName}">
        <td class="memo_wrap">
            <p>메모</p>
            <label class="memo">${memo}</label>
        </td>
        <td class="address_wrap">
            <p>주소</p>
            <label class="address">${address}</label>
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `;
}

const convertStatus = status => toString(status) === "true"? "선정" : "미선정";
const convertStatusBox = status => toString(status) === "true"? "check2" : "check1";
const countSelectedInf = infList => {
    let count = 0;
    for (const key in infList) if (infList[key].selected === "true") count += 1;
    return count;
}
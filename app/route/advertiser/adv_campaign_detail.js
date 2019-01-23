app.get('/advertiser/adv_campaign_detail', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    let [campaignDetail] = await QUERY`SELECT * FROM campaign WHERE id = ${req.query.id}`;
    log(campaignDetail.influencer_id);
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
                            <a class="modify" href="/advertiser/adv_campaign_modify?id=${req.query.id}">수정하기</a>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <h2>
                            참여 인플루언서:
                            <span class="infu_count">${Object.keys(campaignDetail.influencer_id).length} 명</span>
                            <a class="invite">초대하기</a>
                        </h2>
                        <table>
                        <caption>캠페인 리스트 전체 인플루언서 게시판</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="inf_check">
                                    <input type="checkbox" name="sale_chk" id="inf_click" value="progress">
                                    <label for="inf_click"></label>
                                </th>
                                <th scope="col" class="infu_name">인플루언서 이름</th>
                                <th scope="col" class="column ud">팔로워 수</th>
                                <th scope="col" class="column_phone">휴대폰 번호</th>
                                <th scope="col" class="camp_state ud">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${await go(campaignDetail.influencer_id, getInfList)}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: ``
    }));
});
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
            phone_number: (!userInfo.info.phone_num)? "" : userInfo.info.phone_num,
            memo: infs[key].memo,
            address: infs[key].address
        });
    }
    return go(
        infInfoArr,
        map(a => writeInfListHtml(a.profile_url, a.instagram_username, a.followers, a.phone_number, a.memo, a.address)),
        b => html`${b}`
    )
}
const writeInfListHtml = (profile_url, name, followers, phoneNum, memo, address) => {
    return html`
    <tr class="tr_on">
        <td class="inf_check">
            <input type="checkbox" name="sale_chk" id="inf_click1" value="progress">
            <label for="inf_click1"></label>
        </td>
        <td class="infu_name">
            <img src=${profile_url} class = "profile_img" alt="인플루언서 프로필"/>
            <p>${name}</p>
        </td>
        <td class="column">${followers}</td>
        <td class="column_phone">${phoneNum}</td>
        <td class="camp_state">
            <span class="check1">대기</span>
        </td>
    </tr>
    <tr class="tr_down">
        <td></td>
        <td>
            <label class="memo">${memo}</label>
        </td>
        <td></td>
        <td>
            <label class="address">${address}</label>
        </td>
    </tr>
    `
}
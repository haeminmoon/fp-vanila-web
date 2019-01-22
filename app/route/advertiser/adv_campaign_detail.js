app.get('/advertiser/adv_campaign_detail', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    let [campaignDetail] = await QUERY`SELECT * FROM campaign WHERE id = ${req.query.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_detail.css" />
        `,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
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
                            <img src=${campaignDetail.img} alt="캠페인이미지" />
                            </div>
                            <p>${campaignDetail.name}</p>
                            <a class="modify" href="/advertiser/adv_campaign_modify?id=${req.query.id}">수정하기</a>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <h2>
                            참여 인플루언서:
                            <span class="infu_count">${Object.keys(campaignDetail.influencer_id).length} 명</span>
                            <a class="modify">수정하기</a>
                        </h2>
                        <table>
                        <caption>캠페인 리스트 전체 인플루언서 게시판</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="num">NO</th>
                                <th scope="col" class="infu_name">인플루언서 이름</th>
                                <th scope="col" class="price ud">판매 금액</th>
                                <th scope="col" class="price ud">판매 수량</th>
                                <th scope="col" class="date_camp ud">캠페인 선택일자</th>
                                <th scope="col" class="camp_state ud">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="tr_on">
                                <td class="num">1</td>
                                <td class="infu_name">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrL8BHB7O4aPxelRrBvYb4zr2RIx_CU8ppu8gpE4HRgwT2Ma8" alt="인플루언서 사진"/>
                                    <p>나리지연</p>
                                </td>
                                <td class="price">22,500원</td>
                                <td class="price_num">15</td>
                                <td class="date_camp">2018-12-12 10:10:10</td>
                                <td class="camp_state">
                                    <span class="check1">판매중</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="num">2</td>
                                <td class="infu_name">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrL8BHB7O4aPxelRrBvYb4zr2RIx_CU8ppu8gpE4HRgwT2Ma8" alt="인플루언서 사진"/>
                                    <p>나리지연</p>
                                </td>
                                <td class="price">22,500원</td>
                                <td class="price_num">20</td>
                                <td class="date_camp">2018-12-12 10:10:10</td>
                                <td class="camp_state">
                                    <span class="check1">판매중</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="num">3</td>
                                <td class="infu_name">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrL8BHB7O4aPxelRrBvYb4zr2RIx_CU8ppu8gpE4HRgwT2Ma8" alt="인플루언서 사진"/>
                                    <p>나리지연</p>
                                </td>
                                <td class="price">22,500원</td>
                                <td class="price_num">40</td>
                                <td class="date_camp">2018-12-12 10:10:10</td>
                                <td class="camp_state">
                                    <span class="check1">판매중</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="num">4</td>
                                <td class="infu_name">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUrL8BHB7O4aPxelRrBvYb4zr2RIx_CU8ppu8gpE4HRgwT2Ma8" alt="인플루언서 사진"/>
                                    <p>나리지연</p>
                                </td>
                                <td class="price">22,500원</td>
                                <td class="price_num">145</td>
                                <td class="date_camp">2018-12-12 10:10:10</td>
                                <td class="camp_state">
                                    <span class="check1">판매중</span>
                                </td>
                            </tr>
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
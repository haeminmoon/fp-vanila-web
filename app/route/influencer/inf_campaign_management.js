app.get('/influencer/inf_campaign_management', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'influencer') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    let searchTerm = `%${req.query.searchTerm}%`;

    let campaignList = (!req.query.searchTerm) ?
        await QUERY `SELECT * , (SELECT info ->> 'brand_name' FROM users WHERE id = advertiser_id) AS brand_name FROM campaign WHERE influencer_id ->> ${req.session.user.id} IS NOT NULL ORDER BY id DESC` :
        await QUERY `SELECT * , (SELECT info ->> 'brand_name' FROM users WHERE id = advertiser_id) AS brand_name FROM campaign WHERE name LIKE ${searchTerm} AND influencer_id ->> ${req.session.user.id} IS NOT NULL`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_management.css" />
            <link rel="stylesheet" href="/front/css/influencer/media/media_inf_campaign_management.css">
        `,
        header: TMPL.layout.infHeader(user.info.nickname, user.id),
        nav: TMPL.layout.infNav(user.info.nickname),
        main: `
            <div id="main" influencer=${req.session.user.id}>
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="/">홈</a>
                        <a href="/influencer/inf_campaign_management">캠페인 관리</a>
                    </div>
                    <div class="state_wrap">
                        <h2 class="hide">전체 프로세스</h2>
                        <ul class="state_box">
                            <li>
                                <a>
                                    <span class="state">전체</span>
                                    <span class="state_all"></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span class="state">신청완료</span>
                                    <span class="state_apply_complete"></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span class="state">발표 대기중</span>
                                    <span class="state_notice_waiting"></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span class="state">홍보 진행중</span>
                                    <span class="state_posting_progress"></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span class="state">완료</span>
                                    <span class="state_complete"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search_wrap">
                        <h2>캠페인 검색</h2>
                        <div class="search_word">
                            <span>검색어</span>
                            <div class="search_inbox">
                                <input type="text" name="search_txt" class="search_txt" placeholder="상품명 검색">
                                <button type="button" class="search_icon"></button>
                            </div>
                        </div>
                        <div class="search_check">
                            <span>캠페인 상태</span>
                            <div class="check_box">
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_apply_complete" value="cam_apply_complete" class="checkbox">
                                    <label for="cam_apply_complete">신청완료</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_notice_waiting" value="cam_notice_waiting" class="checkbox">
                                    <label for="cam_notice_waiting">발표 대기중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_posting_progress" value="cam_posting_progress" class="checkbox">
                                    <label for="cam_posting_progress">홍보 진행중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_complete" value="cam_complete" class="checkbox">
                                    <label for="cam_complete">완료</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <h2 class="section_tit">캠페인 리스트</h2>
                        <table>
                            <caption>캠페인 리스트 등록안내 게시판</caption>
                            <thead>
                                <tr>
                                    <th scope="col" class="num">NO</th>
                                    <th scope="col" class="campaign_name">상품명</th>
                                    <th scope="col" class="notice_date">발표일</th>
                                    <th scope="col" class="post_date">포스팅 기간</th>
                                    <th scope="col" class="brand_name">회사 명</th>
                                    <th scope="col" class="camp_state ud">상태</th>
                                </tr>
                            </thead>
                            <tbody class="camp_list">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/influencer/inf_campaign_management.js"></script>
        <script>
            InfCampaignManagement.Do.campaignList(${JSON.stringify(campaignList)});
            go('.camp_list', $, InfCampaignManagement.Route.campaignDetail);
            go('.check_box', $, InfCampaignManagement.Do.event);
            go('.search_inbox', $, InfCampaignManagement.Do.searchTerm);
        </script> 
        `
    }));
});
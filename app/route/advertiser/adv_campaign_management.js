app.get('/advertiser/adv_campaign_management', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    let searchTerm = `%${req.query.searchTerm}%`;

    let campaignList = (!req.query.searchTerm) ?
        await QUERY`SELECT * FROM campaign WHERE advertiser_id = ${req.session.user.id} ORDER BY id DESC` :
        await QUERY`SELECT * FROM campaign WHERE name Like ${searchTerm} AND advertiser_id = ${req.session.user.id} ORDER BY id DESC`;

    campaignList = go(
        campaignList,
        map((item) => {
            item.count = Object.keys(item.influencer_id).length;
            return item;
        })
    );

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_management.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name),
        nav: TMPL.layout.advNav(user.info.company_name),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="/">홈</a>
                        <a href="/advertiser/adv_campaign_management">캠페인 리스트</a>
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
                                    <span class="state">대기중</span>
                                    <span class="state_wait"></span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span class="state">진행중</span>
                                    <span class="state_progress"></span>
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
                        <h2>상세검색</h2>
                        <div class="search_word">
                            <span>검색어</span>
                            <div class="search_inbox">
                                <input type="text" name="search_txt" class="search_txt" placeholder="인플루언서 계정(아이디), 상품명, 검색어, 상품번호, 브랜드, 제조사, 상품 브랜드">
                                <button type="button" class="search_icon"></button>
                            </div>
                        </div>
                        <div class="search_check">
                            <span>판매상태</span>
                            <div class="check_box">
                                <div class="check_tab">
                                    <input type="checkbox" name="sale_chk" id="wait" value="wait" class="checkbox">
                                    <label for="wait">대기중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="sale_chk" id="progress" value="progress" class="checkbox">
                                    <label for="progress">진행중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="sale_chk" id="sale_complete" value="sale_complete" class="checkbox">
                                    <label for="sale_complete">판매완료</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <h2>캠페인 리스트</h2>
                        <table class="camp_table">
                            <caption>캠페인 리스트 등록안내 게시판</caption>
                            <thead>
                                <tr>
                                    <th scope="col" class="num">NO</th>
                                    <th scope="col" class="campaign_name">캠페인 명</th>
                                    <th scope="col" class="apply_term">신청기간</th>
                                    <th scope="col" class="apply_count ud">신청인원</th>
                                    <th scope="col" class="start_date">캠페인 등록일</th>
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
            <script src="/front/script/advertiser/adv_campaign_management.js"></script>
            <script>
                AdvCampaignManagement.Do.campaignList(${JSON.stringify(campaignList)});
                go('.camp_list', $, AdvCampaignManagement.Route.campaignDetail);
                go('.check_box', $, AdvCampaignManagement.Do.event);        
                go('.search_inbox', $, AdvCampaignManagement.Do.searchTerm);
            </script>
        `
    }));
});
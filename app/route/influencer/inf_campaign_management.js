app.get('/influencer/inf_campaign_management', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'influencer') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_management.css" />
        `,
        header: TMPL.layout.infHeader(user.info.name),
        nav: TMPL.layout.infNav(user.info.name),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a href="/">홈</a>
                        <a href="/influencer/inf_campaign_management">캠페인 관리</a>
                    </div>

                    <div class="state_wrap">
                        <h2 class="hide">전체 프로세스</h2>
                        <ul class="state_box">
                            <li class="all">
                                <a href="#">
                                    <p class="state_num" class="state_num">0 건</p>
                                    <span class="state">전체</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p class="state_num">0 건</p>
                                    <span class="state">대기중</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p class="state_num">0 건</p>
                                    <span class="state">진행중</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <p class="state_num">0 건</p>
                                    <span class="state">완료</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search_wrap">
                        <h2 class="section_tit">캠페인 검색</h2>
                        <div class="search_word">
                            <span>검색어</span>
                            <div class="search_inbox">
                                <input type="text" class="search_txt" name="search" placeholder="인플루언서 계정(아이디), 상품명, 검색어, 상품번호, 브랜드, 제조사, 상품 브랜드">
                                <button type="button" class="search_icon"></button>
                            </div>
                        </div>
                        <div class="search_check">
                            <span>캠페인 상태</span>
                            <div class="check_box">
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_waiting" value="cam_waiting">
                                    <label for="cam_waiting">대기중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_proceeding" value="cam_proceeding">
                                    <label for="cam_proceeding">진행중</label>
                                </div>
                                <div class="check_tab">
                                    <input type="checkbox" name="campaign_chk" id="cam_complete" value="cam_complete">
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
                                    <th class="num">NO</th>
                                    <th class="product_name ud">상품명</th>
                                    <th class="sale_term">판매기간</th>
                                    <th class="sale_site ud">판매 사이트</th>
                                    <th class="inf ud">인플루언서</th>
                                    <th class="start_date">등록일</th>
                                    <th class="camp_state ud">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="target">
                                    <td class="num">1</td>
                                    <td class="product_name">
                                        <img src="https://usercontents-c.styleshare.kr/images/i5b9730bf91673/700x700" alt="캠페인 이미지"/>
                                        <p>아페리레 데이드림 커버 A쿠션</p>
                                    </td>
                                    <td class="sale_term">2018-12-12 ~ 2019-01-01</td>
                                    <td class="sale_site">우먼스톡</td>
                                    <td class="inf">포니</td>
                                    <td class="start_date">2018-12-12 10:00:00</td>
                                    <td class="camp_state">
                                        <span class="proceeding">진행중</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="num">2</td>
                                    <td class="product_name">
                                        <img src="http://yd-donga.com/data/file/intern/3531283330_KJlSIR6H_f42cfa3ea285b452f163197079528545bc9d9742.jpg" alt="캠페인 이미지"/>
                                        <p>신라호텔 뷔페 2인</p>
                                    </td>
                                    <td class="sale_term">2018-12-12 ~ 2019-01-01</td>
                                    <td class="sale_site">우먼스톡</td>
                                    <td class="inf">10명</td>
                                    <td class="start_date">2018-12-12 10:00:00</td>
                                    <td class="camp_state">
                                        <span class="waiting">대기중</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="num">3</td>
                                    <td class="product_name">
                                        <img src="http://image.auction.co.kr/itemimage/14/4e/f5/144ef5b811.jpg" alt="캠페인 이미지"/>
                                        <p>[무료배송]헤라 블랙 쿠션</p>
                                    </td>
                                    <td class="sale_term">2018-12-12 ~ 2019-01-01</td>
                                    <td class="sale_site">우먼스톡</td>
                                    <td class="inf">409명</td>
                                    <td class="start_date">2018-12-12 10:00:00</td>
                                    <td class="camp_state">
                                        <span class="complete">완료</span>
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
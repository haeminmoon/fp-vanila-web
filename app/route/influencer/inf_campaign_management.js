app.get('/influencer/inf_campaign_management', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_management.css" />
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
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
                                    <span class="state">완료</span>
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
                                    <span class="state">취소</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search_box">
                        <input type="date" name="apply_due_date" class="apply_due_date">
                        <input type="date" name="apply_due_date" class="apply_due_date">
                        <input type="text" name="search_txt" class="search_txt">
                        <button type="button" class="search_btn">검색</button>
                    </div>
                    <div class="list_wrap">
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
                                <tr class="tr_on">
                                    <td class="num">1</td>
                                    <td class="product_name">
                                        <img src="https://usercontents-c.styleshare.kr/images/i5b9730bf91673/700x700" alt="아페리레 데이드림 커버 A쿠션"/>
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
                                        <img src="http://image.auction.co.kr/itemimage/14/4e/f5/144ef5b811.jpg" alt="헤라 블랙 쿠션"/>
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
                                <tr>
                                    <td class="num">3</td>
                                    <td class="product_name">
                                        <img src="http://image.auction.co.kr/itemimage/14/4e/f5/144ef5b811.jpg" alt="헤라 블랙 쿠션"/>
                                        <p>[무료배송]헤라 블랙 쿠션</p>
                                    </td>
                                    <td class="sale_term">2018-12-12 ~ 2019-01-01</td>
                                    <td class="sale_site">우먼스톡</td>
                                    <td class="inf">409명</td>
                                    <td class="start_date">2018-12-12 10:00:00</td>
                                    <td class="camp_state">
                                        <span class="cancel">취소</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `,
        footer: TMPL.layout.footer(),
        script: ``
    }));
});
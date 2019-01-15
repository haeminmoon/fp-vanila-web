app.get('/advertiser/adv_campaign_management', (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common_.css" />
            <link rel="stylesheet" href="/front/css/campaign.css" />
        `,
        header: ``,
        nav: ``,
        main: `
            <div id="main">
                <div class="site_container">


                    <!-- nav -->


                    <div class="site_sidebar">
                        <h1 class="logo">
                            <a>SPIN Protocol</a>
                        </h1>
                        <ul class="site_link">




                            <li><a>나의 캠페인</a></li>
                            <li class="click"><a href="/advertiser/adv_campaign_management">캠페인 관리</a></li>
                            <li><a href="/advertiser/adv_campaign_registration">캠페인 등록</a></li>
                            <li><a href="/advertiser/adv_influencer_list">인플루언서 조회</a></li>
                            <li><a href="/advertiser/adv_my_info">나의 정보</a></li>
                        </ul>
                        <div class="signout">
                            <a href="/common/signout">로그아웃</a>
                        </div>
                    </div>
                    <div class="site_content">


                        <!-- header -->


                        <div class="navbar">
                            <ul class="gnb">
                                <li class="gnb_notice">
                                    <a>
                                        <span class="hide">알림</span>
                                        <span class="gnb_icon"></span>
                                        <span class="count">
                                            <span class="notice_cnt">3</span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>


                        <!-- main -->


                        <div class="content_container">
                            <div class="page_content">
                                <div class="state_container">
                                    <h2>전체 프로세스</h2>
                                    <ul class="state_inbox">
                                        <li>
                                            <a>
                                                <span class="state">전체</span>
                                                <span>823 건</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <span class="state">완료</span>
                                                <span>500 건</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <span class="state">진행중</span>
                                                <span>200 건</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <span class="state">취소</span>
                                                <span>123 건</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="search_container">
                                    <h2>상세검색</h2>
                                    <div class="search_word">
                                        <span>검색어</span>
                                        <div class="search_inbox">
                                            <input type="text" class="search_txt" placeholder="인플루언서 계정(아이디), 상품명, 검색어, 상품번호, 브랜드, 제조사, 상품 브랜드">
                                            <input type="button" class="search_icon">
                                        </div>
                                    </div>
                                    <div class="search_check">
                                        <span>판매상태</span>
                                        <div class="check_container">
                                            <div class="check_tab">
                                                <input type="checkbox">
                                                <span>진행중</span>
                                            </div>
                                            <div class="check_tab">
                                                <input type="checkbox">
                                                <span>판매중</span>
                                            </div>
                                            <div class="check_tab">
                                                <input type="checkbox">
                                                <span>판매완료</span>
                                            </div>
                                            <div class="check_tab">
                                                <input type="checkbox">
                                                <span>취소</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="list_container">
                                    <h2>캠페인 리스트</h2>
                                    <table>
                                        <caption>캠페인 리스트 등록안내 게시판</caption>
                                        <colgroup>
                                            <col style="width: 70px">
                                            <col style="width: 250px">
                                            <col style="width: 250px">
                                            <col style="width: 150px">
                                            <col style="width: 200px">
                                            <col style="width: 100px">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col" class="num">NO</th>
                                                <th scope="col" class="pd">캠페인명</th>
                                                <th scope="col" class="day">등록</th>
                                                <th scope="col" class="infu">인플루언서</th>
                                                <th scope="col" class="date">캠페인 등록일</th>
                                                <th scope="col" class="list_check">상태</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="num">1</td>
                                                <td class="pd">[무료배송]헤라 블랙 쿠션</td>
                                                <td class="day">2018-12-12 ~ 2019-01-01</td>
                                                <td class="infu">409명</td>
                                                <td class="date">2018-12-12 10:00:00</td>
                                                <td class="list_check">
                                                    <span class="check1">판매중</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="num">2</td>
                                                <td class="pd">[무료배송]헤라 블랙 쿠션</td>
                                                <td class="day">2018-12-12 ~ 2019-01-01</td>
                                                <td class="infu">409명</td>
                                                <td class="date">2018-12-12 10:00:00</td>
                                                <td class="list_check">
                                                    <span class="check2">진행중</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="num">3</td>
                                                <td class="pd">[무료배송]헤라 블랙 쿠션</td>
                                                <td class="day">2018-12-12 ~ 2019-01-01</td>
                                                <td class="infu">409명</td>
                                                <td class="date">2018-12-12 10:00:00</td>
                                                <td class="list_check">
                                                    <span class="check3">취소</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="num">3</td>
                                                <td class="pd">[무료배송]헤라 블랙 쿠션</td>
                                                <td class="day">2018-12-12 ~ 2019-01-01</td>
                                                <td class="infu">409명</td>
                                                <td class="date">2018-12-12 10:00:00</td>
                                                <td class="list_check">
                                                    <span class="check4">판매완료</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: ``
    }));
});
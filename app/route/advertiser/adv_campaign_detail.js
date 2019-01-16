app.get('/advertiser/adv_campaign_detail', (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

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
                        <a>홈</a>
                        <a>캠페인 리스트</a>
                        <span>캠페인 상세</span>
                    </div>
                    <div class="info_wrap">
                        <h2>캠페인 상품정보</h2>
                        <div class="info_pd">
                            <span>상품</span>
                            <div class="pd_img">
                            <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/product_name_1.jpg" alt="크리니크 치크팝 베스트" />
                            </div>
                            <p>[한정수량]크리니크 치크팝 베스트/처비스틱 외 색조 모음전</p>
                            <a class="modify">수정하기</a>
                        </div>
                        <div class="info_day">
                            <span>기간</span>
                            <p>2018-12-12 ~ 2019-01-01</p>
                            <a class="modify">수정하기</a>
                        </div>
                    </div>
                    <div class="list_wrap">
                        <h2>
                            참여 인플루언서:
                            <span class="infu_count">9</span>명
                            <a class="modify">수정하기</a>
                        </h2>
                        <table>
                            <caption>캠페인 참여 인플루언서 게시판</caption>
                            <colgroup>
                                <col style="width: 70px">
                                <col style="width: 180px">
                                <col style="width: 150px">
                                <col style="width: 250px">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col" class="num">NO</th>
                                    <th scope="col" class="infu_name">인플루언서 이름</th>
                                    <th scope="col" class="price ud">판매 금액</th>
                                    <th scope="col" class="date_camp ud">캠페인 선택일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="num">1</td>
                                    <td class="infu_name">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/infu_img.jpg" alt="인플루언서 사진"/>
                                        <p>나리지연</p>
                                    </td>
                                    <td class="price">22,500원</td>
                                    <td class="date_camp">2018-12-12 ~ 2019-01-01</td>
                                </tr>
                                <tr>
                                    <td class="num">2</td>
                                    <td class="infu_name">
                                        <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/infu_img.jpg" alt="인플루언서 사진"/>
                                        <p>나리지연</p>
                                    </td>
                                    <td class="price">22,500원</td>
                                    <td class="date_camp">2018-12-12 ~ 2019-01-01</td>
                                </tr>
                                <tr>
                                    <td class="num">3</td>
                                    <td class="infu_name">
                                        <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/infu_img.jpg" alt="인플루언서 사진"/>
                                        <p>나리지연</p>
                                    </td>
                                    <td class="price">22,500원</td>
                                    <td class="date_camp">2018-12-12 ~ 2019-01-01</td>
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
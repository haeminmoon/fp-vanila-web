app.get('/influencer/inf_campaign_detail', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_detail.css">
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            <div id="main">
                <div class="container">
                    <div class="campaign_main">
                        <img src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 메인이미지">
                        <div class="mask">
                            <h1 class="brand_tit">캠페인 광고주</h1>
                            <p class="campaign_tit">캠페인 제목</p>
                            <ul class="campaign_info">
                                <li>
                                    <p>성별</p>
                                    <p>성별</p>
                                </li>
                                <li>
                                    <p>연령</p>
                                    <p>20-30</p>
                                </li>
                                <li>
                                    <p>SNS</p>
                                    <p>instagram</p>
                                </li>
                                <li>
                                    <p>미션 타입</p>
                                    <p>sns</p>
                                </li>
                                <li>
                                    <p>신청 기간</p>
                                    <p>2019.01.07~10</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 캠페인 소개 -->
                            
                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            상세 이미지
                        </h2>
                        <div class="detail_content">
                            <img src="http://365comm.co.kr/wp-content/uploads/2017/04/%EC%88%9C%EC%83%98-%EC%85%B0%ED%94%84%EC%9D%98%EC%84%A0%ED%83%9D-w900.jpg"
                                alt="캠페인 상세이미지">
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            제품 설명
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                안녕하세요 스핀프로토콜 입니다.
                
                                원활한 캠페인 진행을 위하여
                                인스타그램 비즈니스 프로필 전환 캠페인을 진행하게 되었습니다.
                
                                많은 참여 부탁드려요 :)
                
                                *준비물 : 인스타그램, 페이스북 계정이 필요합니다.
                                아래 미션 설명과 주의사항을 반드시 읽고 참여해주세요!!
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            캠페인 미션
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ** 본 캠페인은 최대 3개의 인스타그램 계정까지 참여 가능합니다 **
                                ** 팔로워 1,000 이상부터 참여 가능합니다 **
                
                                1. 본 캠페인 하단 '신청하기' 버튼 클릭하기
                
                                2. '확인' 버튼 클릭하기
                
                                3. 유형별 참여 방법
                                1) 스핀프로토콜에 등록되어 있는 인스타그램 일반 계정 -> '비즈니스 프로필 전환' 버튼을 클릭하여 전환하기
                                2) 스핀프로토콜에 등록되어 있는 인스타그램 비즈니스 계정 -> 본 캠페인 참여 불가
                                3) 스핀프로토콜에 등록되어 있지 않은 인스타그램 일반 계정 -> '+' 버튼을 클릭하여 스핀프로토콜에 등록 후 '비즈니스 프로필 전환' 버튼을 클릭하여 전환하기
                                4) 스핀프로토콜에 등록되어 있지 않은 인스타그램 비즈니스 계정 -> '+' 버튼 클릭하여 스핀프로토콜에 등록하기
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            필수 해시태그
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                #스핀프로토콜 #스핀최공 #스피너
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            주의사항
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ** 본 캠페인은 최대 3개의 인스타그램 계정까지 참여 가능합니다 **
                                ** 팔로워 1,000 이상부터 참여 가능합니다 **
                                ** 인스타그램 비즈니스 프로필 전환시 문제가 발생하는 경우 플러스 친구로 문의주세요 **
                
                                인스타그램 비즈니스 프로필 전환시 인스타그램과 연결된 페이스북 페이지를 소유하고 있는 페이스북 계정이 필요합니다.
                                인스타그램과 연결된 페이스북 페이지는 인스타그램 프로필 -> 프로필 수정 -> 비즈니스 정보에서 확인 가능합니다.
                
                                크롬, 사파리 등 웹 브라우저에서 정상적으로 참여가능합니다.
                            </p>
                        </div>
                    </div>
                    <div class="btn_wrap">
                        <button type="button" class="submit_btn">신청하기</button>
                    </div>
                </div>
            </div>
        `,
        footer: TMPL.layout.footer(),
        script: `
            <script src="/front/script/influencer/inf_campaign_confirm.js"></script>
            <script>
                go('.submit_btn', $, Confirm.Route.infConfirm);
            </script>
        `
    }));
});

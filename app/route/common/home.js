app.get('/', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
        <link rel="stylesheet" href="/front/css/common/index.css" />
        `,
        header: ``,
        nav: ``,
        main: `
            <div id="main">
                <div class="visual_wrap">
                    <div class="visual_back">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/bg_2.jpg" alt="메인이미지">
                    </div>
                    <div class="visual_title">
                        <h1 class="logo">SPIN Protocol</h1>
                        <p>Decentralized E-Commerce system</p>
                        <a href="/common/signin">GET STARTED</a>
                    </div>
                    <div class="partner_box">
                        <ul>
                            <li>
                                <a href="https://www.blockchaini.io/" target="_blank">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/partner_1.jpg" alt="BLOCKCHAIN">
                                </a>
                            </li>
                            <li>
                                <a href="http://www.nexusonecap.com/" target="_blank">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/partner_2.jpg" alt="NEXUSONE">
                                </a>
                            </li>
                            <li>
                                <a href="https://www.blockchaini.io/" target="_blank">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/partner_3.jpg" alt="BCI">
                                </a>
                            </li>
                            <li>
                                <a href="https://terra.money/" target="_blank">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/partner_4.jpg" alt="Terra">
                                </a>
                            </li>
                            <li>
                                <a href="https://www.foundationx.io/" target="_blank">
                                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/partner_5.jpg" alt="FoundationX">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="about_wrap">
                    <h2>What is the SPIN Protocol?</h2>
                    <p>스핀 프로토콜은 인플루언서 중심의 탈중앙화된 이커머스 생태계입니다.<br>뷰티, 패션, 인테리어, 라이프 스타일 까지- 모든 분야의 인플루언서를 스핀 프로토콜에서 만나 보세요.</p>
                    <ul class="num_box">
                        <li>
                            <span class="num">75,000,000</span>
                            <span class="txt">followers</span>
                        </li>
                        <li>
                            <span class="num">523,000</span>
                            <span class="txt">Influencers</span>
                        </li>
                        <li>
                            <span class="num">210,000+</span>
                            <span class="txt">SKU</span>
                        </li>
                        <li>
                            <span class="num">1,700+</span>
                            <span class="txt">Brands Listed</span>
                        </li>
                    </ul>
                    <ul class="video_box">
                        <li class="video">
                            <iframe src="https://www.youtube.com/embed/-iv2hmo8HRM" frameborder="0"></iframe>
                            <span>스핀프로토콜 소개 영상</span>
                        </li>
                        <li class="video">
                            <iframe src="https://www.youtube.com/embed/1ps74564f1U" frameborder="0"></iframe>
                            <span>프로토타입 영상</span>
                        </li>
                    </ul>
                </div>
                <div class="paper_wrap">
                    <h2>프로젝트 소개 자료</h2>
                    <ul>
                        <li>
                            <strong>백서</strong>
                            <a href="http://spinprotocol.io/pdf/SPIN_whitepaper_EN_v1.1.pdf" target="_blank">ENG_Ver1.1</a>
                            <a href="http://spinprotocol.io/pdf/SPIN_whitepaper_KR_v1.1.pdf" target="_blank">KOR_Ver1.1</a>
                        </li>
                        <li>
                            <strong>브로셔</strong>
                            <a href="http://spinprotocol.io/pdf/SPIN_brochure_EN_v1.1.pdf" target="_blank">ENG_Ver1.1</a>
                            <a href="http://spinprotocol.io/pdf/SPIN_brochure_KR_v1.1.pdf" target="_blank">KOR_Ver1.1</a>
                        </li>
                        <li>
                            <strong>원 페이저</strong>
                            <a href="http://spinprotocol.io/pdf/SPIN_onepager_EN_v1.1.pdf" target="_blank">ENG_Ver1.1</a>
                            <a href="http://spinprotocol.io/pdf/SPIN_onepager_KR_v1.1.pdf" target="_blank">KOR_Ver1.1</a>
                        </li>
                    </ul>
                    <div class="paper_bg"></div>
                </div>
            </div>
        `,
        footer: `
            <div id="footer">
                <div class="footer_wrap">
                    <div class="footer_top">
                        <div class="footer_newsletter">
                            <strong>Let's SPIN together!</strong>
                            <p>스핀 프로토콜의 최신 뉴스를 가장 먼저 받아보세요!</p>
                            <div class="newsletter_data">
                                <input type="text" placeholder="Enter your email here" class="text">
                                <a href="#" class="btn_notify">Subscribe</a>
                            </div>
                        </div>
                        <div class="footer_info">
                            <div class="footer_connect">
                                <strong>Connect</strong>
                                <a href="mailto:contact@spinprotocol.io">contact@spinprotocol.io</a>
                                <ul>
                                    <li>
                                        <a href="https://t.me/spinprotocol" target="_blank" class="con_telegram">telegram</a>
                                    </li>
                                    <li>
                                        <a hef="https://open.kakao.com/o/gcyKPg4" target="_blank" class="con_kakao">kakao</a>
                                    </li>
                                    <li>
                                        <a hef="https://www.facebook.com/spinprotocol/" target="_blank" class="con_facebook">facebook</a>
                                    </li>
                                    <li>
                                        <a hef="https://medium.com/spinprotocol" target="_blank" class="con_medium">medium</a>
                                    </li>
                                    <li>
                                        <a hef="https://twitter.com/spin_protocol" target="_blank" class="con_twitter">twitter</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="footer_qrcode">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/img_qr.jpg" alt="qrcode" />
                                <strong>Join our<br>Kakaotalk!</strong>
                            </div>
                        </div>
                    </div>
                    <div class="footer_bottom">
                        <div class="footer_logo">
                            <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/index_img/footer_logo.png" alt="spin protocol" />
                        </div>
                        <p class="copyright">© 2018 SPIN Protocol. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        `,
        script: `
        `
    }));
});
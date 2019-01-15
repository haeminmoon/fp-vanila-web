app.get('/advertiser/adv_signup_complete', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signup.css">
            <link rel="stylesheet" href="/front/css/common/signup_com.css">
        `,
        header: `
            <div id="header">
                <h1 class="logo">
                    <a href="/">
                        <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                    </a>
                </h1>
                <p class="title">${__('signup')}</p>
            </div>
        `,
        main: `
            <div id="main">
                <div class="bg">
                    <div class="welcome">
                        <h1>SPIN Protocol에 오신 것을 환영합니다.</h1>
                        <p>Thank You for joining SPIN Protocol Membershop</P>
                    </div>
                </div>
                <div class="welcome_notice">
                        <div class="welcome_txt adv">
                            <p class="txt_color">{user.name} 님</p>
                            승인절차가 <span class="txt_color">3~7일 소요</span> 될 예정입니다.
                        </div>
                    </div>
                <div class="main_btn">
                    <a href="/">메인으로 돌아가기</a>
                </div>
            </div>
        `,
        footer: `
        `,
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script>go('.signin_btn', $, Signin.Route.signin)</script>
        `
    }));
});
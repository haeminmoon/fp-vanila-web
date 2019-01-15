app.get('/common/signup_complete', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signup.css">
            <link rel="stylesheet" href="/front/css/common/signup_com.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
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
                        <h1 class="welcome_txt">SPIN Protocol에 오신 것을 환영합니다.</h1>
                        <p>Thank You for joining SPIN Protocol Membershop</P>
                    </div>
                    <div class="welcome_notice">

                    </div>
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
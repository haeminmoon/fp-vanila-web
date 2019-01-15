app.get('/influencer/inf_signup_complete', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signup.css">
            <link rel="stylesheet" href="/front/css/common/signup_com.css">
        `,
        header: TMPL.layout.header('signup'),
        main: `
            <div id="main">
                <div class="bg">
                    <div class="welcome">
                        <h1>SPIN Protocol에 오신 것을 환영합니다.</h1>
                        <p>Thank You for joining SPIN Protocol Membershop</P>
                    </div>
                </div>
                <div class="welcome_notice">
                        <div class="welcome_txt">
                            <span>{user.name} 님</span><br>
                            로그인 하신 후 정상적으로 이용하실 수 있습니다.
                        </div>
                        <div class="sns_txt">
                            <p>SMS 수신 동의 : <span>{user.create_at}</span></p>  
                            <p>E-mail 수신 동의 : <span>{user.create_at}</span></p>
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
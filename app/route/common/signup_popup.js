app.get('/common/signup_popup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/common_signup.css">
         `,
        header: TMPL.layout.accountHeader('signup'),
        main: `
            <div id="main">
                <div class="container">
                    <div class="btn_wrap">
                        <p class="txt">어떤 역할로 가입을 하시나요?</p>
                        <a href="#" class="btn adv_signup">Advertiser</a>
                        <a href="#" class="btn inf_signup">Influencer</a>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/common/signup_popup.js"></script>
            <script>
                go('.adv_signup', $, SignupPopup.Route.advSignup);
                go('.inf_signup', $, SignupPopup.Route.infSignup);
            </script>
        `
    }));
});
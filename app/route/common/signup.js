app.get('/common/signup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signup.css">
         `,
        header: `
            <div id="header">
                <h1 class="logo">
                    <a href="/">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                    </a>
                </h1>
                <p class="tit">${__('signup')}</p>
            </div>
        `,
        main: `
            <div class="bg">
                <div id="main">
                    <div class="container">
                        <div class="btn_wrap">
                            <p class="txt">어떤 역할로 가입을 하시나요?</p>
                            <a href="/advertiser/adv_signup" class="btn adv_signup">Supplier</a>
                            <a href="/influencer/inf_signup" class="btn adv_signup">Influencer</a>
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
    
         `
    }));
});
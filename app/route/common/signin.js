app.get('/common/signin', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signin.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        `,
        header: `
            <div id="header">
                <h1 class="logo">
                    <a href="/">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                    </a>
                </h1>
                <p class="title">${__('signin')}</p>
            </div>
        `,
        main: `
            <div id="main">
                <div class="signin_box">
                    <p class="login_tit">SIGN IN</p>
                    <div class="select_wrap">
                        <span class="select_box">
                            <input type="radio" name="select_role" value="supplier" id="supplier">
                            <label for="select_role">${__('supplier')}</label>
                        </span>
                        <span class="select_box">
                            <input type="radio" name="select_role" value="influencer" id="influencer">
                            <label for="select_role">${__('influencer')}</label>
                        </span>
                    </div>
                    <div class="signin_wrap">
                        <input type="text" class="id" class="id" placeholder="${__('id')}">
                        <input type="password" class="pw" placeholder="${__('pw')}">
                        <button class="signin_btn">${__('signin')}</button>
                    </div>
                    <div class="other_wrap">
                        <a href="/common/signup" class="signup_btn">${__('signup')}</a>
                        <a href="/common/find_user" class="find_user_btn">${__('find_user')}</a>
                    </div>
                </div>
            </div>
        `,
        footer: `
            <div id="footer">
                <p>${__('copyright')}</p>
            </div>
        `,
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script>go('.signin_btn', $, Signin.Route.signin)</script>
        `
    }));
});
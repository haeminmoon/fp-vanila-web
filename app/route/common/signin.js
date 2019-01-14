app.get('/common/signin', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: `
            <div id="main">
                <div class="signin_box">
                    <div class="signin_wrap">
                        <input type="text" class="id" placeholder="${__('id')}">
                        <input type="password" class="pw" placeholder="${__('pw')}">
                        <Button class="signin_btn">${__('signin')}</Button>
                    </div>
                    <div class="other_wrap">
                        <a href="#" class="signup_btn">${__('signup')}</a>
                        <a href="" class="find_user_btn">${__('find_user')}</a>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script>go('.signup_btn', $, Signin.Route.signupPopup)</script>
        `
    }));
});

{/* <a href="/common/signup_popup" class="signup_btn">${__('signup')}</a> */}
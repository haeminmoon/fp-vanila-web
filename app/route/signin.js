app.get('/signin', (req, res) => {
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
                        <Button class="signup_btn">${__('signup')}</Button>
                        <Button class="find_user_btn">${__('find_user')}</Button>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/signin.js"></script>
            <script>go('.signin_btn', $, Signin.route.signin)</script>
        `
    }));
});
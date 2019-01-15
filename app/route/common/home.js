app.get('/', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.header(),
        nav: ``,
        main: `
            <div id="main">
                <button class="signin_btn">${__('signin')}</button>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/common/home.js"></script>
            <script>go('.signin_btn', $, Home.Route.signin)</script>
        `
    }));
});
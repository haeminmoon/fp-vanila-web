app.get('/', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
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
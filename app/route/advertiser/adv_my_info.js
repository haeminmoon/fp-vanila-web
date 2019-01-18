app.get('/advertiser/adv_my_info', (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
            나의 정보 수정
        `,
        footer: ``,
        script: ``
    }));
});
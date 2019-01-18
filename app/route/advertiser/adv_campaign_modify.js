app.get('/advertiser/adv_campaign_modidfy', (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
            캠페인 수정
        `,
        footer: ``,
        script: ``
    }));
});
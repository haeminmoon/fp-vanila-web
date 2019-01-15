app.get('/advertiser/adv_campaign_detail', (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: `
            캠페인 상세보기
        `,
        footer: ``,
        script: ``
    }));
});
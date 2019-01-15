app.get('/advertiser/adv_influencer_list', (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: `
            인플루언서 목록
        `,
        footer: ``,
        script: ``
    }));
});
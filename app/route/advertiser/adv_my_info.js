app.get('/advertiser/adv_my_info', (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: `
            나의 정보 수정
        `,
        footer: ``,
        script: ``
    }));
});
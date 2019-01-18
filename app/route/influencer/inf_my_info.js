app.get('/influencer/inf_my_info', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            나의 정보 수정
        `,
        footer: ``,
        script: ``
    }));
});
app.get('/influencer/inf_campaign_management', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: ``,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            캠페인 관리
        `,
        footer: TMPL.layout.footer(),
        script: ``
    }));
});
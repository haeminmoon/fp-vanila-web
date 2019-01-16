app.get('/influencer/inf_campaign_list', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
        `,
        header: ``,
        nav: ``,
        main: `
            캠페인 목록
        `,
        footer: ``,
        script: ``
    }));
});

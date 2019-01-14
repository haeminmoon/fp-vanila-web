app.get('/advertiser/adv_campaign_registration', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: ``,
        footer: ``,
        script: ``
    }));
});
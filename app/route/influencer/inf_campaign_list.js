app.get('/influencer/inf_campaign_list', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: ``,
        footer: ``,
        script: ``
    }));
});
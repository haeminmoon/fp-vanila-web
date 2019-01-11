app.get('/advertiser/adv_dashboard', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: ``,
        footer: ``,
        script: ``
    }));
});
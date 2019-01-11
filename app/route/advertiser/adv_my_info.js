app.get('/advertiser/adv_my_info', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: ``,
        footer: ``,
        script: ``
    }));
});
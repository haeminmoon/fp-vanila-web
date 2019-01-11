app.get('/common/signup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: ``,
        header: ``,
        nav: ``,
        main: ``,
        footer: ``,
        script: ``
    }));
});
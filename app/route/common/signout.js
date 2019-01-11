app.get('/common/signout', (req, res) => {
    req.session.user = null;
    res.redirect('/common/signin');
});
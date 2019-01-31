app.get('/notice_detail', async(req, res) => {
    let [notice] = await QUERY`SELECT * FROM notices WHERE id = ${req.query.id}`;
    if (!notice) return res.redirect('/common/signin');
    if (!req.session.user) return res.redirect('/common/signin');
    else if (req.session.user.auth !== "admin") {
        if (notice.notification_target !== "all") if (req.session.user.auth !== notice.notification_target) return res.redirect('/common/signin');
    }
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/admin/admin_common_notice.css" />
            <link rel="stylesheet" href="/front/css/admin/admin_detail.css" />
        `,
        header: TMPL.layout.accountHeader('find_user'),
        nav: getNav(user),
        main: `
            <div id="main">
                <div class="container">
                    <strong>${notice.name}</strong>
                    <div>
                        <span>공지대상</span>
                        <p>${notice.notification_target}</p>
                    </div>
                    <div>
                        <span>공지기간</span>
                        <p>${notice.info.due_date_start} ~ ${notice.info.due_date_end}</p>
                    </div>
                    <div class="notice_contents">
                        <span>내용</span>
                        <p>${notice.info.description}</p>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        `
    }));
});

const getNav = user => {
    if (user.auth === "admin") return TMPL.layout.adminNav("admin");
    else if (user.auth === "influencer") return TMPL.layout.infNav(user.info.nickname);
    else if (user.auth === "advertiser") return TMPL.layout.advNav(user.info.company_name);
    else return;
}
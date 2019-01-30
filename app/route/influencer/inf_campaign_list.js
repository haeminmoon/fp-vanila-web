app.get('/influencer/inf_campaign_list', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'influencer') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    const campaignList = await QUERY`SELECT * FROM campaign WHERE influencer_id->> ${req.session.user.id} IS NULL AND advertiser_state = 'progress'`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
        `,
        header: TMPL.layout.infHeader(user.info.nickname, user.id),
        nav: TMPL.layout.infNav(user.info.nickname),
        main: `
            <div id="main">
                <div class="breadcrumbs">
                    <a href="/">홈</a>
                    <a href="/influencer/inf_campaign_list">캠페인 리스트</a>
                </div>
                <div class="container">
                    ${go(campaignList, TMPL.InfCampaignList.list)}
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/influencer/inf_campaign_list.js"></script>
        `
    }));
});

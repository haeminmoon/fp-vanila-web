app.get('/influencer/inf_campaign_list', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');
    const campaignList = await QUERY `SELECT * FROM campaign WHERE influencer_id->> ${req.session.user.id} IS NULL AND state = 'progress'`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
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

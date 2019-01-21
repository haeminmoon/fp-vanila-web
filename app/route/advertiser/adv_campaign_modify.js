app.get('/advertiser/adv_campaign_modidfy', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');

    let [campaign] = await QUERY`SELECT * FROM campaign WHERE id = ${req.query.id}`;
    log(campaign)

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_detail.css" />
        `,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
            <div id="main">
                <div class="main_img_wrap">
                    <p>대표이미지</p>
                    <img src=${campaign.img} class="main_img" name="main_img" height="200" width="200">
                    <input type="file" target="main_img" accept="image/*" class="img_url">
                </div>
                <div class="sub_img_wrap">
                    <p>서브이미지</p>
                    ${writeHtmlSubImg(campaign.sub_img)}
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_campaign_modify.js"></script>
            <script>
                go('.img_url', $.all, AdvCampaignModify.Do.readyImage);
            </script>
        `
    }));
});

const writeHtmlSubImg = subImgArr => go(
    subImgArr,
    map(a => html`
        <img src=${a} class="sub_img" name="sub_img" height="200" width="200">
        <input type="file" target="sub_img" accept="image/*" class="img_url">
    `)
)
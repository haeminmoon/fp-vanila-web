!function () {
    TMPL.InfCampaignList = {};
    TMPL.InfCampaignList.list = (list) => go(
        list,
        map(item => `
           <div class="campaign">
                <a href="/influencer/inf_campaign_detail?id=${item.id}">
                    <img class="campaign_img" src=${item.img} height="220" alt="캠페인 사진">
                    <p class="campaign_info">${item.name}</p>
                </a>
            </div>
        `),
        el => html`${el}`
    )
}();
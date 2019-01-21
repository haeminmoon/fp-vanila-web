!function () {
    const Route = {
        infConfirm: $.on('click', e => go(
            {
                campaign_id: e.target.attributes.campaign_id.value
            },
            b => location.href = `/influencer/inf_campaign_apply?id=${b.campaign_id}`
        ))
    };

    global.InfCampaignDetail = {
        Route
    };
}();



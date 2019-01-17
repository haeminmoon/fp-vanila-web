!function () {
    const Route = {
        infConfirm: $.on('click', _ => { location.href = '/influencer/inf_campaign_apply' })
    }

    global.Confirm = {
        Route
    };
}();



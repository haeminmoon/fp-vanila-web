!function() {
    const Route = {
        advSignup: $.on('click', _ => go(
            '',
            _ => window.close(),
            _ => opener.location.href = '/advertiser/adv_signup'
        )),

        infSignup: $.on('click', _ => go(
            '',
            _ => window.close(),
            _ => opener.location.href = '/influencer/inf_signup'
        ))
    }

    global.SignupPopup = {
        Route
    };  
} ();



!function() {
    const Do = {
        init: _ => {
            window.fbAsyncInit = function() {
                FB.init({
                appId            : '335196420416993',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.2'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            } (document, 'script', 'facebook-jssdk'));
        },

        logIn: $.on('click', ({delegateTarget: dt}) => {
            
        }),

        sendInstagramProfile: $.on('click', _ => {
            $.find('[name="inst_profile_img"]', window.opener.document).src = $.find('[name="inst_profile_img"]', document).src;
            $.find('[name="inst_username"]', window.opener.document).innerText = $.find('[name="inst_username"]', document).innerText;
            $.find('[name="inst_media_count"]', window.opener.document).innerText = $.find('[name="inst_media_count"]', document).innerText;
            $.find('[name="inst_followers_count"]', window.opener.document).innerText = $.find('[name="inst_followers_count"]', document).innerText;
            $.find('[name="inst_follows_count"]', window.opener.document).innerText = $.find('[name="inst_follows_count"]', document).innerText;
            $.find('[name="inst_access_token"]', window.opener.document).innerText = $.find('[name="inst_access_token"]', document).innerText;
            $.find('[name="inst_user_id"]', window.opener.document).innerText = $.find('[name="inst_user_id"]', document).innerText;
            
            $.find('.inst_con_btn', window.opener.document).classList.add("hidden");
            $.all('.input_wrap', window.opener.document)[7].classList.remove("hidden");

            window.close();
        }),

        cancel: $.on('click', _ => window.close())
    }
    global.InfSignupConnectInstagram = {
        Do
    };
} ();

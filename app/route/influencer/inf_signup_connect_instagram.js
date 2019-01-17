const fbClientInfo = require('../../../config/fb_client_info');

app.get('/influencer/inf_signup_connect_instagram', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
        <link rel="stylesheet" href="/front/css/common/signup.css">
        <link rel="stylesheet" href="/front/css/influencer/inf_signup.css">
        `,
        header: TMPL.layout.accountHeader('signup'),
        main: `
            <div id="main">
                <div class="input_wrap">    
                    <label for="discript_inst">
                    현재 인스타그램 비즈니스 계정만 가입이 가능합니다. 인스타 비즈니스 계정과 연결된 페이스북 아이디(ID)를 입력해주세요.
                    </label>
                    <div class="fb-login-button" 
                    scope="manage_pages, instagram_basic" 
                    onlogin="statusLogin();"
                    data-max-rows="1" 
                    data-size="large" 
                    data-button-type="continue_with"></div>
                </div>
                <div class="input_wrap hidden">
                    <label for="inst_profile">Instagram Profile</label>
                    <img src="" class="inst_profile" name="inst_profile_img" height="100" width="100"/>
                    <label class="inst_profile" name="inst_username"></label>
                    <label class="inst_profile" name="inst_media_count"></label>
                    <label class="inst_profile" name="inst_followers_count"></label>                                
                    <label class="inst_profile" name="inst_follows_count"></label>
                    <input type="hidden" name="inst_access_token" class="inst_access_token">
                    <input type="hidden" name="inst_user_id" class="inst_user_id">
                    <label class="inst_profile">지금 보이는 프로필이 맞나요?</label> 
                    <button class="inst_profile_btn">확인</button>
                    <button class="cancel">취소</button>
                </div>
            </div>
        `,
        footer: `
        `,
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script src="/front/script/influencer/inf_signup_connect_instagram.js"></script>
            <script>
                go('.inst_profile_btn', $, InfSignupConnectInstagram.Do.sendInstagramProfile);
                go('.cancel', $, InfSignupConnectInstagram.Do.cancel);

                /**
                 * TO-DO 
                 * Front script로 이관
                 * sync 방식으로 Page rendering
                 * Graph API - npm 모듈 존재하는지 확인
                 */
                InfSignupConnectInstagram.Do.init();
                
                function statusLogin () {
                    FB.getLoginStatus(async function(response) {
                    try{
                        if (response.status === "connected") {
                            let id = await getFacebookId().then(data => data);
                            let instaProfile = await go(
                                id.id,
                                a => getInstagramId(a).then(data => data),
                                b => getInstagramProfile(b).then(data => data)
                            );
                            let longTermToken = await go(
                                response.authResponse.accessToken,
                                a => getLongTermToken(a).then(data => data)
                            );
                            $.find('[name="inst_profile_img"]', document).src = instaProfile.profile_picture_url;
                            $.find('[name="inst_username"]', document).innerText = instaProfile.username;
                            $.find('[name="inst_media_count"]', document).innerText = instaProfile.media_count;
                            $.find('[name="inst_followers_count"]', document).innerText = instaProfile.followers_count;
                            $.find('[name="inst_follows_count"]', document).innerText = instaProfile.follows_count;
                            $.find('[name="inst_access_token"]', document).innerText = longTermToken;
                            $.find('[name="inst_user_id"]', document).innerText = instaProfile.id;
                            
                            let input_wraps = $.all('.input_wrap');
                            input_wraps[0].classList.add('hidden');
                            input_wraps[1].classList.remove('hidden');
                        } else {
                            alert("로그인을 해주세요");
                        }
                    } catch (e) {
                        if (e.message === "Cannot read property 'id' of undefined") alert("인스타그램 계정과 연동된 페이스북 계정으로 로그인해주세요");
                    }
                    });
                }
    
                function getFacebookId () {
                    return new Promise((resolve, reject) => {
                        FB.api('/me/accounts', 'GET', {"fields":"id"},
                            response => resolve(response.data[0])
                        );
                    });
                }
    
                function getInstagramId (id) {
                    return new Promise((resolve, reject) => {
                        FB.api('/'+id, 'GET', {"fields":"instagram_business_account"},
                            response => resolve(response.instagram_business_account.id)
                        );
                    });
                }
    
                function getInstagramProfile (id) {
                    return new Promise((resolve, reject) => {
                        FB.api('/'+id, 'GET', {"fields":"username,profile_picture_url,media_count,followers_count,follows_count,name"},
                            response => resolve(response)
                        );
                    })
                }
    
                function getLongTermToken (accessToken) {
                    return new Promise((resolve, reject) => {
                        FB.api('/oauth/access_token', 'GET', {
                            "grant_type": "fb_exchange_token",
                            "client_id": "${fbClientInfo.clientId}",
                            "client_secret": "${fbClientInfo.clientSecret}",
                            "fb_exchange_token":accessToken
                        }, response => resolve(response.access_token));
                    })
                }
            </script>
        `
    }));
});

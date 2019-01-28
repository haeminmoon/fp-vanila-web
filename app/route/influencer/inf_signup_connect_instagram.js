const fbClientInfo = require('../../../config/fb_client_info');

app.get('/influencer/inf_signup_connect_instagram', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
        <link rel="stylesheet" href="/front/css/influencer/inf_signup_connect_instagram.css">
        `,
        header: ``,
        main: `
            <div id="main">
                <div class="input_wrap">    
                    <div class="facebook_wrap">
                        <div class="header">SNS 연동하기</div>
                        <label for="discript_inst" class="txt">
                            <p class="txt_top">현재 인스타그램 비즈니스 계정만 가입이 가능합니다.</p>
                            <p class="txt_mid">인스타 비즈니스 계정과</p>
                            <p>연결된 페이스북 아이디(ID)를 입력해주세요.</p>
                        </label>
                        <div class="fb_login_btn">
                            <div class="fb-login-button" 
                                scope="user_birthday, user_location, manage_pages, instagram_basic"
                                onlogin="statusLogin();"
                                data-max-rows="1" 
                                data-size="large"
                                data-button-type="continue_with">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="input_wrap hidden">
                    <div class="insta_correct">
                        <div class="header">SNS 연동하기</div>
                            <img class="instagram_profile_img" name="instagram_profile_img"/>
                            <div class="profile_txt">
                                <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram_color.png" alt="인스타그램 로고">
                                <span class="username" name="instagram_username"></span>
                                <span>게시물<strong class="media_count" name="instagram_media_count"></strong></span>
                                <span>팔로워<strong class="followers_count" name="instagram_followers_count"></strong></span>
                                <span>팔로우<strong class="follows_count" name="instagram_follows_count"></strong></span>
                                <input type="hidden" name="instagram_access_token">
                                <input type="hidden" name="instagram_user_id">
                                <input type="hidden" name="instagram_user_birthday">
                            </div>
                            <div class="profile_cor">
                                <span class="instagram_profile">지금 보이는 프로필이 맞나요?</span> 
                                <button class="instagram_profile_btn">확인</button>
                                <button class="cancel">취소</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/influencer/inf_signup_connect_instagram.js"></script>
        <script>
            go('.instagram_profile_btn', $, InfSignupConnectInstagram.Do.sendInstagramProfile);
            go('.instagram_profile_btn', $, InfSignupConnectInstagram.Do.sendInstagram);
            go('.instagram_profile_btn', $, InfSignupConnectInstagram.Do.show);
            go('.cancel', $, InfSignupConnectInstagram.Do.cancel);

                /**
                 * TO-DO 
                 * Front script로 이관
                 * sync 방식으로 Page rendering
                 * Graph API - npm 모듈 존재하는지 확인
                 */
                InfSignupConnectInstagram.Do.init();
                
                function statusLogin () {
                    FB.getLoginStatus(async (response) => {
                    try{
                        if (response.status === "connected") {
                            let id = await getFacebookId().then(data => data);
                            let instagramProfile = await go(
                                id.id,
                                a => getInstagramId(a).then(data => data).catch(e => e),
                                b => {
                                    if (!!b.message) throw b;
                                    else return b;
                                },
                                c => getInstagramProfile(c).then(data => data)
                            );
                            let longTermToken = await go(
                                response.authResponse.accessToken,
                                a => getLongTermToken(a).then(data => data)
                            );
                            let userBirthday = await go('', _ => getUserBirthday().then(data => data));
                            userBirthday = userBirthday.split('/'); // [MM, DD, YYYY]
                            userBirthday = {"year" : userBirthday[2], "month" : userBirthday[0], "day" : userBirthday[1]};
                            $.find('[name="instagram_profile_img"]', document).src = instagramProfile.profile_picture_url;
                            $.find('[name="instagram_username"]', document).innerText = instagramProfile.username;
                            $.find('[name="instagram_media_count"]', document).innerText = instagramProfile.media_count;
                            $.find('[name="instagram_followers_count"]', document).innerText = instagramProfile.followers_count;
                            $.find('[name="instagram_follows_count"]', document).innerText = instagramProfile.follows_count;
                            $.find('[name="instagram_access_token"]', document).innerText = longTermToken;
                            $.find('[name="instagram_user_id"]', document).innerText = instagramProfile.id;
                            $.find('[name="instagram_user_birthday"]', document).innerText = JSON.stringify(userBirthday);
                            
                            let input_wraps = $.all('.input_wrap');
                            input_wraps[0].classList.add('hidden');
                            input_wraps[1].classList.remove('hidden');
                        } else {
                            alert("로그인을 해주세요");
                        }
                    } catch (e) {
                        if (e.message === "Cannot read property 'id' of undefined") alert("인스타그램 계정과 연동된 페이스북 계정으로 로그인해주세요");
                        else alert(e)
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
                            response => {
                                if (!response.instagram_business_account) reject(new Error("Cannot read property 'id' of undefined"));
                                else resolve(response.instagram_business_account.id);
                            }
                        );
                    });
                }
    
                function getInstagramProfile (id) {
                    return new Promise((resolve, reject) => {
                        FB.api('/'+id, 'GET', {"fields":"username,profile_picture_url,media_count,followers_count,follows_count,name"},
                            response => resolve(response)
                        );
                    });
                }
    
                function getLongTermToken (accessToken) {
                    return new Promise((resolve, reject) => {
                        FB.api('/oauth/access_token', 'GET', {
                            "grant_type": "fb_exchange_token",
                            "client_id": "${fbClientInfo.clientId}",
                            "client_secret": "${fbClientInfo.clientSecret}",
                            "fb_exchange_token":accessToken
                        }, response => resolve(response.access_token));
                    });
                }

                function getUserBirthday () {
                    return new Promise((resolve, reject) => {
                        FB.api('/me', 'GET', {"fields":"birthday"},
                            response => resolve(response.birthday)
                        );
                    });
                }
            </script>
        `
    }));
});
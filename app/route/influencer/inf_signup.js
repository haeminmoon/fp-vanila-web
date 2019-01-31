// const {config, Group} = require('coolsms-sdk-v4');

const getHash = require('../../../module/back/util/encryption');
const getRandomInt6 = require('../../../module/back/util/getRandomInt');
// const coolsms = require('../../../config/coolsms');

app.get('/influencer/inf_signup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/common_signup.css">
            <link rel="stylesheet" href="/front/css/influencer/inf_signup.css">
            <link rel="stylesheet" href="/front/css/influencer/media/media_inf_signup.css">
         `,
        header: TMPL.layout.accountHeader('signup'),
        main: `
            <div id="main">
                <div class="container">
                    <div class="signup_form">
                        <div class="info">
                        <!-- 개인정보 입력 폼 -->
                            <h2 class="form_tit">개인정보 입력</h2>
                                <div class="form_left">
                                    <div class="input_wrap"> 
                                        <label for="profile_pic">사진(1MB 이하)<sup>*</sup></label>
                                        <input type="file" name="profile_pic" id="profile_pic">
                                        <img id="profile_image" src="#" width="50" height="50" alt="your image"/>
                                    </div>
                                    <div class="input_wrap">
                                        <label for="name">이름(본명)</label>
                                        <input type="text" name="name" id="name">
                                    </div>
                                </div>

                                <div class="form_right">
                                    <div class="input_wrap">
                                        <label for="nickname">닉네임<sup>*</sup></label>
                                        <input type="text" name="nickname" id="nickname">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="birth">생년월일<sup>*</sup></label>
                                        <input type="text" name="birth" id="birth" placeholder="생년월일 8자리">
                                    </div>

                                    <div class="select_box">
                                        <label for="gender" class="gen_la">성별<sup>*</sup></label>
                                        <span>
                                            <input type="radio" name="gender" value="man" id="man" checked>
                                            <label for="man">남</label>
                                        </span>
                                        <span> 
                                            <input type="radio" name="gender" value="woman" id="woman">
                                            <label for="woman">여</label> 
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <!-- 회원정보 입력 폼 끝  -->
                        <!-- 계정 입력 -->
                        <div class="account">
                            <h2 class="form_tit">계정 만들기</h2>
                                <div class="form">
                                    <div class="input_wrap">
                                        <label for="id">ID<sup>*</sup></label>
                                        <input type="text" name="id" class="id" id="id" placeholder="sample@sample.com">
                                        <button type="button" class="id_chk_btn">중복확인</button>
                                        <p class="error id_error"></p>
                                    </div>
                                    <div class="input_wrap">
                                        <label for="password">비밀번호<sup>*</sup></label>
                                        <input type="password" name="password" id="password">
                                        <p class="error password_error"></p>
                                    </div>
                                    <div class="input_wrap">
                                        <label for="password_chk">비밀번호 확인<sup>*</sup></label>
                                        <input type="password" name="password_chk" id="password_chk">
                                        <p class="error password_chk_error"></p>
                                    </div>
                                    <ul class="notice">
                                        <li>* 영문, 숫자, 특수문자 혼합 8자리 이상</li>
                                        <li>* 연속되는 영문 또는 숫자 3자리 이상 불가</li>
                                    </ul>
                                </div>
                        </div>
                        <!-- 계정 입력 끝 -->
                        <div class="clear"></div>
                        <!-- sns 연동 -->
                        <div class="sns_con">
                            <h2 class="form_tit">SNS</h2>
                            <div class="form">
                                <button type="button" class="instagram_con_btn">instagram 연결하기</button>
                                <div class="input_wrap hidden sns_wrap">
                                    <img class="instagram_profile_img" name="instagram_profile_img"/>
                                    <div class="profile_txt">
                                        <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram_color.png" alt="인스타그램 로고">
                                        <span class="username" name="instagram_username"></span>
                                        <span>게시물<strong class="media_count" name="instagram_media_count"></strong></span>
                                        <span>팔로워<strong class="followers_count" name="instagram_followers_count"></strong></span>
                                        <span>팔로우<strong class="follows_count" name="instagram_follows_count"></strong></span>
                                        <input type="hidden" name="instagram_access_token" class="instagram_access_token">
                                        <input type="hidden" name="instagram_user_id" class="instagram_user_id">
                                        <input type="hidden" name="instagram_user_birthday" class="instagram_user_birthday">    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- sns 끝 -->
                        <div class="phone_cer">
                            <h2 class="form_tit">휴대폰 인증</h2>
                                <div class="form">
                                    <div class="input_wrap">
                                        <label for="phone_num">휴대폰 번호<sup>*</sup></label>
                                        <input type="text" name="phone_num" id="phone_num" class="phone_num">
                                        <button type="button" class="phone_chk_btn">본인인증</button>
                                        <p class="error phone_num_error"></p>
                                    </div>
                                    <div class="input_wrap hidden">
                                        <label for="phone_phone_certification_num">인증번호<sup>*</sup></label>
                                        <input type="text" name="phone_certification_num" id="phone_certification_num" class="phone_certification_num">
                                        <span class="error code_error"></span>
                                        <input type="hidden" name="user_code" class="user_code">
                                    </div>
                                </div>
                        </div>
                        <!-- 이용약관 -->
                        <div class="term_inf">
                            <h2 class="form_tit">약관</h2>
                                <div class="agree">
                                    <p class="all_agree">
                                        <input type="checkbox" name="all_chk" id="all_chk">
                                        <label for="all_chk">전체 동의</label>
                                    </p>
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk1" id="chk1" class="chk">
                                            <label for="chk1"><a href="#">이용약관</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk2" id="chk2" class="chk">
                                            <label for="chk2"><a href="#">개인정보 수집 및 이용동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk3" id="chk3" class="chk">
                                            <label for="chk3"><a href="#">매월 15일/30일 정산동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk4" id="chk4" class="chk">
                                            <label for="chk4"><a href="#">개인정보 제3자 제공 동의</a></label>                                        
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk5" id="chk5" class="chk">
                                            <label for="chk5"><a href="#">전자 금융거래 이용약관</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk6" id="chk6" class="chk">
                                            <label for="chk6"><a href="#">[광고용]SNS 수신 동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk7" id="chk7" class="chk">
                                            <label for="chk7"><a href="#">[광고용]E-mail 수신 동의</a></label>
                                        </li>
                                    </ul>
                                </div>
                        </div>
                        <!-- 이용약관 끝 -->
                        <div class="clear"></div>
                        <div class="submit_wrap">
                            <button type="button" class="submit_btn">가입하기</button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/influencer/inf_signup.js"></script> 
        <script>
            go('.signup_form', $, InfSignup.Do.signup);
            go('.signup_form', $, InfSignup.Do.checkId);
            go('.signup_form', $, InfSignup.Do.checkBn);
            go('.input_wrap', $, InfSignup.Do.readyImage);
            go('#id', $, InfSignup.Do.validateEmail);
            go('#password', $, InfSignup.Do.validatePw);
            go('#password_chk', $, InfSignup.Do.validateCheckPw);
            go('#phone_num', $, InfSignup.Do.validatePhoneNumber);
            go('#phone_certification_num', $, InfSignup.Do.validateCheckCode);
            go('.phone_chk_btn', $, InfSignup.Do.showCodePhone);
            go('.instagram_con_btn', $, InfSignup.Do.openInstagramLogin);
            go('#all_chk', $, InfSignup.Do.checkAllAgree);
        </script>
         `
    }));
});

/**
 * 인플런서 회원가입
 */
app.post('/api/influencer/inf_signup', (req, res, next) => {
    go(
        req.body,
        a => {
            a.pw = getHash(a.pw);
            return a;
        },
        pipeT(
            b => QUERY`INSERT INTO users ${VALUES(b)} RETURNING id, auth, info, created_at`,
            first,
            c => {
                QUERY`INSERT INTO user_notification ${VALUES({"id": c.id, "auth": c.auth})}`
                return c;
            },
            res.json
        ).catch(
            match
                .case({ constraint: 'tb_user_pkey' })(_ => 'id')
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});

/**
 * 인플런서 아이디 중복체크
 */
app.post('/api/influencer/inf_checkId', (req, res, next) => {
    go(
        req.body.id,
        pipeT(
            a => QUERY`SELECT * FROM users WHERE id = ${a}`,
            b => {
                if (b.length !== 0) {
                    throw 'The ID is already exist';
                }
                return b;
            },
            res.json
        ).catch(
            match
                .case('The ID is already exist')(_ => 'The ID is already exist')
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});

/**
 * 인플런서 인증번호 발송
 */
app.post('/api/influencer/inf_checkBn', (req, res, next) => {
    // const code = String(getRandomInt6());

    // config.init({
    //     apiKey: coolsms.apiKey,
    //     apiSecret: coolsms.apiSecret
    // });
    // go(
    //     req.body.phone_num,
    //     a  => {
    //         return { text: `spin-protocol 에서 발송한 인증번호 ${code} 입니다.`,
    //             type: coolsms.type,
    //             to: a,
    //             from: coolsms.from };
    //     },
    //     pipeT(
    //         b => Group.sendSimpleMessage(b),
    //         _ => res.json({code : code})
    //     ).catch(
    //         m => new Error(m),
    //         next
    //     )
    // )
});
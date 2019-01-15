const getHash = require('../../../module/back/util/encryption');

app.get('/advertiser/adv_signup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signup.css">
            <link rel="stylesheet" href="/front/css/advertiser/adv_signup.css">
         `,
        header: TMPL.layout.header(),
        main: `
            <div id="main">
                <div class="container">
                    <div class="signup_form">
                        <div class="info">
                        <!-- 회원정보 입력 폼 -->
                            <h2 class="form_tit">사업자 번호</h2>
                                <div class="form_left">
                                    <div class="input_wrap">
                                        <label for="company_name">회사명<sup>*</sup></label>
                                        <input type="text" name="company_name" id="company_name">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="brand_name">브랜드 명</label>
                                        <input type="text" name="brand_name" id="brand_name">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="ceo_name">대표자 명<sup>*</sup></label>
                                        <input type="text" name="ceo_name" id="ceo_name">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="business_num">사업자등록 번호<sup>*</sup></label>
                                        <input type="text" name="business_num" id="business_num">
                                    </div>
                                </div>
                                <div class="form_right">
                                    <div class="input_wrap">
                                        <label for="event">종목<sup>*</sup></label>
                                        <input type="text" name="event" class="event" id="event"> 
                                    </div>
                                    <div class="input_wrap input_margin">
                                        <label for="industry">업태<sup>*</sup></label>
                                        <input type="text" name="industry" class="industry" id="industry">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="phone_num">전화번호<sup>*</sup></label>
                                        <input type="text" name="phone_num" id="phone_num">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="post_code">회사 주소<sup>*</sup></label>
                                        <input type="text" name="post_code" class="post_code" id="post_code">
                                        <button type="button" class="sch_add_btn">주소검색</button>
                                        <input type="text" name="address" class="address">                                    </div>
                                </div>
                        </div>
                        <!-- 회원정보 입력 폼 끝  -->

                        <!-- 계정 입력 -->
                        <div class="account">
                            <h2 class="form_tit">계정 만들기</h2>
                                <div class="form">
                                    <div class="input_wrap">
                                        <label for="id">ID<sup>*</sup></label>
                                        <input type="text" name="id" class="id" id="id">
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
                        <!-- 서류 등록 -->
                        <div class="document">
                            <h2 class="form_tit">서류등록</h2>
                                <div class="form">
                                    <p class="notice">결과는 3일 이내 등록하신 이메일로 발송됩니다. 파일은 PDF 혹은 JPG 파일 5Mb 이하로 업로드해 주세요.</p>
                                </div>
                        </div>
                        <!-- 서류 끝 -->
                        <!-- 이용약관 -->
                        <div class="term">
                            <h2 class="form_tit">약관</h2>
                                <div class="agree">
                                    <p class="all_agree">
                                        <input type="checkbox" name="all_chk" id="all_chk">
                                        <label for="all_chk">전체 동의</label>
                                    </p>
                                    <ul>
                                        <li>
                                            <input type="checkbox" name="chk1" id="chk1">
                                            <label for="chk1"><a href="#">이용약관</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk2" id="chk2">
                                            <label for="chk2"><a href="#">개인정보 수집 및 이용동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk3" id="chk3">
                                            <label for="chk3"><a href="#">매월 15일/30일 정산동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk4" id="chk4">
                                            <label for="chk4"><a href="#">개인정보 제3자 제공 동의</a></label>                                        
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk5" id="chk5">
                                            <label for="chk5"><a href="#">전자 금융거래 이용약관</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk6" id="chk6">
                                            <label for="chk6"><a href="#">[광고용]SNS 수신 동의</a></label>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk7" id="chk7">
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
        <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
        <script src="/front/script/advertiser/adv_signup.js"></script>
        <script>
            go('.signup_form', $, AdvSignUp.Do.signup);
            go('.signup_form', $, AdvSignUp.Do.checkId);
            go('#id', $, AdvSignUp.Do.validateEmail);
            go('#password', $, AdvSignUp.Do.validatePw);
            go('#password_chk', $, AdvSignUp.Do.validateCheckPw);
            go('.sch_add_btn', $, AdvSignUp.Do.showPost)
        </script>
         `
    }));
});

app.post('/api/advertiser/adv_signup', (req, res, next) => {
    go(
        req.body,
        a => {
            a.pw = getHash(a.pw);
            return a;
        },
        pipeT(
            b => QUERY `INSERT INTO users ${VALUES(b)}`,
            res.json
        ).catch(
            match
                .case({ constraint: 'tb_user_pkey' })(
                    _ => 'id'
                )
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});

/**
 * 광고주 아이디 중복체크
 */
app.post('/api/advertiser/adv_checkId', (req, res, next) => {
    go(
        req.body.id,
        pipeT(
            a => QUERY `SELECT * FROM users WHERE id = ${a}`,
            b => {
                if (b.length !== 0){
                    throw 'The ID is already exist';
                }
                return b;
            },
            res.json
        ).catch(
            match
                .case ('The ID is already exist')(_ => 'The ID is already exist')
                .else (_ => ''),
            m => new Error(m),
            next
        )
    )
});
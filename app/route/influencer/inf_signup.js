app.get('/influencer/inf_signup', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/signup.css">
            <link rel="stylesheet" href="/front/css/inf_signup.css">
         `,
        header: TMPL.layout.header(),
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
                                        <input type="text" name="birth" id="birth">
                                    </div>
                                    <div class="input_wrap">
                                        <label for="gender">성별<sup>*</sup></label>
                                        <p>
                                            <input type="radio" name="gender" value="man" id="gender">남
                                        </p> 
                                        <input type="radio" name="gender" value="woman" id="gender">여 
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
                                        <input type="text" name="id" class="id" id="id">
                                        <button type="button" class="id_chk_btn">중복확인</button>
                                    </div>
                                    <div class="input_wrap">
                                        <label for="password">비밀번호<sup>*</sup></label>
                                        <input type="text" name="password" id="password">

                                    </div>
                                    <div class="input_wrap">
                                        <label for="password_chk">비밀번호 확인<sup>*</sup></label>
                                        <input type="text" name="password_chk" id="password_chk">

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
                                    <button type="button" class="inst_con_btn">instagram 연결하기</button>
                                </div>
                        </div>
                        <!-- sns 끝 -->
                        <div class="phone_cer">
                            <h2 class="form_tit">휴대폰 인증</h2>
                                <div class="form">
                                    <div class="input_wrap">
                                        <label for="phone_num_cer">휴대폰 번호<sup>*</sup></label>
                                        <input type="text" name="phone_num_cer" id="phone_num_cer" class="phone_num_cer">
                                        <button type="button" class="phone_chk_btn">본인인증</button>
                                    </div>
                                    <div class="input_wrap">
                                        <label for="certification_num">인증번호<sup>*</sup></label>
                                        <input type="text" name="certification_num" id="certification_num" class="certification_num">
                                    </div>
                                </div>
                        </div>
                        <!-- 이용약관 -->
                        <div class="term_inf">
                            <h2 class="form_tit">약관</h2>
                                <div class="form">
                                    <p class="input_wrap check_box">
                                        <input type="checkbox" name="all_chk" id="all_chk">
                                        <label for="all_chk">전체 동의</label>
                                    </p>
                                    <ul class="input_wrap check_wrap">
                                        <li>
                                            <input type="checkbox" name="chk1" id="chk1">
                                            <a href="#">이용약관</a>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk2" id="chk2">
                                            <a href="#">개인정보 수집 및 이용동의</a>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk3" id="chk3">
                                            <a href="#">매월 15일/30일 정산동의</a>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk4" id="chk4">
                                            <a href="#">개인정보 제3자 제공 동의</a>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk5" id="chk5">
                                            <a href="#">전자 금융거래 이용약관</a>
                                        </li>
                                        <li>
                                            <input type="checkbox" name="chk6" id="chk6">
                                            <a href="#">[광고용]SNS 수신 동의</a>
                                        </li>
                                    <li>
                                        <input type="checkbox" name="chk7" id="chk7">
                                        <a href="#">[광고용]E-mail 수신 동의</a>
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
    
         `
    }));
});
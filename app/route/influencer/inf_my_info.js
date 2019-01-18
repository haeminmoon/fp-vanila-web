app.get('/influencer/inf_my_info', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_my_info.css" />
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            <div id="main">
                <div class="container">

                    <div class="password_wrap">
                        <h2 class="set_tit">
                            비밀번호 변경
                        </h2>
                        <div class="setting">
                            <label for="password">기존 비밀번호</label>
                            <input type="text" name="password" id="password">
                            <label for="new_password">비밀번호</label>
                            <input type="text" name="new_password" id="new_password">
                            <label for="password">비밀번호 확인</label>
                            <input type="text" name="password_chk" id="password_chk">
                        </div>
                        <ul class="notice">
                            <li>* 영문, 숫자, 특수문자 혼합 8자리 이상</li>
                            <li>* 연속되는 영문 또는 숫자 3자리 이상 불가</li>
                        </ul>
                        <div class="btn_wrap">
                            <button type="button" class="setting_btn">비밀번호 변경</button>
                        </div>
                    </div>

                    <div class="address_wrap">
                        <h2 class="set_tit">
                            배송지 관리
                        </h2>
                        <div class="setting">
                            <input type="text" name="address" id="address" placeholder="배송지 이름">
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="add_address">배송지 추가</button>
                        </div>
                    </div>

                    <div class="nickname_wrap">
                        <h2 class="set_tit">
                            닉네임 변경
                        </h2>
                        <div class="setting">
                            <input type="text" name="nick" id="name">
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="nickname_modify">변경하기</button>
                        </div>
                    </div>

                </div>
            </div>
        `,
        footer: ``,
        script: ``
    }));
});
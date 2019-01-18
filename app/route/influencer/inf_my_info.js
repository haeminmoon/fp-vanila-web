app.get('/influencer/inf_my_info', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');
    const { user } = req.session;;
    console.log(user);
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_my_info.css" />
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            <div id="main">
                <div class="container">

                    <div class="account_wrap">
                        <h2 class="set_tit">
                            계정정보
                        </h2>
                        <div class="setting">
                            <label for="id">아이디</label>
                            <input type="text" name="id" id="id" readonly value="${user.id}">
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

                    <div class="name_wrap">
                        <h2 class="set_tit">
                            개인정보
                        </h2>
                        <div class="setting">
                            <label for="nick">닉네임</label>
                            <input type="text" name="nickname" id="nickname" placeholder="활동 시 사용이름"  value="${user.info.nickname}">
                            <label for="name">이름</label>
                            <input type="text" name="name" id="name" placeholder="본명" value="${user.info.name}">
                            <label for="birth">생년월일</label>
                            <input type="text" name="birth" id="birth" placeholder="ex. 19900216" value="${user.info.birth}">
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


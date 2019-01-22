const getHash = require('../../../module/back/util/encryption');
const { get } = require('../../../module/back/util/request');
// const getInstagramInfo = (id, accessToken) => get(`https://graph.facebook.com/v3.2/${id}?fields=followers_count%2Cfollows_count%2Cmedia_count%2Cprofile_picture_url%2Cusername%2Cname&access_token=${accessToken}`, ``);
// const instagramInfo = getInstagramInfo(id, accessToken);

app.get('/influencer/inf_my_info', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

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
                            <input type="password" name="password" id="password">
                            <p class="error password_error"></p>

                            <label for="new_password">비밀번호</label>
                            <input type="password" name="new_password" id="new_password">
                            <p class="error new_password_error"></p>

                            <label for="password_chk">비밀번호 확인</label>
                            <input type="password" name="password_chk" id="password_chk">
                            <p class="error password_chk_error"></p>
                        </div>
                        <ul class="notice">
                            <li>* 영문, 숫자, 특수문자 혼합 8자리 이상</li>
                            <li>* 연속되는 영문 또는 숫자 3자리 이상 불가</li>
                        </ul>
                        <div class="btn_wrap">
                            <button type="button" class="modify_password_btn">비밀번호 변경</button>
                        </div>
                    </div>

                    <div class="personal_wrap">
                        <h2 class="set_tit">
                            개인정보
                        </h2>
                        <div class="setting">
                            <label for="name">이름</label>
                            <input type="text" name="name" id="name" placeholder="본명" value="${user.info.name}">
                            <label for="nickname">닉네임</label>
                            <input type="text" name="nickname" id="nickname" placeholder="활동 시 사용이름"  value="${user.info.nickname}">
                            <label for="birth">생년월일</label>
                            <input type="text" name="birth" id="birth" placeholder="ex. 19900216" value="${user.info.birth}">
                            <!--
                            <label for="phone_num">핸드폰 번호</label>
                            <input type="text" name="phone_num" id="phone_num" placeholder="ex. 01012341234" value="${user.info.phone_num}">
                            -->
                            <label for="gender">성별</label>
                            <span class="gen_der">
                                <input type="radio" name="gender" value="man" id="man">
                                <label for="man">남</label>
                            </span>
                            <span class="gen_der"> 
                                <input type="radio" name="gender" value="woman" id="woman">
                                <label for="woman">여</label> 
                            </span>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="modify_psInfo_btn">변경하기</button>
                        </div>
                    </div>

                    <div class="sns_wrap">
                        <h2 class="set_tit">
                            SNS 연동
                        </h2>
                
                    </div>

                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/influencer/inf_my_info.js"></script>
            <script>
                go('.account_wrap', $, InfMyInfo.editInfo.password);
                go('.personal_wrap', $, InfMyInfo.editInfo.personalInfo);
                go('#new_password', $, InfMyInfo.validate.password);
                go('#password_chk', $, InfMyInfo.validate.CheckPw);
            </script>  
        `
    }));
});


app.put('/api/inf_my_info/modify_password', (req, res, next) => {
    const { user } = req.session;
    const textDate = req.body;
    go(
        textDate,
        pipeT(
            a => QUERY`SELECT * FROM users WHERE id = ${user.id}`,
            first,
            b => {
                if (b.pw !== getHash(textDate.password)) {
                    throw 'The password is incorrect';
                }
                return b;
            },

            c => {
                if (getHash(textDate.password) === getHash(textDate.new_password)) {
                    throw 'Same password'
                }
                return c;
            },
            _ => QUERY`UPDATE users SET pw = ${getHash(textDate.new_password)} WHERE pw = ${getHash(textDate.password)}`,
            res.json
        ).catch(
            match
                .case('Same password')(_ => 'Same password')
                .case('The password is incorrect')(_ => 'The password is incorrect')
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});

app.put('/api/inf_my_info/modify_ps_info', (req, res) => {
    const { user } = req.session;
    const textDate = req.body;
    const object = { info: { "name": textDate.name, "nickname": textDate.nickname, "birth": textDate.birth, "gender": textDate.gender } };
    go(
        textDate,
        tap(log),
        _ => QUERY`UPDATE users SET info = info - '*' || ${object.info} WHERE id = ${user.id} RETURNING true`,
        res.json
    )
});
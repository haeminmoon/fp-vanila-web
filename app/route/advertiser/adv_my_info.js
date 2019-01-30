const getHash = require('../../../module/back/util/encryption');

app.get('/advertiser/adv_my_info', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_my_info.css"/>
        `,
        header: TMPL.layout.advHeader(user.info.company_name, user.id),
        nav: TMPL.layout.advNav(user.info.company_name),
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

                <div class="company_wrap">
                    <h2 class="set_tit">
                        사업자 정보
                    </h2>
                    <div class="setting">
                        <label for="company_name">회사명</label>
                        <input type="text" name="company_name" id="company_name" value="${user.info.company_name}">
                        <label for="brand_name">브랜드 명</label>
                        <input type="text" name="brand_name" id="brand_name" value="${user.info.brand_name}">
                        <label for="ceo_name">대표자 명</label>
                        <input type="text" name="ceo_name" id="ceo_name" value="${user.info.ceo_name}">
                        <label for="business_num">사업자등록 번호</label>
                        <input type="text" name="business_num" id="business_num" value="${user.info.business_num}">
                        <span class="haf">
                            <label for="event">종목</label>
                            <input type="text" name="event" class="event" id="event" value="${user.info.event}"> 
                        </span>
                        <span class="haf">
                            <label for="industry">업태</label>
                            <input type="text" name="industry" class="industry" id="industry" value="${user.info.industry}">
                        </span>
                        <label for="phone_num">전화번호</label>
                        <input type="text" name="phone_num" id="phone_num" placeholder="ex. 0212341234" value="${user.info.phone_num}" >
                    </div>
                    <div class="btn_wrap">
                        <button type="button" class="modify_bsInfo_btn">변경하기</button>
                    </div>
                </div>

                <div class="address_wrap">
                    <h2 class="set_tit">
                        주소
                    </h2>
                    <div class="setting">
                        <span class="haf">
                            <label for="post_code">회사 주소</label>
                            <input type="text" name="post_code" class="post_code" id="post_code" value="${user.info.post_code}">
                        </span>
                        <button type="button" class="sch_add_btn">주소검색</button>
                        <input type="text" name="address" class="address" placeholder="상세주소" value="${user.info.address}">        
                    </div>
                    <div class="btn_wrap">
                        <button type="button" class="modify_address_btn">변경하기</button>
                    </div>
                </div>

            </div>
        </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/advertiser/adv_my_info.js"></script>
        <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
        <script>
            go('.account_wrap', $, AdvMyInfo.editInfo.password);
            go('.company_wrap', $, AdvMyInfo.editInfo.businessInfo);
            go('.address_wrap', $, AdvMyInfo.editInfo.address);
            go('#new_password', $, AdvMyInfo.validate.password);
            go('#password_chk', $, AdvMyInfo.validate.CheckPw);
            go('.sch_add_btn', $, AdvMyInfo.editInfo.showPost)
        </script>  
        `
    }));
});

app.put('/api/adv_my_info/modify_password', (req, res, next) => {
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
                .case('The password is incorrect')(_ => 'The password is incorrect')
                .case('Same password')(_ => 'Same password')
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});


app.put('/api/adv_my_info/modify_ps_info', (req, res) => {
    const { user } = req.session;
    const textDate = req.body;
    const object = { info: { "company_name": textDate.company_name, "brand_name": textDate.brand_name, "ceo_name": textDate.ceo_name, "business_num": textDate.business_num, "event": textDate.event, "industry": textDate.industry, "phone_num": textDate.phone_num } };
    go(
        textDate,
        tap(log),
        _ => QUERY`UPDATE users SET info = info - '*' || ${object.info} WHERE id = ${user.id} RETURNING true`,
        res.json
    )
});

app.put('/api/adv_my_info/modify_ad_info', (req, res) => {
    const { user } = req.session;
    const textDate = req.body;
    const object = { info: { "address": textDate.address, "post_code": textDate.post_code } };
    go(
        textDate,
        tap(log),
        _ => QUERY`UPDATE users SET info = info - '*' || ${object.info} WHERE id = ${user.id} RETURNING true`,
        res.json
    )
});
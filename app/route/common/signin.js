const getHash = require('../../../module/back/util/encryption');

app.get('/common/signin', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signin.css">
        `,
        header: `
            <div id="header">
                <h1 class="logo">
                    <a href="/">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                    </a>
                </h1>
                <p class="title">${__('signin')}</p>
            </div>
        `,
        main: `
            <div id="main">
                <div class="signin_box">
                    <p class="login_tit">SIGN IN</p>
                    <div class="select_wrap">
                        <span class="select_box">
                            <input type="radio" name="select_role" value="supplier" id="supplier" checked>
                            <label for="supplier">${__('supplier')}</label>
                        </span>
                        <span class="select_box">
                            <input type="radio" name="select_role" value="influencer" id="influencer">
                            <label for="influencer">${__('influencer')}</label>
                        </span>
                    </div>
                    <div class="signin_wrap">
                        <input type="text" class="id" class="id" placeholder="${__('id')}">
                        <input type="password" class="pw" placeholder="${__('pw')}">
                        <button class="signin_btn">${__('signin')}</button>
                    </div>
                    <div class="other_wrap">
                        <a href="#" class="btn signup">${__('signup')}</a>
                        <a href="/common/find_user" class="btn find_user">${__('find_user')}</a>
                    </div>
                </div>
            </div>
        `,
        footer: `
            <div id="footer">
                <p>${__('copyright')}</p>
            </div>
        `,
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script>
                go('.signup', $, Signin.Route.signupPopup);
                go('.signin_wrap', $, Signin.Do.signin);
            </script>
        `
    }));
});

/**
 * 로그인
 */
app.post('/api/common/signin', (req, res, next) => {
    go(
        req.body,
        pipeT(
            a => QUERY`SELECT * FROM users WHERE id = ${a.id}`,
            b => {
                if (b.length === 0) throw 'The ID does not exist';
                return b;
            },
            first,
            c => {
                if (c.pw !== getHash(req.body.pw)) throw 'The password is incorrect';
                return c;
            },
            d => req.session.user = d || null,
            res.json
        ).catch(
            match
                .case('The ID does not exist')(
                    _ => 'id'
                )
                .case('The password is incorrect')(
                    _ => 'pw'
                )
                .else(_ => ''),
            m => new Error(m),
            next,
        )
    )
});

// Signin test code
// app.post('/api/common/signin', (req, res, next) => {
//     go(
//         req.body,
//         pipeT(
//             a => QUERY `SELECT * FROM users WHERE id = ${a.id}`,
//             b => {
//                 if (b.length === 0) throw 'The ID does not exist';
//                 return b;
//             },
//             first,
//             c => {
//                 if (c.pw !== req.body.pw) throw 'The password is incorrect';
//                 return c;
//             },
//             d => req.session.user = d || null,
//             res.json
//         ).catch(
//             match
//                 .case('The ID does not exist')(
//                     _ => 'The ID does not exist'
//                 )
//                 .case('The password is incorrect')(
//                     _ => 'The password is incorrect'
//                 )
//                 .else(_ => ''),
//                 m => new Error(m),
//                 next,
//         )
//     )
// });
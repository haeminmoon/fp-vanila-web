const getHash = require('../../../module/back/util/encryption');

app.get('/common/signin', (req, res) => {
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common/signin.css">
        `,
        header: TMPL.layout.accountHeader('signin'),
        main: `
            <div id="main">
                <div class="signin_box">
                    <p class="login_tit">SIGN IN</p>
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
        footer: TMPL.layout.footer(),
        script: `
            <script src="/front/script/common/signin.js"></script>
            <script>
                go('.signup', $, Signin.Route.signupPopup);
                go('.signin_wrap', $, Signin.Do.signin);
            </script>
        `
    }));
});

// app.post('/api/common/signin', (req, res, next) => {
//     go(
//         req.body,
//         pipeT(
//             a => QUERY`SELECT * FROM users WHERE id = ${a.id}`,
//             b => {
//                 if (b.length === 0) throw 'The ID does not exist';
//                 return b;
//             },
//             first,
//             c => {
//                 if (c.pw !== getHash(req.body.pw)) throw 'The password is incorrect';
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
//             m => new Error(m),
//             next
//         )
//     )
// });

// Signin test code
app.post('/api/common/signin', (req, res, next) => {
    go(
        req.body,
        pipeT(
            a => QUERY `SELECT * FROM users WHERE id = ${a.id}`,
            b => {
                if (b.length === 0) throw 'The ID does not exist';
                return b;
            },
            first,
            c => {
                if (c.pw !== req.body.pw) throw 'The password is incorrect';
                return c;
            },
            d => req.session.user = d || null,
            res.json
        ).catch(
            tap(log),
            match
                .case('The ID does not exist')(
                    _ => 'The ID does not exist'
                )
                .case('The password is incorrect')(
                    _ => 'The password is incorrect'
                )
                .else(_ => ''),
            m => new Error(m),
            next
        )
    )
});
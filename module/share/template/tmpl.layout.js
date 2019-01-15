!function () {
    TMPL.layout = ({ css, body, script }) => html`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Vanila-web based FP</title>
                <link rel="stylesheet" href="/front/css/common.css">
                ${css}
            </head>
            <body>
                ${body}
                
                <script src="/share/base/global.js"></script>
                <script src="/share/base/ff.js"></script>
                <script src="/share/base/ttl.js"></script>
                <script>Object.assign(window, FF);</script>
                <script>Object.assign(window, TTL);</script>

                <script src="/front/base/$.js"></script>
                <script src="/share/template/tmpl.js"></script>
                <script>Object.assign(window, TMPL);</script>
                
                ${script}
            </body>
        </html>
    `;

    TMPL.layout.hnmf = ({ css, header, nav, main, footer, script }) => TMPL.layout({
        css,
        body: html`
            ${header}
            ${nav}
            ${main}
            ${footer}
        `,
        script
    });

    TMPL.layout.header = (title) => ` 
        <div id="header">
            <h1 class="logo">
                <a href="/">
                <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                </a>
            </h1>
            <p class="title">${__(title)}</p>
        </div>
    `;

    TMPL.layout.nav = _ => `
        <div id="nav">
        </div>
    `;

    TMPL.layout.footer = _ => `
        <div id="footer">
            ${__('copyright')}
        </div>
    `;
}();
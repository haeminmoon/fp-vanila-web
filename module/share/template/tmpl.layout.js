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
            ${nav}
            <div id="wrap">
            ${header}
            ${main}
            ${footer}
            </div>
        `,
        script
    });

    TMPL.layout.accountHeader = (title) => ` 
        <div id="header">
            <h1 class="logo">
                <a href="/">
                <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%403x.png" class="logo" alt="spinprotocol_logo">
                </a>
            </h1>
            <p class="title">${__(title)}</p>
        </div>
    `;

    TMPL.layout.advHeader = _ => `
    <div id="header">
        <div class="header_gnb">
            <button type="button" class="notice_msg">
                <div class="circle_cnt">1</div>
                <img class="gnb_icon" src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/notice_icon/baseline-search-24-px-copy.svg" alt="notice icon">
            </button>
        </div>
    </div>
    `;

    TMPL.layout.infHeader = _ => `
        <div id="header">
            <div class="header_gnb">
                <button type="button" class="notice_msg">
                    <div class="circle_cnt">1</div>
                    <img class="gnb_icon" src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/notice_icon/baseline-search-24-px-copy.svg" alt="notice icon">
                </button>
            </div>
        </div>
    `;

    TMPL.layout.advNav = _ => `
        <div id="nav">
            <h1 class="logo">
                <a href="/">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%403x.png" class="logo" alt="spinprotocol_logo">
                </a>
            </h1>
            <div class="profile">
                <div class="image">
                    <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
                </div>
                <p class="user_name">아이유</p>
            </div>
            <ul class="nav_gnb">
                <li class="nav_on"><a href="/">홈</a></li>
                <li><a href="#">상품 관리</a></li>
                <li><a href="#">인플루언서</a></li>
                <li><a href="#">캠페인 관리</a></li>
                <li><a href="#">주문내역</a></li>
                <li><a href="#">정산 관리</a></li>
                <li><a href="#">고객문의</a></li>
                <li><a href="#">Wallet</a></li>
                <li class="setting"><a href="#">설정</a></li>
            </ul>
            <div class="btn_wrap">
                <button type="button" class="signout_btn">로그아웃</button>
            </div>
        </div>
    `;

    TMPL.layout.infNav = _ => `
        <div id="nav">
            <h1 class="logo">
                <a href="/">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin-logo1/group-17%403x.png" class="logo" alt="spinprotocol_logo">
                </a>
            </h1>
            <div class="profile">
                <div class="image">
                    <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
                </div>
                <p class="user_name">아이유</p>
            </div>
            <ul class="nav_gnb">
                <li class="nav_on"><a href="/">홈</a></li>
                <li><a href="#">캠페인 관리</a></li>
                <li><a href="#">캠페인 목록</a></li>
                <li class="setting"><a href="#">설정</a></li>
            </ul>
            <div class="btn_wrap">
                <button type="button" class="signout_btn">로그아웃</button>
            </div>
        </div>
    `;

    TMPL.layout.footer = _ => `
        <div id="footer">
            <p>${__('copyright')}</p>
        </div>
    `;
}();
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

    TMPL.layout.header = _ => `
        <div id="header">
            <h1 class="logo">
                <a href="/">
                <img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo.png" srcset="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%402x.png, https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/logo%403x.png" class="logo" alt="spinprotocol_logo">
                </a>
            </h1>
            <p class="title">${__('signup')}</p>
        </div>
    `;

    TMPL.layout.advHeader = _ => `
        <div id="header">
            <ul class="header_gnb">
                <li class="gnb_notice">
                    <a>
                        <span class="gnb_icon">알림</span>
                        <span class="circle_cnt">
                            <span class="notice_cnt">3</span>
                        </span>
                    </a>
                </li>
                <li class="gnb_myinfo">
                    <a>
                        <span class="myname">{광고주 이름}</span>
                        <span class="myimg">프로필 이미지</span>
                    </a>
                </li>
            </ul>
        </div>
    `;

    TMPL.layout.infHeader = _ => `
        <div id="header">
            <ul class="header_gnb">
                <li class="gnb_notice">
                    <a>
                        <span class="gnb_icon">알림</span>
                        <span class="circle_cnt">
                            <span class="notice_cnt">3</span>
                        </span>
                    </a>
                </li>
                <li class="gnb_myinfo">
                    <a>
                        <span class="myname">{광고주 이름}</span>
                        <span class="myimg">프로필 이미지</span>
                    </a>
                </li>
            </ul>
        </div>
    `;

    TMPL.layout.advNav = _ => `
        <div id="nav">
            <h1 class="logo">
                <a>SPIN Protocol</a>
            </h1>
            <ul>
                <li class="nav_on"><a href="/advertiser/adv_campaign_management">캠페인 관리</a></li>
                <li><a href="/advertiser/adv_campaign_registration">캠페인 등록</a></li>
                <li><a href="/advertiser/adv_influencer_list">인플루언서 조회</a></li>
                <li><a href="/advertiser/adv_my_info">나의 정보</a></li>
            </ul>
            <div class="btn_wrap">
                <button type="button" class="logout_btn">로그아웃</button>
            </div>
        </div>
    `;

    TMPL.layout.infNav = _ => `
        <div id="nav">
            <h1 class="logo">
                <a>SPIN Protocol</a>
            </h1>
            <ul>
                <li class="nav_on"><a>캠페인 관리</a></li>
                <li><a>캠페인 목록</a></li>
                <li><a>나의 정보</a></li>
            </ul>
            <div class="btn_wrap">
                <button type="button" class="logout_btn">로그아웃</button>
            </div>
        </div>
    `;

    TMPL.layout.footer = _ => `
        <div id="footer">
            ${__('copyright')}
        </div>
    `;
}();
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
                <script src="/share/base/formatter.js"></script>
                <script>Object.assign(window, FF);</script>
                <script>Object.assign(window, TTL);</script>
                <script>Object.assign(window, Formatter);</script>

                <script src="/front/base/$.js"></script>
                <script src="/share/template/tmpl.js"></script>
                <script src="/share/template/influencer/inf_campaign_list.js"></script>
                <script src="/share/template/advertiser/adv_campaign_management.js"></script>
                <script>Object.assign(window, TMPL);</script>
                
                ${script}
            </body>
        </html>
    `;

    TMPL.layout.hnmf = ({ css, header, nav, main, footer, script }) => TMPL.layout({
        css,
        body: html`
            ${nav}
    
            ${header}
            ${main}
            ${footer}
 
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

    TMPL.layout.advHeader = userName => `
    <div id="header">
        <ul class="header_gnb">
            <li class="notice_icon">
                <button type="button" class="notice_msg">
                    <div class="circle_cnt">1</div>
                    <img class="gnb_icon" src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/notice_icon/baseline-search-24-px-copy.svg" alt="notice icon">
                </button>
            </li>
            <li class="header_profile_img">
                <div class="header_img">
                    <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
                </div>
            </li>
            <li>
                <p>${userName} 님</p>
            </li>
        </ul>
    </div>
    `;

    TMPL.layout.infHeader = userName => `
        <div id="header">
            <ul class="header_gnb">
                <li class="notice_icon">
                    <button type="button" class="notice_msg">
                        <div class="circle_cnt">1</div>
                        <img class="gnb_icon" src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/notice_icon/baseline-search-24-px-copy.svg" alt="notice icon">
                    </button>
                </li>
                <li class="header_profile_img">
                    <div class="header_img">
                        <img src="http://file2.nocutnews.co.kr/newsroom/image/2018/07/18/20180718120948825781_0_420_600.jpg" alt="profile image">
                    </div>
                </li>
                <li>
                    <p>반가워요, ${userName}님</p>
                </li>
            </ul>
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
                <li class="nav_on"><a href="/advertiser/adv_campaign_management">캠페인 관리</a></li>
                <li><a href="/advertiser/adv_campaign_registration">캠페인 등록</a></li>
                <li><a href="/advertiser/adv_influencer_list">인플루언서 리스트</a></li> 
                <li class="setting"><a href="/advertiser/adv_my
                _info">설정</a></li>
            </ul>
            <div class="logout_btn_wrap">
                <a class="logout_btn" href="/common/signout">로그아웃</a>
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
                <li class="nav_on"><a href="/influencer/inf_campaign_management">캠페인 관리</a></li>
                <li><a href="/influencer/inf_campaign_list">캠페인 목록</a></li>
                <li class="setting">
                    <a href="/influencer/inf_my_info">설정</a>
                </li>
            </ul>
            <div class="logout_btn_wrap">
                <a class="logout_btn" href="/common/signout">로그아웃</a>
            </div>
        </div>
    `;

    TMPL.layout.footer = _ => `
        <div id="footer">
            <p>${__('copyright')}</p>
        </div>
    `;
}();
app.get('/influencer/inf_campaign_list', (req, res) => {
    // if (req.session.user.auth !== 'influencer') return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            <div id="main">
                <div class="breadcrumbs">
                    <a href="/">홈</a>
                    <a href="/influencer/inf_campaign_list">캠페인 리스트</a>
                </div>
                <div class="container">
                    <div class="campaign">
                        <a href="/influencer/inf_campaign_detail">
                            <img class="campaign_img" src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 사진">
                            <p class="campaign_info">#오로라 여행</p>
                        </a>
                    </div>
                    <div class="campaign">
                        <a href="/">
                            <img class="campaign_img" src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 사진">
                            <p class="campaign_info">#오로라 여행</p>
                        </a>
                    </div>  
                    <div class="campaign">
                        <a href="/">
                            <img class="campaign_img" src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 사진">
                            <p class="campaign_info">#오로라 여행</p>
                        </a>
                    </div>
                    <div class="campaign">
                        <a href="/">
                            <img class="campaign_img" src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 사진">
                            <p class="campaign_info">#오로라 여행</p>
                        </a>
                    </div>
                    <div class="campaign">
                    <a href="/">
                            <img class="campaign_img" src="http://www.hello-canada.co.kr/image/thumb/%EB%B8%94%EB%9E%98%EC%B9%98%ED%8F%AC%ED%8A%B8%20%EB%9E%8F%EC%A7%80_%EC%98%A4%EB%A1%9C%EB%9D%BC.jpg" alt="캠페인 사진">
                            <p class="campaign_info">#오로라 여행</p>
                        </a>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/influencer/inf_campaign_list.js"></script>
        `
    }));
});

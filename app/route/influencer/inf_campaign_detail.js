app.get('/influencer/inf_campaign_detail', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'influencer') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    const [campaignItem] = await QUERY`SELECT * FROM campaign WHERE advertiser_state IN ('progress','complete')  AND id = ${req.query.id}`;
    const [notification] = await QUERY`SELECT * FROM user_notification WHERE id = ${req.session.user.id}`;
    let notiCount = list => go(
        list,
        a => {
            if (!a) return [];
            let arr = [];
            for (const key in a) {
                if (a[key].read === false) arr.push(key);
            }
            return arr;
        },
        b => b.length
    );
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_detail.css">
            <link rel="stylesheet" href="/front/css/influencer/media/media_inf_campaign_detail.css">
        `,
        header: TMPL.layout.infHeader(user.info.nickname, user.id, notiCount(notification.notification_list)),
        nav: TMPL.layout.infNav(user.info.nickname),
        main: `
            <div id="main">
                <div class="container">
                    <div class="campaign_main">
                        <img src=${campaignItem.img} alt="캠페인 메인이미지">
                        <div class="mask">
                            <h1 class="brand_tit">${campaignItem.advertiser_id}</h1>
                            <p class="campaign_tit">${campaignItem.name}</p>
                            <ul class="campaign_info">
                                <li>
                                    <p>성별</p>
                                    <p>${campaignItem.info.sex}</p>
                                </li>
                                <li>
                                    <p>연령</p>
                                    <p>${campaignItem.info.age}</p>
                                </li>
                                <li>
                                    <p>SNS</p>
                                    <p>${campaignItem.sns_type}</p>
                                </li>
                                <li>
                                    <p>카테고리</p>
                                    <p>${campaignItem.category}</p>
                                </li>
                                <li>
                                    <p>신청 기간</p>
                                    <p>${formatBackDate(campaignItem.apply_start_date)} ~ ${formatBackDate(campaignItem.apply_end_date)}</p>
                                </li>
                                <li>
                                    <p>발표 일</p>
                                    <p>${formatBackDate(campaignItem.notice_date)}</p>
                                </li>
                                <li>
                                    <p>포스팅 기간</p>
                                    <p>${formatBackDate(campaignItem.post_start_date)} ~ ${formatBackDate(campaignItem.post_end_date)}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 캠페인 소개 -->
                            
                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            상세 이미지
                        </h2>
                        <div class="detail_content">
                            ${campaignItem.sub_img === null? `상세이미지가 없습니다` : go(campaignItem.sub_img, map((subImg) => ` <img src=${subImg}
                                alt="캠페인 상세이미지">`))}
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            제품 설명
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ${campaignItem.info.camp_description}
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            캠페인 미션
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ${campaignItem.info.mission_description}
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            필수 해시태그
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ${campaignItem.info.hash_tag}
                            </p>
                        </div>
                    </div>

                    <div class="campaign_article">
                        <h2 class="detail_tit">
                            켐페인 보상
                        </h2>
                        <div class="detail_content">
                            <p class="pd_info">
                                ${campaignItem.info.benefit_description}
                            </p>
                        </div>
                    </div>
                    <div class="btn_wrap">
                        <button type="button" class=${go(Object.keys(campaignItem.influencer_id), filter(id => id === user.id), a => a.length === 0) ? "submit_btn" : "submit_btn hidden"} campaign_id = ${campaignItem.id}>신청하기</button>
                    </div>
                </div>
            </div>
        `,
        footer: TMPL.layout.footer(),
        script: `
            <script src="/front/script/influencer/inf_campaign_detail.js"></script>
            <script>
                go('.submit_btn', $, InfCampaignDetail.Route.infConfirm);
            </script>
        `
    }));
});

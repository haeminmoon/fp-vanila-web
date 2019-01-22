const { sendMail } =  require('../../../module/back/util/mailer');

app.get('/influencer/inf_campaign_apply', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');
    const [campaignItem] = await QUERY`SELECT * FROM campaign WHERE state = 'progress' AND id = ${req.query.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_apply.css">
        `,
        header: TMPL.layout.infHeader(),
        nav: TMPL.layout.infNav(),
        main: `
            <div id="main">
                <div class="container">
                    <div class="campaign_info">
                        <h1 class="brand_tit" id=${campaignItem.id}>${campaignItem.advertiser_id}</h1>
                        <p class="campaign_tit" name=${campaignItem.name}>${campaignItem.name}</p>
                    </div>
                    
                    <div class="confirm_info">
                        <h2 class="confirm_tit">
                            신청한 SNS
                        </h2>
                        <div class="confirm_content">
                            <p class="inf_info user_id" followers = ${req.session.user.sns_info.instagram_followers}>${req.session.user.id}</p>
                            <textarea name="memo" id="memo" class="memo" placeholder="유저아이디의 메모를 작성해주세요."></textarea>
                        </div>
                    </div>

                    <div class="confirm_info">
                        <h2 class="confirm_tit">
                            연락처
                        </h2>
                        <div class="confirm_content">
                            <p class="inf_info phone_num">${req.session.user.info.phone_num}</p>
                        </div>
                    </div>

                    <div class="confirm_info">
                        <h2 class="confirm_tit">
                            받는 분 이름
                        </h2>
                        <div class="confirm_content">
                            <p class="inf_info name">${req.session.user.info.name}</p>
                        </div>
                    </div>

                    <div class="confirm_info">
                        <h2 class="confirm_tit">
                            배송지 주소
                        </h2>
                        <div class="confirm_content">
                            <input type="text" name="post_code" class="post_code" id="post_code">
                            <button type="button" class="sch_add_btn">주소검색</button>
                            <input type="text" name="address" class="address">       
                        </div>
                    </div>

                    <div class="campaign_agree agree1">
                        <div class="agree_title">
                            <h2 class="agree_txt">등록하신 콘텐츠는 홍보나 필요에 의해 사용될 수 있습니다.</h2>
                            <div class="input_wrap">
                                <input type="checkbox" name="cam_agree" id="cam_agree">
                                <label for="cam_agree"></label>
                            </div>
                        </div>
                    </div>

                    <div class="campaign_agree agree2">
                    <div class="agree_title">
                        <h2 class="agree_txt">Spinner 선정 되신 후 콘텐츠 미등록 시 혹은 다음과 같은 경우로 계약 위반 페널티가 적용됩니다.</h2>
                        <div class="input_wrap">
                            <input type="checkbox" name="cam_agree2" id="cam_agree2">
                            <label for="cam_agree2"></label>
                        </div>
                    </div>
                    <div class="agree_contents">
                        <ul class="agree_contents_txt">
                            <li>캠페인 선정 후 기간 내 포스팅를 등록하지 않는 경우</li>
                            <li>캠페인 가이드를 충분히 숙지하지 않고 캠페인을 신청한 경우</li>
                            <li> 포스팅 유지기간 1개월 미준수 및 계정 비공개 전환 등 인증이 불가능 한 경우</li>
                            <li>가이드에 맞지 않는 포스팅 재업로드 및 수정 요청을 수행하지 않는 경우</li>
                            <li>태그바이 매니저의 연락 시, 고의적인 연락 회피, 캠페인 진행에 영향을 미칠 정도로 늦게 연락을 주는 경우</li>
                            <li>제품협찬 캠페인의 경우, 제품 수령 후부터 어떠한 연락도 되지 않는 경우</li>
                            <li>현금지급 캠페인의 경우, 캠페인 기간 미준수시 제공금액 삭감 (3일 80% / 4일부터 70% / 7일이상 50%)</li>
                        </ul>
                    </div>
                </div>

                <div class="campaign_agree agree3">
                    <div class="agree_title">
                        <h2 class="agree_txt">다음과 같은 경우로 태그바이는 Spinner에게 손해배상 청구를 할 수 있습니다.</h2>
                        <div class="input_wrap">
                            <input type="checkbox" name="cam_agree3" id="cam_agree3">
                            <label for="cam_agree3"></label>
                        </div>
                    </div>
                    <div class="agree_contents">
                        <ul class="agree_contents_txt">
                            <li>모든 캠페인은 미포스팅 시 해당 캠페인 건에 대한 손해배상청구 가능</li>
                            <li>제품협찬 캠페인의 경우, 미포스팅시 제품회수 및 해당 캠페인 건에 대한 손해배상 청구 가능 (제품 훼손 및 분실시 제품비 청구)</li>
                            <li>주소 입력 오류로 인한 제품 미수령 또는 분실 시, 직접 제품을 구매하여 포스팅을 올려주셔야 합니다.</li>
                        </ul>
                    </div>
                </div>

                <div class="btn_wrap">
                    <button type="button" class="campaign_agree_btn">동의 후 신청하기</button>
                </div>

                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
        <script src="/front/script/influencer/inf_campagin_apply.js"></script>
        <script>
            go('.sch_add_btn', $, InfCampaignApply.Do.showPost);
            go('.container', $, InfCampaignApply.Do.campaignAgree);
        </script>
        `
    }));
});

app.post('/api/influencer/inf_campaign_apply', (req, res, next) => {
    const userId = Object.keys(req.body.info)[0];
    go(
        req.body,
        pipeT(
            a => QUERY`UPDATE campaign SET influencer_id = influencer_id || ${a.info} WHERE id = ${a.id}`,
            async _ => await sendMail(
                '스핀 프로토콜에서 보내는 메일입니다',
                `${req.body.campaign_name} 캠페인에 ${req.body.info[userId].followers}명의 팔로워 수를 가진 ${req.body.info[userId].name} 인플런서 님께서 신청하셨습니다.`,
                userId
                ).catch(err => {
                    throw err;
            }),
            res.json
        ).catch(
            m => new Error(m),
            next
        )
    )
});
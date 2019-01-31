const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});
const cpUpload = upload.fields([{name: 'main_img'}, {name: 'sub_img'}]);
const awsS3 = require('../../../module/back/util/fileUpload.js');

app.get('/advertiser/adv_campaign_registration', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_registeration.css" />
            <link rel="stylesheet" href="/front/css/advertiser/media/media_adv_campaign_registeration.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name, user.id),
        nav: TMPL.layout.advNav(user.info.company_name),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a>홈</a>
                        <a href="/advertiser/adv_campaign_registeration">캠페인 등록</a>
                    </div>
                    <div class="camp_wrap">
                        <!--<form id="camp_form" action="/api/advertiser/adv_campaign_registration" method="post" enctype="multipart/form-data" >-->
                           <form id="camp_form" enctype="multipart/form-data">
                            <div class="input_wrap">
                                <label for="sns_type" class="sns_wrap">SNS 타입<sup>*</sup></label>
                                <div class="wrap_right sns_wrap">
                                    <select name="sns_type" class="sns_type">
                                        <option value="">SNS</option>
                                        <option value="instagram">인스타그램</option>
                                        <option value="facebook">페이스북</option>
                                        <option value="blog">블로그</option>
                                        <option value="youtube">유튜브</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="sex" class="sex_wrap">성별<sup>*</sup></label>
                                <div class="wrap_right sex_wrap">
                                    <select name="sex" class="sex">
                                        <option value="">성별</option>
                                        <option value="man">남자</option>
                                        <option value="woman">여자</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="age" class="age_wrap">연령대<sup>*</sup></label>
                                <div class="wrap_right age_wrap">
                                    <select name="age" class="age">
                                        <option value="">연령대</option>
                                        <option value="teens">10대</option>
                                        <option value="twenties">20대</option>
                                        <option value="thirties">30대</option>
                                        <option value="fourties">40대</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="camp_name" class="camp_name_wrap">캠페인 명<sup>*</sup></label>
                                <div class="wrap_right camp_name_wrap">
                                    <input type="text" name="camp_name" class="camp_name">
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="category" class="category_wrap">카테고리<sup>*</sup></label>
                                <div class="wrap_right category_wrap">
                                    <select name="category" class="category">
                                        <option value="">선택</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="cosmetic">Cosmetic</option>
                                        <option value="living">Living</option>
                                        <option value="food">Food</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="main_img" class="mimg_wrap">대표 이미지<sup>*</sup></label>
                                <div class="wrap_right mimg_wrap ">
                                    <input value="파일선택" disabled="disabled" class="upload_name">
                                    <label for="main_img">업로드</label>
                                    <input type="file" name="main_img" accept="image/*" id="main_img" class="upload_hidden">
                                    <p>메인 페이지에 노출될 대표 이미지</p>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="sub_img" class="sub_wrap">상세 이미지<sup>*</sup></label>
                                <div class="wrap_right sub_wrap">
                                    <input type="file" name="sub_img" accept="image/*"  class="sub_img">
                                    <input type="file" name="sub_img" accept="image/*"  class="sub_img">
                                    <input type="file" name="sub_img" accept="image/*"  class="sub_img">
                                    <p>캠페인 상세 페이지에 등록 될 이미지 &#40; 최대 개수&#58; 3개 &#41;</p>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="date" class="date_wrap">캠페인 일정<sup>*</sup></label>
                                <div class="wrap_right date_wrap">
                                    <div>
                                        <label for="apply_due_date">신청 기간</label>
                                        <input type="date" name="apply_due_date" class="apply_due_date" min=${formatFrontDate(new Date())}>
                                        <input type="date" name="apply_due_date" class="apply_due_date" min=${formatFrontDate(new Date())}>
                                    </div>
                                    <div>                                
                                        <label for="notice_date">발표일</label>
                                        <input type="date" name="notice_date" class="notice_date" min=${formatFrontDate(new Date())}>
                                    </div>
                                    <div>                         
                                    <label for="post_date">포스팅 기간</label>       
                                    <input type="date" name="post_date" class="post_date" min=${formatFrontDate(new Date())}>
                                    <input type="date" name="post_date" class="post_date" min=${formatFrontDate(new Date())}>
                                </div>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="camp_description" class="camp_description_wrap">캠페인 설명<sup>*</sup></label>
                                <div class="wrap_right camp_description_wrap">
                                    <textarea name="camp_description" cols="40" rows="8" class="camp_description"></textarea>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="mission_description" class="mission_description_wrap">미션 설명<sup>*</sup></label>
                                <div class="wrap_right mission_description_wrap">
                                    <textarea name="mission_description" cols="40" 		rows="8" class="mission_description"></textarea>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="benefit_description" class="benefit_description_wrap">보상 설명<sup>*</sup></label>
                                <div class="wrap_right benefit_description_wrap">
                                    <textarea name="benefit_description" cols="40" rows="8" class="benefit_description"></textarea>
                                </div>
                            </div>
                            <div class="input_wrap">
                                <label for="hash_tag" class="hash_tag_wrap">해시 태그<sup>*</sup></label>
                                <div class="wrap_right hash_tag_wrap">
                                    <input type="text" name="hash_tag" class="hash_tag" placeholder="#패션#음식#화장품">
                                </div>
                            </div>
                        </form>
                        <div>
                            <input type="button" value="등록" name="camp_register_btn" class="camp_register_btn">
                            <input type="button" value="취소" name="camp_cancel_btn" class="camp_cancel_btn">
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/advertiser/adv_campaign_registeration.js"></script>
        <script>
            go('.camp_register_btn', $, AdvCampaignRegistration.Do.registerCampaign);
            go('.camp_cancel_btn', $, AdvCampaignRegistration.Do.cancelCampaign);
            go('.upload_hidden', $, AdvCampaignRegistration.Do.mainImageFileName);
        </script>
        `
    }));
});

app.post('/api/advertiser/adv_campaign_registration', cpUpload, (req, res, next) => {
    const {camp_name, sns_type, category, apply_due_date, notice_date, post_date, ...info} = req.body;
    const userId = req.session.user.id;
    const data = {
        name: camp_name,
        sns_type: sns_type,
        category: category,
        advertiser_state: 'wait',
        info: info,
        created_at: new Date(),
        apply_start_date: apply_due_date[0],
        apply_end_date: apply_due_date[1],
        notice_date: notice_date,
        post_start_date: post_date[0],
        post_end_date: post_date[1],
        advertiser_id: userId
    };
    const newMainImg = req.files['main_img'] || ['no_img'];
    const newSubImgs = req.files['sub_img'] || ['no_img'];
    let fileName = null, campaign_id = null, index = 0;
    go(
        data,
        pipeT(
            a => QUERY`INSERT INTO campaign ${VALUES(a)} RETURNING id`,
            first,
            b => campaign_id = b.id,
            // 대표 이미지 업로드
            _ => go(
                newMainImg,
                map((file) => {
                    if (file === 'no_img') {
                        return 'https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin_logo-2.png';
                    }
                    fileName = 'campaign_mainImage'; // 대표 이미지 파일명
                    awsS3.insertImgToS3(file, awsS3.convertImgPath(campaign_id, userId, fileName));
                    return awsS3.getS3URL() + awsS3.convertImgPath(campaign_id, userId, fileName);
                }),
                ([c]) => QUERY`UPDATE campaign SET img = ${c} WHERE id = ${campaign_id}`
            ),
            // 상세 다중 이미지 업로드
            _ => go(
                newSubImgs,
                map((file) => {
                    if (file === 'no_img') {
                        return 'https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/spin_logo-2.png';
                    }
                    fileName = `campaign_subImage_${index += 1}`; // 상세 이미지 파일명
                    awsS3.insertImgToS3(file, awsS3.convertImgPath(campaign_id, userId, fileName));
                    return awsS3.getS3URL() + awsS3.convertImgPath(campaign_id, userId, fileName);
                }),
                c => QUERY`UPDATE campaign SET sub_img = ${JSON.stringify(c)} WHERE id = ${campaign_id}`
            ),
            _ => res.json()
        ).catch(
            m => new Error(m),
            next
        )
    )
});
const awsS3 = require('../../../module/back/util/fileUpload.js');

app.get('/advertiser/adv_campaign_modify', async (req, res) => {

    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    let [campaign] = await QUERY`SELECT * FROM campaign WHERE id = ${req.query.id}`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_modify.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name),
        nav: TMPL.layout.advNav(user.info.company_name),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a>홈</a>
                        <span>캠페인 리스트</span>
                    </div>
                    <div class="wrap">
                        <div class="input_wrap">
                            <label>캠페인 명<sup>*</sup></label>
                            <div class="campaign_wrap">
                                <input type="text" class="campaign_title" value=${campaign.name}>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label>캠페인 일정<sup>*</sup></label>
                            <div class="date_wrap">
                                <ul>
                                    <li>
                                        <label>신청기간</label>
                                        <input type="date" class="date_start" name="apply_start_date" target="apply_end_date" value=${formatBackDate(campaign.apply_start_date)}>
                                        <em>~</em>
                                        <input type="date" name="apply_end_date" class="date_end" min=${formatBackDate(campaign.apply_start_date)} value=${formatBackDate(campaign.apply_end_date)}>
                                    </li>
                                    <li>
                                        <label>포스팅 기간 </label>
                                        <input type="date" class="date_start" name="post_start_date" target="post_end_date" value=${formatBackDate(campaign.post_start_date)}>
                                        <em>~</em>
                                        <input type="date" name="post_end_date" class="date_end" min=${formatBackDate(campaign.post_start_date)} value=${formatBackDate(campaign.post_end_date)}>
                                    </li>
                                    <li>
                                        <label>발표일 </label>
                                        <input type="date" name="notice_date" class="notice_date" value=${formatBackDate(campaign.notice_date)}>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label>대표이미지<sup>*</sup></label>
                            <div class="main_img_wrap">
                                <img src="${campaign.img}?${new Date()}" class="main_img non_modified" name="main_img" 	file_name=${getFileName(campaign.img)} sub_order=0>
                                <input type="file" target=${getFileName(campaign.img)} accept=".jpg, .jpeg, .png" class="img_url" name="img_url">
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label>서브이미지<sup>*</sup></label>
                            <div class="sub_img_wrap">
                                <div>
                                    ${!campaign.sub_img ? TMPL.AdvCampaignModify.writeEmtySubImg([]) : TMPL.AdvCampaignModify.getSubImg(campaign.sub_img)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info_wrap">
                        <h2>상세정보 수정</h2>
                        <div class="input_wrap">
                            <label>SNS 타입<sup>*</sup></label>
                            <div class="sns_wrap">
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
                            <label>성별<sup>*</sup></label>
                            <div class="sex_wrap">
                                <select name="sex" class="sex">
                                    <option value="">성별</option>
                                    <option value="man">남자</option>
                                    <option value="woman">여자</option>
                                </select>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label>연령대<sup>*</sup></label>
                            <div class="age_wrap">
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
                            <label>카테고리<sup>*</sup></label>
                            <div class="category_wrap">
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
                            <label for="camp_description" class="camp_description_wrap">캠페인 설명<sup>*</sup></label>
                            <div class="camp_description_wrap">
                                <textarea name="camp_description" cols="40" rows="4" class="camp_description">${campaign.info.camp_description}</textarea>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="mission_description" class="mission_description_wrap">미션 설명<sup>*</sup></label>
                            <div class="mission_description_wrap">
                                <textarea name="mission_description" cols="40" rows="4" class="mission_description">${campaign.info.mission_description}</textarea>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="benefit_description" class="benefit_description_wrap">보상 설명<sup>*</sup></label>
                            <div class="benefit_description_wrap">
                                <textarea name="benefit_description" cols="40" rows="4" class="benefit_description">${campaign.info.benefit_description}</textarea>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="hash_tag" class="hash_tag_wrap">해시 태그<sup>*</sup></label>
                            <div class="hash_tag_wrap">
                                <input type="text" name="hash_tag" class="hash_tag" value=${campaign.info.hash_tag}>
                            </div>
                        </div>
                    </div>
                    <div class="btn_box">
                        <button class="modify_btn">수정</button>
                        <button class="cancel" name=${req.query.id}>취소</button>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_campaign_modify.js"></script>
            <script>
                go('.cancel', $, AdvCampaignModify.Do.cancelModify);
                go('.modify_btn', $, AdvCampaignModify.Do.modify);
                go('#main', $, AdvCampaignModify.Do.readyImage);
                go('#main', $, AdvCampaignModify.Do.setMinDate);
                go({
                    "sns_type": "${campaign.sns_type}",
                    "sex": "${campaign.info.sex}",
                    "age": "${campaign.info.age}",
                    "category": "${campaign.category}"
                }, AdvCampaignModify.Do.setSelectOption);
            </script>
        `
    }));
});

app.post('/api/advertiser/adv_campaign_modify', async (req, res) => {
    const campaignId = req.body.campaign_id;
    const [campaign] = await QUERY`SELECT * FROM campaign WHERE id = ${campaignId}`;

    // 바뀐사진 찾아서 S3에 업데이트 및 데이터베이스에 적재
    res.json(await go(
        req.body.modified_files,
        map(a => {
            const fileName = a.file_name;
            // Buffer와 file의 type을 지정
            let file = {
                "buffer": new Buffer(a.url.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                "mimetype": a.url.split(';')[0].split('/')[1]
            }
            awsS3.insertImgToS3(file, awsS3.convertImgPath(campaignId, 'test', fileName));
            return ({"src": awsS3.getS3URL() + awsS3.convertImgPath(campaignId, 'test', fileName), "order": a.order});
        }),
        b => {
            b.push(...req.body.non_modified);
            return b;
        },
        // 파일을 올린 순서에 맞게 정렬
        c => c.sort((a, b) => a.order > b.order),
        // 데이터베이스에 저장
        d => {
            let arr = [];
            for (let iter of d) {
                if (iter.src.indexOf('main') > 0) QUERY`UPDATE campaign SET img = ${iter.src} WHERE id = ${campaignId}`;
                else arr.push(iter.src);
            }
            return QUERY`UPDATE campaign SET sub_img = ${JSON.stringify(arr)} WHERE id = ${campaignId} RETURNING TRUE`
        },
        // img값 끝, campaign table 값 수정
        e => go(
            req.body.db_values,
            a => {
                if (!e) return ({"bool":e});
                let arr = [];
                for (const key in a) if (JSON.stringify(campaign[key]) != JSON.stringify(a[key])) arr.push(key);
                // 일치하지 않는 컬럼 찾아서 업데이트
                return go(arr, map(b => updateDB(b, a[b], campaignId)));
            }
        ),
        flat,
        f => {
            for (const iter of f) if (!iter.bool) return iter;
            return ({bool : true});
        },
        g => {
            if (g.bool) return ({"id" : campaignId});
            else return ({"id" : fales});
        }
    ));
    return;
})
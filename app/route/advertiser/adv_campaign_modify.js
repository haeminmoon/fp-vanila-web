
const awsS3 = require('../../../module/back/util/fileUpload.js');

app.get('/advertiser/adv_campaign_modify', async (req, res) => {
    if (!req.session.user) return res.redirect('/common/signin');

    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    let [campaign] = await QUERY`SELECT * FROM campaign WHERE id = ${req.query.id}`;
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_common_campaign.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_campaign_detail.css" />
        `,
        header: TMPL.layout.advHeader(user.info.company_name),
        nav: TMPL.layout.advNav(user.info.company_name),
        main: `
            <div id="main">
                <label>캠페인 명 </label><input type="text" class="campaign_title" value=${campaign.name}>
                <div class="date_wrap">
                    <p>캠페인 일정</p>
                    <li>
                        <label>신청기간 </label>
                        <input type="date" class="date_start" name="apply_start_date" target="apply_end_date" value=${convertDate2String(campaign.apply_start_date)}><em>~</em><input type="date" name="apply_end_date" class="date_end" min=${convertDate2String(campaign.apply_start_date)} value=${convertDate2String(campaign.apply_end_date)}>
                    </li>
                    <li>
                        <label>포스팅 기간 </label>
                        <input type="date" class="date_start" name="post_start_date" target="post_end_date" value=${convertDate2String(campaign.post_start_date)}><em>~</em><input type="date" name="post_end_date" class="date_end" min=${convertDate2String(campaign.post_start_date)} value=${convertDate2String(campaign.post_end_date)}>
                    </li>
                    <li>
                        <label>발표일 </label>
                        <input type="date" name="notice_date" class="notice_date" value=${convertDate2String(campaign.notice_date)}>
                    </li>
                </div>
                <div class="main_img_wrap">
                    <p>대표이미지</p>
                    <img src=${campaign.img} class="main_img non_modified" name="main_img" file_name=${campaign.img.split('/')[campaign.img.split('/').length - 1]} sub_order=0 height="200" width="200">
                    <input type="file" target="${campaign.img.split('/')[campaign.img.split('/').length - 1]}" accept=".jpg, .jpeg, .png" class="img_url" name="img_url">
                </div>
                <div class="sub_img_wrap">
                    <p>서브이미지</p>
                    ${!campaign.sub_img ? writeHtmlEmtySubImg([]) : writeHtmlSubImg(campaign.sub_img)}
                </div>
                <div class="info_wrap">
                    <p>상세정보 수정</p>
                    <label>SNS 타입 </label>
                    <select name="sns_type" class="sns_type">
                        <option value="">SNS</option>
                        <option value="instagram">인스타그램</option>
                        <option value="facebook">페이스북</option>
                        <option value="blog">블로그</option>
                        <option value="youtube">유튜브</option>
                    </select>
                    <label>성별 </label>
                    <select name="sex" class="sex">
                        <option value="">성별</option>
                        <option value="man">남자</option>
                        <option value="woman">여자</option>
                    </select>
                    <label>연령대 </label>
                    <select name="age" class="age">
                        <option value="">연령대</option>
                        <option value="teens">10대</option>
                        <option value="twenties">20대</option>
                        <option value="thirties">30대</option>
                        <option value="fourties">40대</option>
                    </select>
                    <label>카테고리 </label>
                    <select name="category" class="category">
                        <option value="">선택</option>
                        <option value="fashion">Fashion</option>
                        <option value="cosmetic">Cosmetic</option>
                        <option value="living">Living</option>
                        <option value="food">Food</option>
                    </select>

                    <div class="input_wrap">
                        <label for="camp_description" class="camp_description_wrap">캠페인 설명</label>
                        <div class="wrap_right camp_description_wrap">
                            <textarea name="camp_description" cols="40" rows="4" class="camp_description">${campaign.info.camp_description}</textarea>
                        </div>
                    </div>
                    <div class="input_wrap">
                        <label for="mission_description" class="mission_description_wrap">미션 설명</label>
                        <div class="wrap_right mission_description_wrap">
                            <textarea name="mission_description" cols="40" rows="4" class="mission_description">${campaign.info.mission_description}</textarea>
                        </div>
                    </div>
                    <div class="input_wrap">
                        <label for="benefit_description" class="benefit_description_wrap">보상 설명</label>
                        <div class="wrap_right benefit_description_wrap">
                            <textarea name="benefit_description" cols="40" rows="4" class="benefit_description">${campaign.info.benefit_description}</textarea>
                        </div>
                    </div>
                    <div class="input_wrap">
                        <label for="hash_tag" class="hash_tag_wrap">해시 태그</label>
                        <div class="wrap_right hash_tag_wrap">
                            <input type="text" name="hash_tag" class="hash_tag" value=${campaign.info.hash_tag}>
                        </div>
                    </div>
                    <button class="modify_btn">수정</button>
                    <button class="cancel" name=${req.query.id}>취소</button>
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_campaign_modify.js"></script>
            <script>
                go('.cancel', $, AdvCampaignModify.Do.cancelModify);
                go('.modify_btn', $, AdvCampaignModify.Do.modify);
                go('#main', $, AdvCampaignModify.Do.clickPlusButton);
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
    return go(
        req.body.modified_files,
        map(async (a) => {
            const fileName = a.file_name;
            // S3에 저장하기위해 임의의 파일명을 지정
            const newFileName = fileName.split('at')[0] + "at" + getDateMMDDHHMMSS(new Date());

            // Buffer와 file의 type을 지정
            let file = {
                "buffer": new Buffer(a.url.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                "mimetype": a.url.split(';')[0].split('/')[1]
            }
            // 기존 파일 삭제 후 생성
            awsS3.deleteImgToS3(awsS3.convertImgPath(campaignId, 'test', fileName));
            awsS3.insertImgToS3(file, awsS3.convertImgPath(campaignId, 'test', newFileName));
            return ({ "src": awsS3.getS3URL() + awsS3.convertImgPath(campaignId, 'test', newFileName), "order": a.order });
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
            QUERY`UPDATE campaign SET sub_img = ${JSON.stringify(arr)} WHERE id = ${campaignId}`
        },
        // img값 끝, campaign table 값 수정
        _ => go(
            req.body.db_values,
            async (a) => {
                let arr = [];
                for (const key in a) if (JSON.stringify(campaign[key]) != JSON.stringify(a[key])) arr.push(key);
                // 일치하지 않는 컬럼 찾아서 업데이트
                return go(arr, map(b => updateDB(b, a[b], campaignId)));
            }
        )
        // 캠패인 관리 페이지로 이동
        //_ => res.redirect('/advertiser/adv_campaign_management')
    )
})

const writeHtmlSubImg = subImgArr => {
    let order = 0;
    return go(
        subImgArr,
        map(a => html`
            <img src=${a} class="sub_img non_modified" name="sub_img" file_name=${a.split('/')[a.split('/').length - 1]} sub_order=${order++} height="200" width="200">
            <input type="file" target="${a.split('/')[a.split('/').length - 1]}" accept="image/*" class="img_url" name="img_url">
        `),
        b => b + writeHtmlEmtySubImg(b)
    )
}

const writeHtmlEmtySubImg = subImgArr => go(
    subImgArr,
    _ => {
        let result = "";
        for (let i = subImgArr.length; i < 3; i++) {
            result += `
                <button class="sub_img_plus" index=${i}>+</button>
                <div class="sub_img_wrap_${i} hidden">
                    <img src=null class="sub_img non_modified" name="sub_img" file_name="campaign_subImage_${i + 1}" sub_order=${i} height="200" width="200">
                    <input type="file" target="campaign_subImage_${i + 1}" accept=".jpg, .jpeg, .png" class="img_url" name="img_url">
                </div>
            `
        }
        return result;
    }
)

const convertDate2String = date => `${date.getFullYear()}-${toString(date.getMonth() + 1).padStart(2, '0')}-${toString(date.getDate()).padStart(2, '0')}`;
const getDateMMDDHHMMSS = date => `${toString(date.getMonth() + 1).padStart(2, '0')}${toString(date.getDate()).padStart(2, '0')}${date.getHours()}${date.getSeconds()}`

const updateDB = (column, value, id) => {
    switch (column) {
        case "name":
            QUERY`UPDATE campaign SET name = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "sns_type":
            QUERY`UPDATE campaign SET sns_type = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "category":
            QUERY`UPDATE campaign SET category = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "state":
            QUERY`UPDATE campaign SET state = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "img":
            QUERY`UPDATE campaign SET img = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "info":
            QUERY`UPDATE campaign SET info = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "updated_at":
            QUERY`UPDATE campaign SET updated_at = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "apply_start_date":
            QUERY`UPDATE campaign SET apply_start_date = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "apply_end_date":
            QUERY`UPDATE campaign SET apply_end_date = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "post_start_date":
            QUERY`UPDATE campaign SET post_start_date = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "post_end_date":
            QUERY`UPDATE campaign SET post_end_date = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "notice_date":
            QUERY`UPDATE campaign SET notice_date = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "sub_img":
            QUERY`UPDATE campaign SET sub_img = ${value} WHERE id = ${id} RETURNING true`
            break;
        case "influencer_id":
            QUERY`UPDATE campaign SET influencer_id = ${value} WHERE id = ${id} RETURNING true`
            break;
        default:
            break;
    }
}
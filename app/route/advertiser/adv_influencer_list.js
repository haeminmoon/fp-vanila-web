const { get } = require('../../../module/back/util/request');

app.get('/advertiser/adv_influencer_list', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'advertiser') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    
    const infList = await QUERY`SELECT id, info, sns_info FROM users WHERE auth = 'influencer' and sns_info is not null`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/advertiser/adv_influencer_list.css"/>
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
                <div class="terms_wrap">
                    <button type="button" class="terms_clear_btn">조건 초기화</button>
                    <h3>검색조건</h3>
                    <table class="terms">
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <select title="카테고리 대분류" class="form">
                                    <option>대분류</option>
                                    <option>뷰티샵</option>
                                    <option>패션샵</option>
                                    <option>푸드건강</option>
                                    <option>라이프</option>
                                </select>
                            </td>
                            <td>
                                <select title="카테고리 중분류" class="form">
                                    <option>중분류</option>
                                    <option>대분류를 선택해주세요</option>
                                </select>
                            </td>
                            <td>
                                <select title="카테고리 소분류" class="form">
                                    <option>소분류</option>
                                    <option>중분류를 선택해주세요</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td>
                                <select title="성별" class="form" name="gender">
                                    <option value="all">전체</option>
                                    <option value="man">남성</option>
                                    <option value="woman">여성</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>연령대</th>
                            <td>
                                <select title="연령대에서" class="form" name="ages_min">
                                    <option value="0">0</option>
                                    <option value="10">10대</option>
                                    <option value="20">20대 초반</option>
                                    <option value="24">20대 중반</option>
                                    <option value="27">20대 후반</option>
                                    <option value="30">30대</option>
                                </select>
                                <em>~</em>
                                <select title="연령대까지" class="form" name="ages_max">
                                    <option value="all">전체</option>
                                    <option value="20">10대</option>
                                    <option value="24">20대 초반</option>
                                    <option value="27">20대 중반</option>
                                    <option value="30">20대 후반</option>
                                    <option value="40">30대</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>팔로우 수</th>
                            <td>
                                <select title="팔로우수에서" class="form" name="follower_min">
                                    <option value="0">0</option>
                                    <option value="10">10</option>
                                    <option value="100">100</option>
                                </select>
                                <em>~</em>
                                <select title="팔로우수까지" class="form" name="follower_max">
                                    <option value="all">전체</option>
                                    <option value="10">10</option>
                                    <option value="100">100</option>
                                    <option value="200">200</option>
                                </select>
                                <button class="terms_search_btn">검색</button>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="inf_list_make_wrap">
                    <h3>인플루언서 리스트</h3>
                    <select title="정열 옵션" class="list_form select_sort_opt">
                        <option>정열 옵션</option>
                        <option value="inf_follow">팔로우 많은 순</option>
                    </select>
                    <table class="inf_list_make">
                        <caption>캠페인 리스트 등록안내 게시판</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="inf_check">
                                    <input type="checkbox" name="sale_chk" id="inf_click" value="progress">
                                    <label for="inf_click"></label>
                                </th>
                                <th scope="col" class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></th>
                                <th scope="col" class="inf_id">아이디</th>
                                <th scope="col" class="inf_level">레벨</th>
                                <th scope="col" class="inf_follow">총 팔로워수</th>
                                <th scope="col" class="inf_gender">성별</th>
                                <th scope="col" class="inf_category">카테고리</th>                        
                                <th scope="col" class="inf_category">연령대</th>
                            </tr>
                        </thead>
                        <tbody id="click_wrap">
                            ${go(infList, map(a => getHtmlInfList(a)), b => html`${b}`)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_influencer_list.js"></script>
            <script>
                go('#click_wrap', $, AdvInfluencerList.Do.clickTarget);
                go('.select_sort_opt', $, AdvInfluencerList.Do.selectOptionSort);
                go('.terms_search_btn', $, AdvInfluencerList.Do.clickSearchFilter);
            </script>
        `
    }));
});

app.post('/api/advertiser/adv_influencer_list', async (req, res) => {
    // 클릭한 유저의 id를 받음
    let id = req.body.id;
    // 해당 id의 instagram id 와 instagram access token 을 얻기위해 데이터베이스 조회
    let [userSnsInfo] = await QUERY`SELECT sns_info FROM users WHERE id = ${id}`;
    if (!userSnsInfo) res.json({"res":"fail to read database"});
    
    // 얻은 id 와 access token 을 통해 facebook Graph api에 필요한 정보 요청
    let instagramMedia = await getInstagramMedia(userSnsInfo.sns_info.instagram_id, userSnsInfo.sns_info.instagram_access_token, 7).then(data => data);
    if (!instagramMedia) res.json({"res":"fail to get API return"});

    // 데이터베이스의 데이터 갱신을 위해 갱신이 필요한 정보들을 api에서 받아온 정보로 업데이트
    userSnsInfo.sns_info.instagram_followers = instagramMedia.followers_count;
    userSnsInfo.sns_info.instagram_follows = instagramMedia.follows_count;
    userSnsInfo.sns_info.instagram_profile_img = instagramMedia.profile_picture_url;
    let [commentAverage, likeAverage] = go(
        instagramMedia.media.data,
        a => {
            let commentC = 0;
            let likeC = 0;
            for (const iter of a) {
                commentC += iter.comments_count;
                likeC += iter.like_count;
            }
            return [Math.ceil(commentC / userSnsInfo.length), Math.ceil(likeC / userSnsInfo.length)];
        }
    )
    Object.assign(userSnsInfo.sns_info, { "instagram_media": instagramMedia.media.data }, { "instagram_comment_average": commentAverage }, { "instagram_like_average": likeAverage });

    // 데이터베이스에 업데이트
    let [updateResult] = await QUERY`UPDATE users SET sns_info = ${JSON.stringify(userSnsInfo.sns_info)} WHERE id = ${id} RETURNING TRUE`;
    if (!updateResult || !updateResult.bool) res.json({"res":"fail to update at database"});
    // 호출 결과와 필요한 데이터를 json형태로 응답
    go( {
            "res" : "success to load media data",
            "media" : instagramMedia.media.data,
            "followers" : instagramMedia.followers_count
        },
        res.json
    );
    
})

const getInstagramMedia = async (id, accessToken, limit) => {
    !limit ? limit = 7 : limit;
    return get(
        `https://graph.facebook.com/v3.2/${id}/?fields=media.limit(${limit})%7Bcaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Ctimestamp%2Cpermalink%2Cthumbnail_url%2Cmedia_type%7D%2Cfollowers_count%2Cfollows_count%2Cprofile_picture_url&access_token=${accessToken}`,
        ``
    );
}

const getHtmlInfList = data => {
    // 아직 카테고리에 대해 구현된 사항이 없어서 임의의 카테고리 지정
    let category = ["IT", "패션"];
    let htmlCategoryList = go(
        category,
        map(a => html`
        <li>${a}</li>`),
        b => html`${b}`
    );
    let age = new Date().getFullYear() - parseInt(JSON.parse(data.sns_info.instagram_user_birthday).year) + 1;
    return html`
        <tr class="target" target="${data.id}">
            <td class="inf_check">
                <input type="checkbox" name="sale_chk" id="inf_click1" value="progress">
                <label for="inf_click1"></label>
            </td>
            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
            <td class="inf_id">${data.id}</td>
            <td class="inf_level">Master</td>
            <td class="inf_follow">${data.sns_info.instagram_followers}</td>
            <td class="inf_gender" value="${data.info.gender}">${matchGender(data.info.gender)}</td>
            <td class="inf_category">
                <ul>
                    ${htmlCategoryList}
                </ul>
            </td>
            <td class="inf_ages" value=${age}>${matchAges(age)}</td>
        </tr>
        <tr class="click_hidden hidden" name="${data.id}"></tr>
    `
}
const matchGender = gender => (gender === "woman")? "여성" : "남성";
const matchAges = age => {
    if (age < 20) return "10대";
    else if (age < 24) return "20대 초반";
    else if (age < 27) return "20대 중반";
    else if (age < 30) return "20대 후반";
    else if (age < 40) return "30대";
}
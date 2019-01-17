const request = require('request');

app.get('/advertiser/adv_influencer_list', async (req, res) => {
    // if (req.session.user.auth !== 'advertiser') return res.redirect('/');

    const updateInfSnsInfo = await go(
        QUERY `SELECT id, sns_info FROM users WHERE auth = 'influencer' and sns_info is not null`,
        map(async a => {
            let instagramMedia = await getInstagramMedia(a.sns_info.instagram_id, a.sns_info.instagram_access_token, 6).then(data => data);
            a.sns_info.instagram_followers = instagramMedia.followers_count;
            a.sns_info.instagram_follows = instagramMedia.follows_count;
            a.sns_info.instagram_profile_img = instagramMedia.profile_picture_url;
            let [commentAverage, likeAverage] = go(
                instagramMedia.media.data,
                a => {
                    let commentC = 0;
                    let likeC = 0;
                    for (const iter of a) {
                        commentC += iter.comments_count;
                        likeC += iter.like_count;
                    }
                    return [Math.ceil(commentC/a.length), Math.ceil(likeC/a.length)];
                }
            );
            Object.assign(a.sns_info, {"instagram_media" : instagramMedia.media.data}, {"instagram_comment_average" : commentAverage}, {"instagram_like_average" : likeAverage});
            QUERY `UPDATE users SET sns_info = ${JSON.stringify(a.sns_info)} WHERE id = ${a.id}`;
            return a;
        })
    )
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/common.css />
            <link rel="stylesheet" href="/front/css/advertiser/adv_influencer_list_common.css" />
            <link rel="stylesheet" href="/front/css/advertiser/adv_influencer_list.css" />
        `,
        header: TMPL.layout.advHeader(),
        nav: TMPL.layout.advNav(),
        main: `
        <div class="container">
            <div class="breadcrumbs">
                <a>홈</a>
                <span>캠페인 리스트</span>
            </div>
            <div class="terms_wrap">
                <button type="button" class="terms_btn">조건 초기화</button>
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
                            <select title="카테고리 대분류" class="form">
                                <option>중분류</option>
                                <option>뷰티샵</option>
                                <option>패션샵</option>
                                <option>푸드건강</option>
                                <option>라이프</option>
                            </select>
                        </td>
                        <td>
                            <select title="카테고리 대분류" class="form">
                                <option>소분류</option>
                                <option>뷰티샵</option>
                                <option>패션샵</option>
                                <option>푸드건강</option>
                                <option>라이프</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>연령대</th>
                        <td>
                            <select title="연령대에서" class="form">
                                <option>전체</option>
                                <option>10대</option>
                                <option>20대</option>
                                <option>30대</option>
                                <option>40대</option>
                                <option>50대</option>
                                <option>60대</option>
                            </select>
                            <em>~</em>
                            <select title="연령대까지" class="form">
                                <option>전체</option>
                                <option>10대</option>
                                <option>20대</option>
                                <option>30대</option>
                                <option>40대</option>
                                <option>50대</option>
                                <option>60대</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>팔로우 수</th>
                        <td>
                            <select title="팔로우수에서" class="form">
                                <option>500</option>
                                <option>1,000</option>
                                <option>5,000</option>
                                <option>10,000</option>
                                <option>15,000</option>
                                <option>20,000</option>
                                <option>25,000</option>
                                <option>30,000</option>
                                <option>35,000</option>
                                <option>40,000</option>
                                <option>45,000</option>
                                <option>50,000</option>
                            </select>
                            <em>~</em>
                            <select title="팔로우수까지" class="form">
                                <option>500</option>
                                <option>1,000</option>
                                <option>5,000</option>
                                <option>10,000</option>
                                <option>15,000</option>
                                <option>20,000</option>
                                <option>25,000</option>
                                <option>30,000</option>
                                <option>35,000</option>
                                <option>40,000</option>
                                <option>45,000</option>
                                <option>50,000</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="please_wrap">
                <h3>인플루언서 리스트</h3>
                <button type="button" class="make_btn">캠페인만들기</button>
                <select title="정열 옵션" class="list_form">
                    <option>정열 옵션</option> 
                    <option>전체</option>
                    <option>레벨 높은 순</option>
                    <option>팔로우 많은 순</option>
                    <option>구매전환율 높은 순</option>
                </select>
                <table class="please">
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
                            <th scope="col" class="inf_rate">구매전환율<em>&#40;평균&#41;</em></th>
                            <th scope="col" class="inf_category">카테고리</th>
                            <th scope="col" class="inf_category">연령대</th>
                        </tr>
                    </thead>
                    <tbody id="click_wrap">
                        <tr class="target">
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click1" value="progress">
                                <label for="inf_click1"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">도이</td>
                            <td class="inf_level">Master</td>
                            <td class="inf_follow">1,402,442</td>
                            <td class="inf_rate">1.71%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>틴트</li>
                                    <li>색조</li>
                                </ul>
                            </td>
                        </tr>
                        <tr class="click_hidden">
                            <td>
                                <img src="https://www.myhawaii.kr/wp-content/uploads/2017/09/2017-09-05-152602.png" alt="인스타그램 이미지">
                                <div class="click_txt">
                                    <strong class="like">좋아요 20개</strong>
                                    <strong>댓글수 200개</strong>
                                    <div class="click_main">
                                        <strong class="click_id">elizabeth</strong>
                                        <strong class="click_comment">너무 배고파서 떡을 냠냠 #공항가는길 #2시간전 #셀스타그램 #뭐먹고있게?...</strong>
                                    </div>
                                </div>
                                <div class="click_img">
                                    <img src="https://scontent-dfw5-1.cdninstagram.com/vp/1544eb7f2211402f6c431cf0490f21a8/5C4A6AB9/t51.2885-15/e35/s480x480/36473332_1358739304270973_78043807785943040_n.jpg">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPgd7Nc2Gqoe2OB1hIUE4Xge6Yt29UqFrX6f83y3EIRYa78nu3">
                                    <img src="https://scontent-atl3-1.cdninstagram.com/vp/dbd409ab257229a294e5e2681427e9e4/5C87116D/t51.2885-15/e35/40326544_545686802548141_7824351019228285874_n.jpg">
                                    <img src="https://scontent-lax3-1.cdninstagram.com/vp/660858e0481460eb434bede45afda27c/5C9357BA/t51.2885-15/e35/s480x480/46228534_275427009830894_3049711139084954171_n.jpg?_nc_ht=scontent-lax3-1.cdninstagram.com">
                                    <img src="https://scontent-lga3-1.cdninstagram.com/vp/f64abc30c62f995bb56a3117d236ef7e/5CBB8F7E/t51.2885-15/sh0.08/e35/c180.0.720.720/s640x640/46228534_1751010031670919_3907573173416458872_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com">
                                    <img src="https://scontent-frx5-1.cdninstagram.com/vp/79c7dcc5e072cfd598720d7f2a106aaf/5C6E428A/t51.2885-15/e35/44292630_1792277367568205_8611177461726702065_n.jpg?se=7&ig_cache_key=MTkwNTI2MDQ0NTgzMzYxNTQxNg%3D%3D.2">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click2" value="progress">
                                <label for="inf_click2"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">반이</td>
                            <td class="inf_level">Master</td>
                            <td class="inf_follow">953,345</td>
                            <td class="inf_rate">1.20%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>헬스</li>
                                    <li>양말</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click3" value="progress">
                                <label for="inf_click3"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">elizaeth</td>
                            <td class="inf_level">Ace</td>
                            <td class="inf_follow">409,095</td>
                            <td class="inf_rate">2.01%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>패션</li>
                                    <li>다이어트</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click4" value="progress">
                                <label for="inf_click4"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">도로시</td>
                            <td class="inf_level">Ace</td>
                            <td class="inf_follow">597,306</td>
                            <td class="inf_rate">0.97%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>도시락</li>
                                    <li>필라테스</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click5" value="progress">
                                <label for="inf_click5"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">박여름</td>
                            <td class="inf_level">Starter</td>
                            <td class="inf_follow">684,306</td>
                            <td class="inf_rate">1.71%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>패션</li>
                                    <li>뷰티</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click6" value="progress">
                                <label for="inf_click6"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">다정</td>
                            <td class="inf_level">Starter</td>
                            <td class="inf_follow">643,063</td>
                            <td class="inf_rate">1.71%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>도시락</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click7" value="progress">
                                <label for="inf_click7"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">소연</td>
                            <td class="inf_level">Newbie</td>
                            <td class="inf_follow">134,630</td>
                            <td class="inf_rate">-</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>프라이머</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click8" value="progress">
                                <label for="inf_click8"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">도이</td>
                            <td class="inf_level">Master</td>
                            <td class="inf_follow">1,401,442</td>
                            <td class="inf_rate">1,71%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>틴트</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="inf_check">
                                <input type="checkbox" name="sale_chk" id="inf_click9" value="progress">
                                <label for="inf_click9"></label>
                            </td>
                            <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                            <td class="inf_id">반이</td>
                            <td class="inf_level">Master</td>
                            <td class="inf_follow">953,345</td>
                            <td class="inf_rate">1.20%</td>
                            <td class="inf_category">
                                <ul>
                                    <li>뷰티</li>
                                    <li>기초</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/advertiser/adv_influencer_list.js"></script>
            <script>

            </script>
        `
    }));
});

const getInstagramMedia = async (id, accessToken, limit) => {
    !limit ? limit = 3 : limit;
    return new Promise((resolve, reject) => request.get(`https://graph.facebook.com/v3.2/${id}/?fields=media.limit(${limit})%7Bcaption%2Ccomments_count%2Clike_count%2Cmedia_url%2Ctimestamp%2Cthumbnail_url%7D%2Cfollowers_count%2Cfollows_count%2Cprofile_picture_url&limit=3&access_token=${accessToken}`, 
        (err, res, body) => resolve(JSON.parse(body)))
    );
}
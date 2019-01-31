app.get('/influencer/inf_campaign_list', async (req, res) => {
    if (!req.session.user || req.session.user.auth !== 'influencer') return res.redirect('/common/signin');
    const [user] = await QUERY`SELECT * FROM users where id = ${req.session.user.id}`;
    const campaignList = await QUERY`SELECT * FROM campaign WHERE influencer_id->> ${req.session.user.id} IS NULL AND advertiser_state = 'progress'`;

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/influencer/inf_campaign_list.css">
            <link rel="stylesheet" href="/front/css/influencer/media/media_inf_campaign_list.css">
        `,
        header: TMPL.layout.infHeader(user.info.nickname, user.id),
        nav: TMPL.layout.infNav(user.info.nickname),
        main: `
            <div id="main">
                <div class="breadcrumbs">
                    <a href="/">홈</a>
                    <a href="/influencer/inf_campaign_list">캠페인 리스트</a>
                </div>
                <div>
                    <table class="filter_camp">
                        <tr>
                            <th>카테고리</th>
                            <td>
                                <select name="category" class="category">
                                    <option value="">선택</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="cosmetic">Cosmetic</option>
                                    <option value="living">Living</option>
                                    <option value="food">Food</option>
                                </select>
                            </td>
                            <th>SNS 타입</th>
                            <td>
                                <select name="sns_type" class="sns_type">
                                    <option value="">SNS</option>
                                    <option value="instagram">인스타그램</option>
                                    <option value="facebook">페이스북</option>
                                    <option value="blog">블로그</option>
                                    <option value="youtube">유튜브</option>
                                </select>
                            </td>
                            <th>성별</th>
                            <td>
                                <select name="sex" class="sex">
                                    <option value="">성별</option>
                                    <option value="man">남자</option>
                                    <option value="woman">여자</option>
                                </select>
                            </td>  
                            <th>연령대</th>
                            <td>
                                <select name="age" class="age">
                                    <option value="">연령대</option>
                                    <option value="teens">10대</option>
                                    <option value="twenties">20대</option>
                                    <option value="thirties">30대</option>
                                    <option value="fourties">40대</option>
                                </select>
                            </td>             
                            <td>
                                <button class="filter_button">검색</button>
                            </td>             
                        </tr>
                    </table>
                </div>
                <div class="container">
                    ${go(campaignList, TMPL.InfCampaignList.list)}
                </div>
            </div>
        `,
        footer: ``,
        script: `
            <script src="/front/script/influencer/inf_campaign_list.js"></script>
            <script>
            InfCampaignList.Do.filterEvent(${JSON.stringify(campaignList)});
            </script>
        `
    }));
});

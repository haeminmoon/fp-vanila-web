!function() {
    TMPL.AdvCampaignDetail = {};
    TMPL.AdvCampaignDetail.getInfList = async infs => {
        let infInfoArr = [];
        for (const key in infs) {
            let [userInfo] = await QUERY`SELECT * FROM users WHERE id = ${key}`;
            infInfoArr.push({
                id: key,
                name: userInfo.info.name,
                instagram_username: userInfo.sns_info.instagram_username,
                profile_url: userInfo.sns_info.instagram_profile_img,
                followers: userInfo.sns_info.instagram_followers,
                phone_number: (!userInfo.info.phone_num)? "휴대폰 번호 없음" : userInfo.info.phone_num,
                memo: infs[key].memo,
                address: infs[key].address,
                selected: infs[key].selected,
                post_status: infs[key].post_status,
                post_url: infs[key].post_url
            });
        }
        return go(
            infInfoArr,
            map(a => writeInfListHtml(a.profile_url, a.id, a.instagram_username, a.followers, a.phone_number, a.memo, a.address, a.selected, a.post_status, a.post_url)),
            b => html`${b}`
        );
    }
} ();

const writeInfListHtml = (profile_url, userName, snsName, followers, phoneNum, memo, address, status, postStatus, postUrl) => {
    return html`
    <tr class="target" target="${userName}">
        <td class="inf_check">
            <input type="checkbox" name="inf_chk" id="${userName}" value="${userName}" status="${status}">
            <label for="${userName}"></label>
        </td>
        <td class="infu_name">
            <img src=${profile_url} class = "profile_img" alt="인플루언서 프로필"/>
            <p>${userName}</p>
            <p>${snsName}</p>
        </td>
        <td class="column">${followers}</td>
        <td class="column_phone">${phoneNum}</td>
        <td class="camp_state">
            <span class="${convertStatusBox(status)}" name="camp_state">${convertStatus(status)}</span>
        </td>
        <td class="post_status"><a href=${getPostUrl(status, postStatus, postUrl)}><span class="${convertPostStatusBox(status, postStatus)}" name="post_status">${convertPostStatus(status, postStatus)}</span></a></td>
    </tr>
    <tr class="target_down hidden" name="${userName}">
            <td class="memo_wrap">
                <p>메모</p>
                <label class="memo">${memo}</label>
            </td>
            <td class="address_wrap">
                <p>주소</p>
                <label class="address">${address}</label>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td class="post_refresh"><input type="button" class="post_refresh_btn" user_name=${userName} value="새로고침"></td>
    </tr>
    `;
}

const convertStatus = status => toString(status) === "true"? "선정" : "미선정";
const convertStatusBox = status => toString(status) === "true"? "check2" : "check1";
const convertPostStatus = (status, postStatus) => toString(status) === "true" && toString(postStatus) === "true"? "등록" : "미등록";
const convertPostStatusBox = (status, postStatus) => toString(status) === "true"? toString(postStatus) === "true"? "check4" : "check5" : "check5";
const getPostUrl = (status, postStatus, postUrl) => toString(status) === "true" && toString(postStatus) === "true"? postUrl : "";
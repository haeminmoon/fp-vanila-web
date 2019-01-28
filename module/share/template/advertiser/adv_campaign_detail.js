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
                selected: infs[key].selected
            });
        }
        return go(
            infInfoArr,
            map(a => writeInfListHtml(a.profile_url, a.id, a.instagram_username, a.followers, a.phone_number, a.memo, a.address, a.selected)),
            b => html`${b}`
        );
    }
} ();

const writeInfListHtml = (profile_url, userName, snsName, followers, phoneNum, memo, address, status) => {
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
    </tr>
    `;
}

const convertStatus = status => toString(status) === "true"? "선정" : "미선정";
const convertStatusBox = status => toString(status) === "true"? "check2" : "check1";
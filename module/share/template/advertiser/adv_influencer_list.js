!function() {

    TMPL.AdvInfluencerList = {};
    TMPL.AdvInfluencerList.getInfProfile = data => {
        // 아직 카테고리에 대해 구현된 사항이 없어서 임의의 카테고리 지정
        let category = ["IT", "패션"];
        let htmlCategoryList = go(
            category,
            map(a => html`
            <li>${a}</li>`),
            b => html`${b}`
        );
        let age = new Date().getFullYear() - parseInt(JSON.parse(data.sns_info.instagram_user_birthday).year) + 1;
        return `
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
    TMPL.AdvInfluencerList.getInstagramMedia = media => {
        let firstMedia = media.shift();
        if (!!media) {
            remainingMediaList = go(
                media,
                map(a => `<a href=${a.instagram_link}><img src=${a.media_url}></a>`),
                b => html`${b}`
            );
        }
        return `
        <td>
            <a href=${firstMedia.permalink}><img src=${firstMedia.media_url} alt="인스타그램 이미지"></a>
            <div class="click_txt">
                <strong class="like">게시일 ${convertDateToMMDD(new Date(firstMedia.timestamp))}</strong>
                <strong class="like">좋아요 ${firstMedia.like_count}개</strong>
                <strong>댓글수 ${firstMedia.comments_count}개</strong>
                <div class="click_main">
                    <strong class="click_comment">${firstMedia.caption}</strong>
                </div>
            </div>
            <div class="click_img">
                ${remainingMediaList}
            </div>
        </td>`
    }
} ();

const matchGender = gender => (gender === "woman")? "여성" : "남성";
const matchAges = age => {
    if (age < 20) return "10대";
    else if (age < 24) return "20대 초반";
    else if (age < 27) return "20대 중반";
    else if (age < 30) return "20대 후반";
    else if (age < 40) return "30대";
}
const convertDateToMMDD = date => `${toString(date.getMonth()+1).padStart(2,'0')}-${toString(date.getDate()).padStart(2,'0')}`;
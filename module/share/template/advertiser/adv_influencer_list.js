!function() {

    TMPL.AdvInfluencerList = {};
    TMPL.AdvInfluencerList.getInfProfile = data => {
        // 아직 카테고리에 대해 구현된 사항이 없어서 임의의 카테고리 지정
        let category = ["IT", "패션"];
        let htmlCategoryList = go(
            category,
            map(a => html`<li>${a}<li>`)
        );

        if (!!postImg) {
            var htmlImgList = go(
                postImg,
                a => {
                    let result;
                    for (let i = 1; i < a.length; i++) {
                        result += html`<img src=${array[i]}>`
                    }
                    return result;
                }
            );
        }
        
        return html`
            <tr class="target">
                <td class="inf_check">
                    <input type="checkbox" name="sale_chk" id="inf_click1" value="progress">
                    <label for="inf_click1"></label>
                </td>
                <td class="inf_img"><img src="https://s3.ap-northeast-2.amazonaws.com/spin-protocol-resource/resources/images/instagram/instagram.png"></td>
                <td class="inf_id">${id}</td>
                <td class="inf_level">Master</td>
                <td class="inf_follow">${followers}</td>
                <td class="inf_category">
                    <ul>
                        ${htmlCategoryList}
                    </ul>
                </td>
            </tr>
            <tr class="click_hidden">
                <td>
                    <img src=${firstPostImg} alt="인스타그램 이미지">
                    <div class="click_txt">
                        <strong class="like">좋아요 ${firstPostLike}개</strong>
                        <strong>댓글수 ${firstPostComment}개</strong>
                        <div class="click_main">
                            <strong class="click_comment">${firstPostCaption}</strong>
                        </div>
                    </div>
                    <div class="click_img">
                        ${htmlImgList}
                    </div>
                </td>
            </tr>
        `
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
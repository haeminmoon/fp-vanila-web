!function() {

    TMPL.AdvInfluencerList.InfList = data => go(
        JSON.parse(data),
        map(a => writeInfList(a.id, a.sns_info.instagram_followers, ['IT','패션'], a.sns_info.instagram_media[0].like_count, a.sns_info.instagram_media[0].comments_count, a.sns_info.instagram_media[0].caption, a.sns_info.instagram_media[0].media_url, go(a.sns_info.instagram_media, map(a => a.media_url))))
    )

    const writeInfList = (id, followers, category, firstPostLike, firstPostComment, firstPostCaption, firstPostImg, ...postImg) => {
        let htmlCategoryList = go(
            category,
            map(a => html`
            <li>${a}<li>`)
        );
        if (!!postImg) {
            var htmlImgList = go(
                postImg,
                a => {
                    let result;
                    for (let i = 1; i < a.length; i++) {
                        result += html`
                        <img src=${array[i]}>`
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
        </tr>`
    }
} ( );
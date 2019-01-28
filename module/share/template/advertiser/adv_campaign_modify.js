!function() {
    TMPL.AdvCampaignModify = {};
    TMPL.AdvCampaignModify.getSubImg = subImgArr => {
        let order = 0;
        return go(
            subImgArr,
            map(a => html`
                <div class="sub_img_wrap">
                    <img src=${a}?${new Date()} class="sub_img non_modified" name="sub_img" file_name=${getFileName(a)} sub_order=${order++}>
                    <input type="file" target="${getFileName(a)}" accept="image/*" class="img_url" name="img_url">
                </div>
            `),
            b => b.join('') + TMPL.AdvCampaignModify.writeEmtySubImg(b)
        )
    }
    TMPL.AdvCampaignModify.writeEmtySubImg = subImgArr => go(
        subImgArr,
        _ => {
            let result = "";
            for (let i = subImgArr.length; i < 3; i++) {
                result += html`
                <div class="sub_img_wrap">
                    <img src=null class="sub_img non_modified" name="sub_img" file_name="campaign_subImage_${i+1}" sub_order=${i}>
                    <input type="file" target="campaign_subImage_${i+1}" accept=".jpg, .jpeg, .png" class="img_url" name="img_url">
                </div>
                `
            }
            return result;
        }
    )
} ();

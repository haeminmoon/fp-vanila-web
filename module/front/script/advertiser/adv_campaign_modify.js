!function () {
    const Do = {
        modify: $.on('click', ({delegateTarget: dt}) => {
            const campaignId = $.attr('name', $('.cancel'));
            const modifiedImgs = $.all('.modified', dt);
            const nonModifiedImgs = $.all('.non_modified', dt);
            const data = {
                name: $('.campaign_title').value,
                sns_type: go('.sns_type', $, findSelectedOption),
                category: go('.category', $, findSelectedOption),
                info: {
                    age: go('.age', $, findSelectedOption),
                    sex: go('.sex', $, findSelectedOption),
                    hash_tag: $('.hash_tag').value,
                    camp_description: $('.camp_description').value,
                    benefit_description: $('.benefit_description').value,
                    mission_description: $('.mission_description').value
                },
                updated_at: new Date().toISOString(),
                apply_start_date: getISOString($('[name="apply_start_date"]').value),
                apply_end_date: getISOString($('[name="apply_end_date"]').value),
                post_start_date: getISOString($('[name="post_start_date"]').value),
                post_end_date: getISOString($('[name="post_end_date"]').value),
                notice_date: getISOString($('[name="notice_date"]').value),
            }
            go(
                modifiedImgs,
                map(a => {
                    let fileName = $.attr('file_name', a);
                    let fileDataUrl = a.src;
                    return ({"file_name": fileName, "url": fileDataUrl, "order": $.attr('sub_order', a)});
                }),
                b => ({
                    campaign_id: campaignId,
                    db_values: data,
                    modified_files: b,
                    non_modified: go(nonModifiedImgs, map(a => ({"src": a.src, "order": $.attr('sub_order', a)})), b => {
                        let arr = [];
                        for (const iter of b) if (iter.src !== "http://localhost:3000/advertiser/null") arr.push(iter)
                        return arr;
                    })
                }),
                $.post('/api/advertiser/adv_campaign_modify')
            )
        }),

        cancelModify: $.on('click', ({currentTarget: ct}) => location.href = `/advertiser/adv_campaign_detail?id=${ct.name}`),

        readyImage: $.on('change', '.img_url', ({currentTarget: ct}) => {
            if (ct.files && ct.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    $(`[file_name=${$.attr('target', ct)}]`).src = e.target.result;
                    $(`[file_name=${$.attr('target', ct)}]`).classList.remove('non_modified');
                    $(`[file_name=${$.attr('target', ct)}]`).classList.add('modified');
                };
                reader.readAsDataURL(ct.files[0]);
            }
        }),

        setMinDate: $.on('change', '.date_start', ({currentTarget: ct}) => {
            let target = $(`[name=${$.attr('target', ct)}]`, document);
            target.min = ct.value;
            (target.value < target.min)? target.value = "" : ""; 
        }),

        setSelectOption: obj => {
            addAttributeAtSelect('sns_type', obj.sns_type);
            addAttributeAtSelect('sex', obj.sex);
            addAttributeAtSelect('age', obj.age);
            addAttributeAtSelect('category', obj.category);
        },

        clickPlusButton: $.on('click', '.sub_img_plus', ({currentTarget: ct}) => {
            let index = $.attr('index', ct);
            $(`.sub_img_wrap_${index}`).classList.remove('hidden');
            ct.classList.add('hidden');
        })
    };

    global.AdvCampaignModify = {
        Do
    };
}();

const addAttributeAtSelect = (selectBoxName, option) => {
    $(`.${selectBoxName} option[value=${option}]`).setAttribute("selected", "selected");
}
const findSelectedOption = selecter => selecter.options[selecter.selectedIndex].value;
const getISOString = date => new Date(date);
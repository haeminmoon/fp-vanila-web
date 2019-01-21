!function () {
    const Do = {
        registerCampaign: $.on('click', _ => {
            const form = $('#camp_form');
            const formData = new FormData(form);
            let isEmpty = false;
            // 데이터 빈 값 체크
            for(let value of formData.values()) {
                if(value === ''){
                    isEmpty = true;
                    break;
                }
            }
            (!isEmpty) ? form.submit() : alert('빈칸을 채워주세요');

        }),

        cancelCampaign: $.on('click', _ => location.href = '/advertiser/adv_campaign_management'),

        readyImage: $.on('change', '.img_url', ({currentTarget: ct}) => {
            if (ct.files && ct.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    $(`.${$.attr('target', ct)}`).src = e.target.result;
                    $(`.${$.attr('target', ct)}`).classList.add('modified');
                };
                reader.readAsDataURL(ct.files[0]);
            }
        })
    };


    global.AdvCampaignModify = {
        Do
    };
}();
!function () {
    const Do = {
        registerCampaign: $.on('click', _ => go(
            new FormData($('#camp_form')),
            pipeT(
                a => {
                        for(let value of a.values()) {
                            if(value === ''){
                                throw 'No content';
                            }
                        }
                        return a;
                },
                $.postFormData('/api/advertiser/adv_campaign_registration'),
                _ => location.replace('/advertiser/adv_campaign_management')
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')
                    (_ => alert('입력란을 채워주세요.'))
                    .else(_ => alert('서버 에러입니다.')),
            )
        )),

        cancelCampaign: $.on('click', _ => location.href = '/advertiser/adv_campaign_management'),

        mainImageFileName: $.on('change', el => { $('.upload_name').value =el.target.files[0].name; })
    };


    global.AdvCampaignRegistration = {
        Do
    };
}();

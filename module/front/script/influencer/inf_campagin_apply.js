!function () {
    const Do = {
        campaignAgree: $.on('click', '.campaign_agree_btn', ({delegateTarget: dt}) => go({
                campaign_id: go(dt, $.find('.brand_tit'), $.attr('id')),
                campaign_name: go(dt, $.find('.campaign_tit'), $.html),
                advertiser_id: go(dt, $.find('.brand_tit'), $.html),
                user_id: go(dt, $.find('.user_id'), $.html),
                memo: go(dt, $.find('.memo'), $.trim),
                phone_num: go(dt, $.find('.phone_num'), $.html),
                name: go(dt, $.find('.name'), $.html),
                post_code: go(dt, $.find('[name="post_code"]'), $.trim),
                address: go(dt, $.find('[name="address"]'), $.trim),
                followers: go(dt, $.find('.user_id'), $.attr('followers')),
<<<<<<< HEAD
                selected: false
=======
                state: 'apply_complete'
>>>>>>> 2f33dbc18725189c7651e9c0d2db97e2b40889ee
            },
            pipeT(
                a => {
                    if (a.address === '' || a.post_code === ''){
                        throw 'No content';
                    }
                    return a;
                },
                ({campaign_id, campaign_name, advertiser_id, user_id, ...user_info}) => {
                    let info = {};
                    info[user_id] = user_info;
                    return {
                        id: campaign_id,
                        campaign_name: campaign_name,
                        advertiser_id: advertiser_id,
                        info: info
                    }
                },
                $.post('/api/influencer/inf_campaign_apply'),
                _ => location.href = '/influencer/inf_campaign_management'
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')
                    (_ => alert('배송 주소를 입력해주세요'))
                    .else(_ => alert('서버 에러입니다.'))
            )
        )),

        showPost: $.on('click', _ => {
            new daum.Postcode({
                oncomplete: function (data) {
                    let fullAddr, extraAddr = '';

                    if (data.userSelectedType === 'R') {
                        fullAddr = data.roadAddress;
                    } else {
                        fullAddr = data.jibunAddress;
                    }

                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }
                    $('.post_code').value = data.zonecode;
                    $('.address').value = fullAddr;
                    $('.address').focus();
                }
            }).open();
        })
    };

    global.InfCampaignApply = {
        Do
    };
}();
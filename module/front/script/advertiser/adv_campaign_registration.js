!function () {
    const Do = {
        registerCampaign: $.on('click', _ => {
            const form = $('#camp_form');
            const formData = new FormData(form);
            let isEmpty = false;
            // 빈 칸 체크
            for(let value of formData.values()) {
                if(value === ''){
                    isEmpty = true;
                    break;
                }
            }
            // 상세 이미지 파일 개수 체크
            if($('.sub_img').files.length > 5) {
                alert('파일의 최대 개수를 지켜주세요.');
                return;
            }
            (!isEmpty) ? form.submit() : alert('빈칸을 채워주세요');

        }),
        readyImage: $.on('change', ({currentTarget: ct}) => {
            if (ct.files && ct.files[0]) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    $('#campaign_image').src = e.target.result;
                };
                reader.readAsDataURL(ct.files[0]);
            }
        })
    };


    global.AdvCampaignRegistration = {
        Do
    };
}();

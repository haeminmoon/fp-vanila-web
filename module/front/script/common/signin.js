!function () {
    const Route = {
        signupPopup: $.on('click', _ => {
            /**
             * TO-DO
             * 주소표시줄 제거, 팝업 사이즈 리사이징 - 레이어 팝업 고려
             */
            $.openPopup(`/common/signup_popup`, 'Signup', 'toolbar=no, status=no, scrollbars=no, width=1024, height=768')
        })
    };

    const Do = {
        signin: $.on('click', '.signin_btn', ({ delegateTarget: dt }) => go(
            {
                id: go(dt, $.find('.id'), $.trim),
                pw: go(dt, $.find('.pw'), $.trim)
            },
            pipeT(
                $.post('/api/common/signin'),
                a => match(a.auth)
                    .case('influencer')(
                        _ => location.href = '/influencer/inf_campaign_management'
                    )
                    .case('advertiser')(
                        _ => location.href = '/advertiser/adv_campaign_management'
                    )
                    // .case('admin')(
                    //     _ => location.href = '/admin/'
                    // )
                    .else(
                        _ => location.href = '/'
                    )
            ).catch(
                res => res.text(),
                match
                    .case('The ID does not exist')(
                        _ => alert('아이디가 올바르지 않습니다.')
                    )
                    .case('The password is incorrect')(
                        _ => alert('비밀번호가 올바르지 않습니다.')
                    )
                    .else(
                        _ => alert('서버 에러입니다.')
                    )
            )
        ))
    }

    global.Signin = {
        Route, Do
    };
}();



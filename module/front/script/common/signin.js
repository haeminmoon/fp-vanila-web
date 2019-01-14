!function() {
    const Route = {
        signupPopup: $.on('click', _ => { 
            /**
             * TO-DO
             * 주소표시줄 제거, 팝업 사이즈 리사이징 - 레이어 팝업 고려
             */
            $.openPopup(`/common/signup_popup`, 'Signup', 'toolbar=no, status=no, scrollbars=no, width=1024, height=768')
         })
    };
!function() {
    const Route = {
        signin: $.on('click', '.signin_btn', ({delegateTarget: dt}) => go(
            {
                id: go(dt, $.find('.id'), $.trim),
                pw: go(dt, $.find('.pw'), $.trim)
            },
            pipeT(
                $.post('/common/signin'),
                _ => location.href = '/'
            ).catch(
                tap(log),
                match
                    .case('The ID does not exist')
                    (_ => alert('아이디가 올바르지 않습니다.'))
                    .case('The password is incorrect')
                    (_ => alert('비밀번호가 올바르지 않습니다.'))
                    .else
                    (_ => alert('서버 에러입니다.'))
            )
        ))
    };

    global.Signin = {
        Route
    }; 
} ();


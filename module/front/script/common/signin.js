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

    global.Signin = {
        Route
    }; 
} ();


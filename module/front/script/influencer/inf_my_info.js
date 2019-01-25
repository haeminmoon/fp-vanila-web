!function () {
    const editInfo = {
        password: $.on('click', '.modify_password_btn', ({ delegateTarget: dt }) => go(
            {
                password: go(dt, $.find('[name="password"]'), $.trim),
                new_password: go(dt, $.find('[name="new_password"]'), $.trim),
                password_chk: go(dt, $.find('[name="password_chk"]'), $.trim)
            },
            pipeT(
                tap(log),
                $.put('/api/inf_my_info/modify_password'),
                _ => alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.'),
                _ => location.href = '/logout'
            ).catch(
                res => res.text(),
                match
                    .case('The password is incorrect')
                    (_ => {
                        $('.password_error').innerHTML = '비밀번호가 일치하지 않습니다.';
                        $('.modify_password_btn').disabled = 'disabled';
                    })
                    .case('Same password')
                    (_ => {
                        $('.password_error').innerHTML = '기존 비밀번호와 같습니다.';
                        $('.modify_password_btn').disabled = 'disabled';
                    })
                    .else(_ => alert('서버 에러'))
            )
        )),

        personalInfo: $.on('click', '.modify_psInfo_btn', ({ delegateTarget: dt }) => go(
            {
                name: go(dt, $.find('[name="name"]'), $.trim),
                nickname: go(dt, $.find('[name="nickname"]'), $.trim),
                birth: go(dt, $.find('[name="birth"]'), $.trim),
                // phone_num: go(dt, $.find('[name="phone_num"]'), $.trim)
            },
            tap(log),
            a => {
                if (confirm('수정하시겠습니까?') === true) {
                    $.put('/api/inf_my_info/modify_ps_info', a);
                    alert('계정정보가 수정되었습니다.');
                }
            }
        )),

        openSnsPop: $.on('click', _ => {
            if (confirm('인스타그램 연동 정보를 변경하시겠습니까?') === true) {
                $.openPopup('/influencer/inf_signup_connect_instagram', "connect_instagram", "width=500, height=353, menubar=no, status=no, toolbar=no")
            }
        }),

        snsAccount: $.on('click', '.sns_change_btn', ({ delegateTarget: dt }) => go(
            {
                instagram_profile_img: go(dt, $.find('.instagram_profile_img'), a => a.src),
                instagram_username: go(dt, $.find('.instagram_username'), a => a.innerText),
                instagram_media_count: go(dt, $.find('.instagram_media_count'), a => a.innerText),
                instagram_followers: go(dt, $.find('.instagram_followers_count'), a => a.innerText, b => b.replace(/[^0-9]/g, "")),
                instagram_follows: go(dt, $.find('.instagram_follows_count'), a => a.innerText, b => b.replace(/[^0-9]/g, "")),
                instagram_id: go(dt, $.find('[name="instagram_user_id"]'), $.trim),
                instagram_access_token: go(dt, $.find('[name="instagram_access_token"]'), $.trim),
                instagram_user_birthday: go(dt, $.find('[name="instagram_user_birthday"]'), a => a.innerText)
            },
            tap(log),
            $.put('/api/inf_my_info/sns_account_info'),
            tap(log),
            _ => alert('연동 계정이 변경되었습니다.'),
        )),

    };

    const validate = {
        password: $.on('keyup', _ => {
            const pw = go($('#new_password'), $.trim);
            const pw_reg = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

            if (!pw_reg.test(pw)) {
                $('.new_password_error').innerHTML = '비밀번호 형식을 맞춰주세요.';
                $('.modify_password_btn').disabled = 'disabled';
            }
            else {
                $('.new_password_error').innerHTML = '';
                $('.modify_password_btn').disabled = 'disabled';
            }
        }),

        CheckPw: $.on('keyup', _ => {
            const pw = go($('#new_password'), $.trim);
            const check_pw = go($('#password_chk'), $.trim);
            if (pw === '') {
                $('#password_chk').value = '';
                $('.password_chk_error').innerHTML = '비밀번호를 먼저 입력해주세요.';
                $('.modify_password_btn').disabled = 'disabled';

            } else if (pw === check_pw) {
                $('.password_chk_error').innerHTML = '';
                $('.modify_password_btn').disabled = false;

            } else {
                $('.password_chk_error').innerHTML = '비밀번호가 일치하지 않습니다.';
                $('.modify_password_btn').disabled = 'disabled';
            }
        })

    };

    global.InfMyInfo = {
        editInfo, validate
    };
}();



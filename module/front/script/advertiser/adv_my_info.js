!function () {
    const editInfo = {
        password: $.on('click', '.modify_password_btn', ({ delegateTarget: dt }) => go(
            {
                password: go(dt, $.find('[name="password"]'), $.trim),
                new_password: go(dt, $.find('[name="new_password"]'), $.trim),
                password_chk: go(dt, $.find('[name="password_chk"]'), $.trim)
            },
            pipeT(
                $.put('/api/adv_my_info/modify_password'),
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

        businessInfo: $.on('click', '.modify_bsInfo_btn', ({ delegateTarget: dt }) => go(
            {
                company_name: go(dt, $.find('[name="company_name"]'), $.trim),
                brand_name: go(dt, $.find('[name="brand_name"]'), $.trim),
                ceo_name: go(dt, $.find('[name="ceo_name"]'), $.trim),
                business_num: go(dt, $.find('[name="business_num"]'), $.trim),
                event: go(dt, $.find('[name="event"]'), $.trim),
                industry: go(dt, $.find('[name="industry"]'), $.trim),
                phone_num: go(dt, $.find('[name="phone_num"]'), $.trim)
            },
            a => {
                if (confirm('수정하시겠습니까?') === true) {
                    /**
                     * TO-DO
                     * 실패시 예외처리
                     */
                    $.put('/api/adv_my_info/modify_ps_info', a);
                    alert('수정되었습니다.');
                }
            }
        )),

        address: $.on('click', '.modify_address_btn', ({ delegateTarget: dt }) => go(
            {
                post_code: go(dt, $.find('[name="post_code"]'), $.trim),
                address: go(dt, $.find('[name="address"]'), $.trim)
            },
            /**
             * TO-DO
             * 실패시 예외처리
             */
            $.put('/api/adv_my_info/modify_ad_info'),
            _ => alert('수정되었습니다.')
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

    global.AdvMyInfo = {
        editInfo, validate
    };
}();

!function () {
    const Do = {
        signup: $.on('click', '.submit_btn', ({ delegateTarget: dt }) => go(
            {
                id: go(dt, $.find('[name="id"]'), $.trim),
                pw: go(dt, $.find('[name="password"]'), $.trim),
                name: go(dt, $.find('[name="name"]'), $.trim),
                nickname: go(dt, $.find('[name="nickname"]'), $.trim),
                birth: go(dt, $.find('[name="birth"]'), $.trim),
                gender: go(dt, $.findAll('[name="gender"]'), filter(a => a.checked === true), first, $.val),
                // phone_num: go(dt, $.find('[name="phone_num_cer"]'), $.trim),
                // certification_num: go(dt, $.find('[name="certification_num"]'), $.trim),
                //instagram_id: go(dt, $.find('[name="instagram_user_id"]'), a => a.innerText)
            },
            pipeT(
                a => {
                    if (a.instagram_id === '') { }
                    for (key in a) {
                        if (a[key] === '') {
                            throw 'No content'
                        }
                    }
                    // delete a.certification_num;
                    delete a.instagram_id;
                    return a;
                },
                ({ id, pw, ...info }) => {
                    let snsInfo = {
                        instagram_id: go(dt, $.find('[name="instagram_user_id"]'), a => a.innerText),
                        instagram_access_token: go(dt, $.find('[name="instagram_access_token"]'), a => a.innerText),
                        instagram_username: go(dt, $.find('[name="instagram_username"]'), a => a.innerText),
                        instagram_followers: go(dt, $.find('[name="instagram_followers_count"]'), a => a.innerText, b => b.replace(/[^0-9]/g, "")),
                        instagram_follows: go(dt, $.find('[name="instagram_follows_count"]'), a => a.innerText, b => b.replace(/[^0-9]/g, "")),
                        instagram_profile_img: go(dt, $.find('[name="instagram_profile_img"]'), a => a.src),
                        instagram_user_birthday: go(dt, $.find('[name="instagram_user_birthday"]'), a => a.innerText)
                    };
                    return {
                        id: id,
                        pw: pw,
                        info: JSON.stringify(info),
                        auth: 'influencer',
                        created_at: new Date(),
                        sns_info: JSON.stringify(snsInfo)
                    };
                },
                $.post('/api/influencer/inf_signup'),
                a => location.href = `/influencer/inf_signup_complete?name=${a.info.name}&created_at=${a.created_at}`
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')
                    (_ => alert('입력란을 채워주세요'))
                    .else(_ => a),
                b => b.text(),
                match
                    .case('id')
                    (_ => { $('.id_error').innerHTML = '아이디가 중복되었습니다'; })
                    .else(_ => alert('서버 에러입니다'))
            )
        )),

        checkId: $.on('click', '.id_chk_btn', ({ delegateTarget: dt }) => go(
            {
                id: go(dt, $.find('.id'), $.trim)
            },
            pipeT(
                a => {
                    if (a.id === '')
                        throw 'No content';
                    return a;
                },
                $.post('/api/influencer/inf_checkId'),
                _ => { $('.id_error').innerHTML = '사용 가능한 아이디입니다.'; }
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')
                    (_ => {
                        $('.id_error').innerHTML = '아이디를 입력해주세요';
                        $('.submit_btn').disabled = 'disabled';
                    })
                    .else(_ => a),
                b => b.text(),
                match
                    .case('The ID is already exist')
                    (_ => {
                        $('.id_error').innerHTML = '사용할 수 없는 아이디입니다.';
                        $('.submit_btn').disabled = 'disabled';
                    })
                    .else(_ => alert('서버 에러입니다.'))
            )
        )),

        checkBn: $.on('click', '.phone_chk_btn', ({ delegateTarget: dt }) => alert('인증번호 발송 비활성화 상태입니다.')),
        // checkBn: $.on('click', '.phone_chk_btn', ({delegateTarget: dt}) => go(
        //     {
        //         phone_num: go(dt, $.find('[name="phone_num_cer"]'), $.trim)
        //     },
        //     pipeT(
        //         data => {
        //             if(get(data, 'phone_num') === '')
        //                 throw 'No content';
        //             return data;
        //         },
        //         $.post('/api/influencer/inf_checkBn'),
        //         result => {
        //             $('.user_code').value = result.code;
        //             alert('인증번호가 발송되었습니다.');
        //         }).catch(
        //         _ => alert('핸드폰 번호를 입력해주세요')
        //     )
        // )),

        validateEmail: $.on('change', _ => {
            const id = go($('#id'), $.trim);
            const id_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (!id_reg.test(id)) {
                $('.id_error').innerHTML = '이메일 형식을 맞춰주세요.';
                $('.submit_btn').disabled = 'disabled';
            } else {
                $('.id_error').innerHTML = '';
                $('.submit_btn').disabled = false;
            }
        }),

        validatePw: $.on('keyup', _ => {
            const pw = go($('#password'), $.trim);
            const pw_reg = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

            if (!pw_reg.test(pw)) {
                $('.password_error').innerHTML = '비밀번호 형식을 맞춰주세요';
                $('.submit_btn').disabled = 'disabled';
            } else {
                $('.password_error').innerHTML = '';
                $('.submit_btn').disabled = 'disabled';
            }
        }),

        validateCheckPw: $.on('keyup', _ => {
            const pw = go($('#password'), $.trim);
            const check_pw = go($('#password_chk'), $.trim);
            if (pw === '') {
                $('#password_chk').value = '';
                $('.password_chk_error').innerHTML = '비밀번호를 먼저 입력해주세요.';
                $('.submit_btn').disabled = 'disabled';

            } else if (pw === check_pw) {
                $('.password_chk_error').innerHTML = '';
                $('.submit_btn').disabled = false;

            } else {
                $('.password_chk_error').innerHTML = '비밀번호가 일치하지 않습니다.';
                $('.submit_btn').disabled = 'disabled';
            }
        }),

        validatePhoneNumber: $.on('change', _ => {
            const phone_number = go($('.phone_num_cer'), $.trim);
            const pn_req = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

            if (!pn_req.test(phone_number)) {
                $('.phone_num_error').innerHTML = "휴대폰 번호 형식을 맞춰주세요.";
                $('.submit_btn').disabled = 'disabled';
            } else {
                $('.phone_num_error').innerHTML = '';
                $('.submit_btn').disabled = false;
            }
        }),

        validateCheckCode: $.on('keyup', _ => {
            const checkCode = go($('.certification_num'), $.trim);
            const userCode = go($('.user_code'), $.trim);

            if (checkCode == userCode) {
                $('.code_error').innerHTML = '';
                $('.submit_btn').disabled = false;
            } else {
                $('.code_error').innerHTML = '인증번호가 올바르지 않습니다.';
                $('.submit_btn').disabled = 'disabled';
            }
        }),

        showCodePhone: $.on('click', _ => {
            if (go($('.phone_num_cer'), $.trim) !== '') {
                log($.all('.input_wrap'));
                $.all('.input_wrap')[9].classList.remove("hidden");

            }
        }),

        openInstagramLogin: $.on('click', _ => {
            $.openPopup('/influencer/inf_signup_connect_instagram', "connect_instagram", "width=500, height=353, menubar=no, status=no, toolbar=no")
        }),

        readyImage: $.on('change', e => {
            let files = e.target.files;
            let filesArr = Array.prototype.slice.call(files);

            filesArr.forEach((f) => {
                if (!f.type.match('image.*')) {
                    return;
                }
                let reader = new FileReader();
                reader.onload = (e) => {
                    $('#profile_image').src = e.target.result;
                };
                reader.readAsDataURL(f);
            })
        })
    };
    global.InfSignup = {
        Do
    };
}();
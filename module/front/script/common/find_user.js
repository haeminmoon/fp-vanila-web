!function () {
    const Do = {
        findId: $.on('click', '.id_find_btn', ({delegateTarget: dt}) => go(
            {
                name: go(dt, $.find('[name = "id_name"]'), $.trim),
                phone_num: go(dt, $.find('[name = "id_phone_num"]'), $.trim)
            },
            pipeT(
                a => {
                    for (key in a) {
                        if (a[key] === "") {
                            throw 'No content'
                        }
                    }
                    return a;
                },
                $.post('/api/common/find_user/id'),
                a => {
                    $('.result_wrap').classList.remove('hidden');
                    $('.result_des').innerHTML = '입력하신 정보와 일치하는 아이디 정보입니다.';
                    $('.result').innerHTML = a;
                }
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')(_ => alert('입력란을 채워주세요'))
                    .else(_ => a),
                b => b.text(),
                match
                    .case('id')(_ => alert('존재하지 않은 사용자입니다.'))
                    .else(_ => alert('서버 에러입니다.'))
            )
        )),

        findPw: $.on('click', '.pw_find_btn', ({delegateTarget: dt}) => go(
            {
                id: go(dt, $.find('[name = "pw_id"]'), $.trim),
                phone_num: go(dt, $.find('[name = "pw_phone_num"]'), $.trim)
            },
            pipeT(
                a => {
                    for (key in a) {
                        if (a[key] === '') {
                            throw 'No content';
                        }
                    }
                    return a;
                },
                $.post('/api/common/find_user/pw'),
                first,
                a => {
                    $('.result_wrap').classList.remove('hidden');
                    (a.bool === true) ? $('.result_des').innerHTML = '임시번호를 사용자의 아이디 메일로 전송해드렸습니다.' : alert('서버 에러입니다.') ;
                }
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')(_ => alert('입력란을 채워주세요.'))
                    .else(_ => a),
                b => b.text(),
                match
                    .case('id')(_ => alert('존재하지 않은 아이디입니다.'))
                    .case('phone_num')(_ => alert('휴대폰 번호가 올바르지 않습니다.'))
                    .else(_ => alert('서버 에러입니다.'))
            )
        ))
    };

    global.FindUser = {
        Do
    };
}();

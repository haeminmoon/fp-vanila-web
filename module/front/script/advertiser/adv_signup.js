!function (){
    const Do = {
        signup: $.on('click', '.submit_btn', ({delegateTarget: dt}) => go(
            {
                id: go(dt, $.find('[name="id"]'), $.trim),
                pw: go(dt, $.find('[name="password"]'), $.trim),
                company_name: go(dt, $.find('[name="company_name"]'), $.trim),
                brand_name: go(dt, $.find('[name="brand_name"]'), $.trim),
                ceo_name: go(dt, $.find('[name="ceo_name"]'), $.trim),
                business_num: go(dt, $.find('[name="business_num"]'), $.trim),
                event: go(dt, $.find('[name="event"]'), $.trim),
                industry: go(dt, $.find('[name="industry"]'), $.trim),
                phone_num: go(dt, $.find('[name="phone_num"]'), $.trim),
                address: `${go(dt, $.find('[name="address"]'), $.trim)} ${go(dt, $.find('[name="detail_address"]'), $.trim)}`,
            },
            pipeT(
                a => {
                    for (key in a) {
                        if ( a[key] === '') {
                            throw 'No content'
                        }
                    }
                    return a;
                },
                ({ id, pw, auth, created_at, ...info }) => {
                  return {
                      id: id,
                      pw: pw,
                      info: JSON.stringify(info),
                      auth: 'advertiser',
                      created_at: new Date()
                  }
                },
                $.post('/advertiser/adv_signup'),
                _ => location.href = '/'
            ).catch(
                a => match(a)
                    .case(a => a === 'No content')(_ => alert('입력란을 채워주세요.'))
                    .else(_ => a),
                b => b.text(),
                match
                    .case('id')
                    (_ => {
                        alert('아이디가 중복되었습니다.')
                    })
                    .else
                    (_ => alert('서버 에러입니다.'))
            )
        ))
    };
    global.AdvSignUp = {
        Do
    }
} ();
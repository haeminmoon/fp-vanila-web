app.get('/admin/admin_notice_registeration', async(req, res) => {
    if (!req.session.user || req.session.user.auth !== 'admin') return res.redirect('/common/signin');

    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/admin/admin_common_notice.css" />
            <link rel="stylesheet" href="/front/css/admin/admin_notice_registeration.css" />
        `,
        header: TMPL.layout.accountHeader('find_user'),
        nav: TMPL.layout.adminNav("admin"),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a>홈</a>
                        <a href="/admin/admin_notice_registeration">공지사항 등록</a>
                    </div>
                    <div class="notice_wrap">
                        <div class="input_wrap">
                            <label for="notification_target" class="notification_target_label">공지 대상<sup>*</sup></label>
                            <div class="wrap_right notification_target_wrap">
                                <select name="notification_target" class="notification_target">
                                    <option value="all">전체</option>
                                    <option value="influencer">인플루언서</option>
                                    <option value="advertiser">광고주</option>
                                </select>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="notice_name" class="notice_name_wrap">공지사항 제목<sup>*</sup></label>
                            <div class="wrap_right notice_name_wrap">
                                <input type="text" name="notice_name" class="notice_name">
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="date" class="date_wrap">공지 일정<sup>*</sup></label>
                            <div class="wrap_right date_wrap">
                                <div>
                                    <label for="notice_due_date">공지 기간</label>
                                    <input type="date" name="notice_due_date" class="notice_due_date_start">
                                    <input type="date" name="notice_due_date" class="notice_due_date_end">
                                </div>
                            </div>
                        </div>
                        <div class="input_wrap">
                            <label for="notice_description" class="notice_description_wrap">공지사항 설명<sup>*</sup></label>
                            <div class="wrap_right notice_description_wrap">
                                <textarea name="notice_description" cols="40" rows="8" class="notice_description"></textarea>
                            </div>
                        </div>
                        <div>
                            <input type="button" value="등록" name="notice_register_btn" class="notice_register_btn">
                            <input type="button" value="취소" name="notice_cancel_btn" class="notice_cancel_btn">
                        </div>
                    </div>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/admin/admin_notice_registeration.js"></script>
        <script>
            go('.notice_register_btn', $, AdminNoticeRegistration.Do.registerNotice);
        </script>
        `
    }));
});

app.post('/api/admin/admin_notice_registeration', async (req, res) => {
    go(
        req.body,
        a => Object.assign(a, {created_at: new Date()}),
        async b => {
            let [notice] = await QUERY`INSERT INTO notices ${VALUES(b)} RETURNING id, name, notification_target`;
            let notification_contents = {"attr":"notice", "id":notice.id, "name":notice.name};
            let targetUserList = await getUserList(notice.notification_target);
            let hsms = new Date();
            hsms = hsms.getHours()+""+hsms.getMinutes()+""+hsms.getMilliseconds();
            return go(
                targetUserList,
                map(a => {
                    // 알림을 어떻게 저장할지 확인하는 부분
                    if (a.notification_list === null) {
                        a.notification_list = {[hsms] : {attr : notification_contents.attr, id : notification_contents.id, name : notification_contents.name, read : false}};
                    } else {
                        Object.assign(a.notification_list, {[hsms] : {attr : notification_contents.attr, id : notification_contents.id, name : notification_contents.name, read : false}});
                    }
                    return a;
                }),
                map(b => {
                    QUERY`UPDATE user_notification SET notification_list = ${JSON.stringify(b.notification_list)} WHERE id = ${b.id} RETURNING TRUE`;
                }),
                _ => ({"res":"send notification"}),
                res.json
            )
        }
    )
});
const getUserList = target => target === "all"? QUERY`SELECT * FROM user_notification` : QUERY`SELECT * FROM user_notification WHERE auth = ${target}`;
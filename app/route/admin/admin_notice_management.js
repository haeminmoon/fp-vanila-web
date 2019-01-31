app.get('/admin/admin_notice_management', async(req, res) => {
    if (!req.session.user || req.session.user.auth !== 'admin') return res.redirect('/common/signin');
    
    const notices = await QUERY`SELECT * FROM notices`;
    
    res.send(TMPL.layout.hnmf({
        css: `
            <link rel="stylesheet" href="/front/css/admin/admin_common_notice.css"/>
        `,
        header: TMPL.layout.accountHeader('find_user'),
        nav: TMPL.layout.adminNav("admin"),
        main: `
            <div id="main">
                <div class="container">
                    <div class="breadcrumbs">
                        <a>홈</a>
                        <a href="/admin/admin_notice_management">공지사항 목록</a>
                    </div>
                </div>
                <div class="list_wrap">
                    <h2>공지사항 목록</h2>
                    <table class="notice_table">
                        <caption>공지사항 게시판</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="num">NO</th>
                                <th scope="col" class="notice_name">제목</th>
                                <th scope="col" class="apply_term">공지 기간</th>
                                <th scope="col" class="notification_target">대상</th>
                                <th scope="col" class="start_date">등록일</th>
                            </tr>
                        </thead>
                        <tbody class="notice_list">
                            ${TMPL.AdminNoticeManagement.getNoticeList(notices)}
                        </tbody>
                    </table>
                </div>
            </div>
        `,
        footer: ``,
        script: `
        <script src="/front/script/admin/admin_notice_management.js"></script>
        <script>
            go('.target', $, AdminNoticeManagement.Do.clickTarget);
        </script>
        `
    }));
});
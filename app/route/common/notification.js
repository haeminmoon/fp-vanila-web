app.post('/api/notification', async (req, res) => {
    let id = req.body.id;
    const [data] = await QUERY`SELECT notification_list FROM user_notification WHERE id = ${id}`;
    go(
        data.notification_list,
        a => {
            let contents = "";
            for (const key in a) {
                if (a[key].read === false) {
                    contents += `
                    <li class="noti">
                        <a href='${convertNotificationContents(a[key].attr)}?id=${a[key].id}&notificationId=${key}'>
                            <span>${convertNotificationAttr(a[key].attr)}</span>
                            <p>${convertNotificationAttr(a[key].attr)} | ${a[key].name}</p>
                        </a>
                    </li>`
                }
            }
            return contents;
        },
        b => {
            if (!b) return ({"res":"there is no contents"});
            else return ({"res":"successful load notification", "contents":b});
        },
        res.json
    );
});

app.post('/api/notification_read', async (req, res) => {
    let id = req.body.userId;
    let notificationId = req.body.notificationId;
    let [data] = await QUERY`SELECT notification_list FROM user_notification WHERE id = ${id}`;
    data.notification_list[notificationId].read = "true";
    QUERY`UPDATE user_notification SET notification_list = ${data} WHERE id = ${id}`
    res.json({bool:true});
})

const convertNotificationAttr = attr => attr === "notice"? "공지사항" : "알림 속성이 존재하지 않습니다";
const convertNotificationContents = attr => attr === "notice"? "/notice_detail" : "";

app.post('/api/notification', async (req, res) => {
    let id = req.body.id;
    const [data] = await QUERY`SELECT notification_list FROM user_notification WHERE id = ${id}`;
    go(
        data.notification_list,
        a => {
            let contents = "";
            for (const key in a) {
                contents += `<p>${convertNotificationAttr(key)}</p>`;
                contents += go(
                    a[key],
                    map(b => {
                        if (!b.read) return `<button onclick="location.href = '${convertNotificationContents(key)}?id=${b.id}'">${b.name}</button>`
                    }),
                    c => html`${c}`
                )
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
    let id = req.body.id;
    const [data] = await QUERY`SELECT notification_list FROM user_notification WHERE id = ${id}`;
    // data.notification_list[attr]
})

const convertNotificationAttr = attr => attr === "notice"? "공지사항" : "알림 속성이 존재하지 않습니다";
const convertNotificationContents = attr => attr === "notice"? "/notice_detail" : "";
// 알람컨텐츠 => 속성받고 => 속성에 대한 알람 한줄씩 만들수 있음 예를들어 [ 공지사항 알람 | 제목 : ${ㅇㅇㅇ} 필요한사항 추가 ]
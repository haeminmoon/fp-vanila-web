app.post('/api/notification', async (req, res) => {
    let id = req.body.id;
    const [data] = await QUERY`SELECT notification_list FROM user_notification WHERE id = ${id}`;
    go(
        data.notification_list,
        a => {
            // let contents = ``;
            // for (const key in a) {
            //     contents = go(
            //         a[key],
            //         map(b => {
            //             if (true) return `
            //             <li>
            //                 <a href='${convertNotificationContents(key)}?id=${b.id}'>
            //                     <span>${convertNotificationAttr(key)}</span>
            //                     <p>${convertNotificationAttr(key)} | ${b.name}</p>
            //                 </a>
            //             </li>
            //             `
            //         }),
            //         c => html`${c}`
            //     )
            // }
            // return contents;
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

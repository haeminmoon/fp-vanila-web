!function() {
    TMPL.AdminNoticeManagement = {};
    TMPL.AdminNoticeManagement.getNoticeList = noticeList => {
        return go(
            noticeList,
            map(a => getNoice(a)),
            b => html`${b}`
        )
    }
} ();

const getNoice = item => {
    return `
        <tr class="target">
            <td class="num">${item.id}</td>
            <td class="campaign_name">
                <p>${item.name}</p>
            </td>
            <td class="apply_term">${formatFrontDate(item.info.due_date_start)} ~ ${formatFrontDate(item.info.due_date_end)}</td>
            <td class="inf" style="text-align: center;">${convertTarget(item.notification_target)}</td>
            <td class="start_date">${formatFrontDate(item.created_at)}</td>
        </tr>
    `
}

const convertTarget = target => target === "all"? "전체" : target === "influencer"? "인플루언서" : "광고주";
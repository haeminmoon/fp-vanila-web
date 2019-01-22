!function() {
    TMPL.AdvCampaignManagement = {};
    TMPL.AdvCampaignManagement.list = (list) => go(
        list,
        map(item => html`
            <tr>
                <td class="num">${item.id}</td>
                <td class="campaign_name">
                    <img src="${item.img}?${new Date()}" alt="대표 이미지"/>
                    <p>${item.name}</p>
                </td>
                <td class="apply_term">${formatFrontDate(item.post_start_date)} ~ ${formatFrontDate(item.post_end_date)}</td>
                <td class="inf" style="text-align: center;">${item.count} 명</td>
                <td class="start_date">${formatFrontDate(item.created_at)}</td>
                <td class="camp_state">
                    <span class=${formatStateClass(item.state)}>${formatState(item.state)}</span>
                </td>
            </tr>
        `),
    );
} ();
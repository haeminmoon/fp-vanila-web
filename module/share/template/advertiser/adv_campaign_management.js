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
                <td class="apply_term">${formatFrontDate(item.apply_start_date)} ~ ${formatFrontDate(item.apply_end_date)}</td>
                <td class="inf" style="text-align: center;">${item.count} 명</td>
                <td class="start_date">${formatFrontDate(item.created_at)}</td>
                <td class="camp_state">
                    <span class=${formatStateClass(item.advertiser_state)}>${formatState(item.advertiser_state)}</span>
                </td>
            </tr>
        `),
    );
} ();
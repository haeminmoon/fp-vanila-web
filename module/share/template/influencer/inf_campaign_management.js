!function() {
    TMPL.InfCampaignManagement = {};
    TMPL.InfCampaignManagement.list = (list) => go(
        list,
        map(item => html`
            <tr>
                <td class="num">${item.id}</td>
                <td class="campaign_name">
                    <img src="${item.img}" alt="캠페인 이미지"/>
                    <p>${item.name}</p>
                </td>
                <td class="notice_date">${formatFrontDate(item.notice_date)}</td>
                <td class="post_date" style="text-align: center;">${formatFrontDate(item.post_start_date)} ~ ${formatFrontDate(item.post_end_date)}</td>
                <td class="brand_name">${item.brand_name}</td>
                <td class="camp_state">
                    <span class=${formatStateClass(item.influencer_id[$.attr('influencer', $('#main'))].state)}>${formatState(item.influencer_id[$.attr('influencer', $('#main'))].state)}</span>
                </td>
            </tr>
        `),
    )
} ();
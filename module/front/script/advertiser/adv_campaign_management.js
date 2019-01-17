!function () {

    let campaign_list, campaign_state_w, campaign_state_p, campaign_state_c, campagin_state_template, campagin_sort_template;
    let count = 0, reverse, state = '';


    const Do = {
        campaignList: (campaignList) => {
            campaign_list = go(
                campaignList,
                a => template_campaign_list(a),
                b => b.join('')
            );

            $('.camp_list').innerHTML = campaign_list;

            // state에 대한 리스트
            campaign_state_w = filter(a => a.state === 'wait', campaignList);
            campaign_state_p = filter(a => a.state === 'progress', campaignList);
            campaign_state_c = filter(a => a.state === 'complete', campaignList);

            // state 탬플릿
            campagin_state_template = (campaign_state_list) => go(campaign_state_list, a => template_campaign_list(a), b => b.join(''));
            // 정렬 템플릿
            campagin_sort_template = (campaign_list, reverse) => go(sortObjKey(campaign_list, 'count', reverse), b => template_campaign_list(b), c => c.join(''));

            // 인플런서 신청자수 정렬
            $('.inf').addEventListener('click', el => {
                count ++;
                reverse = (count % 2 === 1) ? true : false;
                for (checkbox of $.all('.checkbox')){
                    if (checkbox.checked === true) {
                        state = checkbox.value;
                    }
                }
                match(state)
                    .case(a => a === '')(_ => $('.camp_list').innerHTML =go( campaignList, a=> campagin_sort_template(a, reverse)))
                    .case(a => a === 'wait')(_ => $('.camp_list').innerHTML =go(campaign_state_w, a=> campagin_sort_template(a, reverse)))
                    .case(a => a === 'progress')(_ => $('.camp_list').innerHTML =go(campaign_state_p, a=> campagin_sort_template(a, reverse)))
                    .case(a => a === 'sale_complete')(_ => $('.camp_list').innerHTML =go(campaign_state_c, a=> campagin_sort_template(a, reverse)))
                    .else(_ => alert('준비'))
            });

        },

        event: $.on('change', e => go(
            e.target,
            a => {
                for (checkbox of $.all('.checkbox')) {
                    checkbox.checked = false;
                }
                a.checked = true;
                return a;
            },
            b => match(b.value)
                .case(c => c === 'wait')(_ => $('.camp_list').innerHTML = go(campaign_state_w, a => campagin_sort_template(a)))
                .case(c => c === 'progress')(_ => $('.camp_list').innerHTML = go(campaign_state_p, a => campagin_sort_template(a)))
                .case(c => c === 'sale_complete')(_ => $('.camp_list').innerHTML = go(campaign_state_c, a => campagin_sort_template(a)))
                .else(_ => '')
            )
        ),

        searchTerm: $.on('click', '.search_icon', ({delegateTarget: dt}) => go(
            {
                searchTerm: go(dt, $.find('[name="search_txt"]'), $.trim)
            },
            a => {
                (a.searchTerm === '') ? alert('검색어를 입력해주세요') : a;
                return a;
            },
            b => location.href = `/advertiser/adv_campaign_management?searchTerm=${b.searchTerm}`
        ))
    };

    const template_campaign_list = (list) => go(
            list,
            map(item => html`
            <tr>
                <td class="num">${item.id}</td>
                <td class="product_name">
                    <img src=${item.img} alt="대표 이미지"/>
                    <p>${item.name}</p>
                </td>
                <td class="slae_term">${formatDate(item.post_start_date)} ~ ${formatDate(item.post_end_date)}</td>
                <td class="inf" style="text-align: center;">${item.count} 명</td>
                <td class="start_date">${formatDate(item.created_at)}</td>
                <td class="camp_state">
                    <span class="check1">${formatState(item.state)}</span>
                </td>
            </tr>
        `),
        );

    global.AdvCampaignManagement = {
        Do
    };
}();

!function() {
    let campaign_list, campaign_list_ac, campaign_list_nw, campaign_list_pp, campaign_list_c, campaign_state_template;

    const Route = {
        campaignDetail: $.on('click', el => go(
            {
                id: (el.target.nodeName === 'IMG' || el.target.nodeName === 'P') ?
                    el.target.parentNode.parentNode.children[0].innerHTML :
                    el.target.parentNode.children[0].innerHTML
            },
            a => location.href = `/influencer/inf_campaign_detail?id=${a.id}`
        ))
    };

    const Do = {
        campaignList: (campaignList) => {
            campaign_list = go(
                campaignList,
                a => TMPL.InfCampaignManagement.list(a),
                b => b.join('')
            );

            $('.camp_list').innerHTML = campaign_list;

            // state에 대한 리스트
            campaign_list_ac = filter(a => a.influencer_id[$.attr('influencer', $('#main'))].state === 'apply_complete', campaignList);
            campaign_list_nw = filter(a => a.influencer_id[$.attr('influencer', $('#main'))].state === 'notice_waiting', campaignList);
            campaign_list_pp = filter(a => a.influencer_id[$.attr('influencer', $('#main'))].state=== 'posting_progress', campaignList);
            campaign_list_c = filter(a => a.influencer_id[$.attr('influencer', $('#main'))].state === 'complete', campaignList);

            $('.state_all').innerHTML = campaignList.length;
            $('.state_apply_complete').innerHTML = campaign_list_ac.length;
            $('.state_notice_waiting').innerHTML = campaign_list_nw.length;
            $('.state_posting_progress').innerHTML = campaign_list_pp.length;
            $('.state_complete').innerHTML = campaign_list_c.length;

            // state 탬플릿
            campaign_state_template = (campaign_state_list) => go(campaign_state_list, a => TMPL.InfCampaignManagement.list(a), b => b.join(''));

        },

        event: $.on('change', e => go(
           e.target,
           a => {
               for(checkbox of $.all('.checkbox')) {
                   checkbox.checked = false;
               }
               a.checked = true;
               return a;
            },
            b => match(b.value)
                .case(c => c === 'cam_apply_complete')(_ => $('.camp_list').innerHTML = go(campaign_list_ac, a => campaign_state_template(a)))
                .case(c => c === 'cam_notice_waiting')(_ => $('.camp_list').innerHTML = go(campaign_list_nw, a => campaign_state_template(a)))
                .case(c => c === 'cam_posting_progress')(_ => $('.camp_list').innerHTML = go(campaign_list_pp, a => campaign_state_template(a)))
                .case(c => c === 'cam_complete')(_ => $('.camp_list').innerHTML = go(campaign_list_c, a => campaign_state_template(a)))
                .else( _ => '')
        )),

        searchTerm: $.on('click', '.search_icon', ({delegateTarget: dt}) => go(
            {
                searchTerm: go(dt, $.find('[name="search_txt"]'), $.trim)
            },
            a => {
                (a.searchTerm === '') ? alert('검색어를 입력해주세요') : a;
                return a;
            },
            b => location.href = `/influencer/inf_campaign_management?searchTerm=${b.searchTerm}`
        ))

};

    global.InfCampaignManagement = {
        Do, Route
    }; 
} ();

!function() {
    const Do = {
        clickTarget : $.on('click', '.target', ({currentTarget : ct}) => {
            let targetId = $.attr('target', ct);
            let target = $.find(`[name="${targetId}"]`, document);
            if (target.classList[1] !== "hidden") target.classList.add("hidden");
            else target.classList.remove("hidden");
        }),

        checkAll : $.on('change', ({currentTarget : ct}) => go($.all('[name="inf_chk"]', document), map(a => a.checked = ct.checked))),

        submitSelectInfo : $.on('click', '.submit', async({delegateTarget : dt}) => {
            let checkBoxs = $.all('[name="inf_chk"]', dt);
            let campaignId = $.attr('campaign_id', $('.apply_inf_list'));
            let checkedSelectCount = go(checkBoxs, filter(a => $.attr('status', a) === "false"), filter(b => b.checked), map(c => c.value));
            let checkedExceptCount = go(checkBoxs, filter(a => $.attr('status', a) === "true"), filter(b => b.checked), map(c => c.value));
            go(
                {
                    "campaign_id" : campaignId,
                    "select_id" : checkedSelectCount,
                    "except_id" : checkedExceptCount
                },
                $.post('/api/advertiser/adv_campaign_detail'),
                a => {
                    if (a.bool) alert('적용되었습니다');
                    else alert('데이터베이스 업데이트에 실패했습니다');
                    location.reload();
                }
            )
        }),

        sortByFollower : $.on('click', ({currentTarget : ct}) => sortFormat(ct, getFollowerByTarget)),

        sortByStatus : $.on('click', ({currentTarget : ct}) => sortFormat(ct, getStatusByTarget))
    }

    const getFollowerByTarget = target => parseInt($.find('.column', target).innerText.replace(/'[^0-9]'/g, ""));
    const getStatusByTarget = target => Number($.find('[name="camp_state"]', target).innerText === "선정");
    const sortFormat = (ct, orderdFunction) => {
        let orderd = (ct.classList[1] === "up")? (a, b) => b - a : (a, b) => a - b;
        let targetArr = go($.all('.target', document), map(a => ({"target":a, "target_down": $.find(`[name="${$.attr('target', a)}"]`, document)})));
        targetArr.sort((a, b) => orderd(orderdFunction(a.target), orderdFunction(b.target)));
        $('.apply_inf_list').innerHTML = go(
            targetArr,
            map(a => html`
                <tr class="target" target="${$.attr('target', a.target)}">${a.target.innerHTML}</tr>
                <tr class="target_down hidden" name="${$.attr('target', a.target)}">${a.target_down.innerHTML}</tr>`)
        );
        if (ct.classList[1] === "up") {
            ct.classList.add("down");
            ct.classList.remove("up");
        } else {
            ct.classList.add("up");
            ct.classList.remove("down");
        }
    };

    global.AdvCampaignDetail = {
        Do
    };  
} ();

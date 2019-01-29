!function() {
    const Do = {
        clickTarget : $.on('click', '.target', ({currentTarget : ct}) => {
            let targetId = $.attr('target', ct);
            let target = $.find(`[name="${targetId}"]`, document);
            if (target.classList[1] !== "hidden") target.classList.add("hidden");
            else target.classList.remove("hidden");
        }),

        clickRefreshBtn : $.on('click', '.post_refresh_btn', ({currentTarget : ct}) => {
            go(
                {
                    "name" : $.attr('user_name', ct),
                    "campaign_id" : $.attr('campaign_id', $('.apply_inf_list'))
                },
                $.post('/api/advertiser/adv_campaign_detail'),
                tap(log),
                a => match(a.res)
                    .case(b => b === "user not found")(_ => alert("해당 유저를 찾을 수 없습니다"))
                    .case(b => b === "unselected user")(_ => alert("캠페인에 선정된 유저가 아닙니다"))
                    .case(b => b === "media dose not exist")(_ => alert("해당 유저의 게시물이 존재하지 않습니다"))
                    .case(b => b === "fail to update database")(_ => alert("데이터베이스 업데이트에 실패했습니다"))
                    .case(b => b === "successful data import but could not found the post")(_ => alert("해당 유저가 아직 캠페인 관련 게시물을 등록하지 않았습니다"))
                    .case(b => b === "successful data import and found the post")(_ => {
                        alert("캠페인 관련 게시물이 확인되었습니다")
                        return a.post
                    })
                    .else(_ => alert("서버 에러 입니다")),
                _ => location.reload()
            )
        }),

        checkAll : $.on('change', ({currentTarget : ct}) => go($.all('[name="inf_chk"]', document), map(a => a.checked = ct.checked))),

        submitSelectInfo : $.on('click', '.submit', async({delegateTarget : dt}) => go(
            $.all('[name="inf_chk"]', dt),
            pipeT(
            a => {
                let isEmpty = true;
                for (const key in a) if (a[key].checked) isEmpty = false;
                if (isEmpty) throw 'Checked value is not found'
                else return a;
            },
            b => ({
                    "campaign_id" : $.attr('campaign_id', $('.apply_inf_list')),
                    "select_id" : getCheckBoxValue(b, "false"),
                    "except_id" : getCheckBoxValue(b, "true")
            }),
            $.put('/api/advertiser/adv_campaign_detail'),
            c => match(c)
                .case(d => d.bool)
                (_ => alert('적용되었습니다'))
                .else(_ => alert('데이터베이스 업데이트에 실패했습니다')),
                _ => location.reload()
            ).catch(
                a => match(a)
                    .case(a => a === 'Checked value is not found')
                    (_ => alert('체크박스가 비어있습니다'))
                    .else(_ => alert('서버 에러입니다 Error Message : '+_.message))
            ))
        ),

        sortByFollower : $.on('click', ({currentTarget : ct}) => sortFormat(ct, getFollowerByTarget)),

        sortByStatus : $.on('click', ({currentTarget : ct}) => sortFormat(ct, getStatusByTarget))
    }

    global.AdvCampaignDetail = {
        Do
    };  
} ();

const getFollowerByTarget = target => parseInt($.find('.column', target).innerText.replace(/'[^0-9]'/g, ""));
const getStatusByTarget = target => Number($.find('[name="camp_state"]', target).innerText === "선정");
const getCheckBoxValue = (checkBoxs, status) => go(checkBoxs, filter(a => $.attr('status', a) === status && a.checked), map(b => b.value));
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
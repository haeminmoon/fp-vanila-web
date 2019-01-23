
!function() {

    const Do = {
        clickTarget: $.on('click', '.target', ({currentTarget : ct}) => {
            let targetId = $.attr('target', ct);
            let target = $.find(`[name="${targetId}"]`, document);
            if (target.classList[1] === "hidden") target.classList.remove("hidden");
            else target.classList.add("hidden");
        }),

        selectOptionSort: $.on('change', ({currentTarget : ct}) => {
            let selectedOption = findSelectedOption(ct);
            if (!selectedOption) return;
            let infList = go($.all('.target', document), map(a => {
                let clickHidden = $.find(`[name="${$.attr('target', a)}"]`, document);
                return ({"target": a, "click_hidden": clickHidden});
            }));
            infList.sort((a, b) => $.find(`.${selectedOption}`, b.target).innerText - $.find(`.${selectedOption}`, a.target).innerText);
            go(infList, infListWriteAtHtml);
        }),

        clickSearchFilter: $.on('click', ({delegateTarget : dt}) => {
            let selectFollowerMin = go($.find('[name="follower_min"]', dt), findSelectedOption);
            let selectFollowerMax = go($.find('[name="follower_max"]', dt), findSelectedOption);
            let selectAgesMin = go($.find('[name="ages_min"]', dt), findSelectedOption);
            let selectAgesMax = go($.find('[name="ages_max"]', dt), findSelectedOption);
            if (selectFollowerMax === "all") selectFollowerMax = 10000000000;
            else if (selectFollowerMin > selectFollowerMax) return alert("팔로워 검색 조건을 확인해주세요");
            if (selectAgesMax === "all") selectAgesMax = 1000;
            else if (selectAgesMin > selectAgesMax) return alert("연령대 검색 조건을 확인해주세요");

            let infList = $.all('.target', document);
            go(infList, map(a => {
                    let follower = parseInt($.find('.inf_follow', a).innerText);
                    let age = parseInt($.attr('value', $.find('.inf_ages', a)));
                    if ((selectFollowerMin <= follower) && (follower < selectFollowerMax) && (selectAgesMin <= age) && (age < selectAgesMax)) a.classList.remove("hidden");
                    else a.classList.add("hidden");
                })
            );
        })
    }

    const findSelectedOption = selecter => selecter.options[selecter.selectedIndex].value;
    const infListWriteAtHtml = infListArray => {
        let infListHtml = $.find('#click_wrap', document);
        infListHtml.innerHTML = "";
        go(infListArray, map(a => {
            infListHtml.innerHTML += `<tr class="target" target="${$.attr('target', a.target)}">${a.target.innerHTML}</div>`;
            infListHtml.innerHTML += `<tr class="click_hidden hidden" name="${$.attr('target', a.target)}">${a.click_hidden.innerHTML}</div>`
        }));
    }
    // const infHideAtHtml
    global.AdvInfluencerList = {
        Do
    };
} ();

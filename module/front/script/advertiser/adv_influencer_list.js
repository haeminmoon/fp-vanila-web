
!function() {

    const Do = {
        clickTarget: $.on('click', '.target', ({currentTarget : ct}) => {
            let targetId = $.attr('target', ct);
            let target = $.find(`[name="${targetId}"]`, document);
            if (target.classList[1] === "hidden") target.classList.remove("hidden");
            else target.classList.add("hidden");
        })
    }

    global.AdvInfluencerList = {
        Do
    };   
} ();

!function () {
    const Init = {
        event: $.on('resize', _ => {

        })
    };

    const Do = {
        filterEvent: (campaignList) => {
            $.on($('.filter_button'),'click', _ => {
                const category = $('.category').value;
                const sns_type = $('.sns_type').value;
                const sex =  $('.sex').value;
                const age = $('.age').value;

                $('.container').innerHTML = go(campaignList, a => {
                    if (category)
                        a = filter(b => b.category === category, a);
                    if (sns_type)
                        a = filter(b => b.sns_type === sns_type, a);
                    if (sex)
                        a = filter(b => b.info.sex === sex, a);
                    if (age)
                        a = filter(b => b.info.age === age, a);
                    return a;
                }, TMPL.InfCampaignList.list);
            })
        }
    };


    global.InfCampaignList = {
        Init,Do
    };
}();

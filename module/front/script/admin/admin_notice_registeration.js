!function() {
    const Do = {
        registerNotice : $.on('click', ({delegateTarget : dt}) => {
            go(
                {
                    name: $('.notice_name').value,
                    notification_target: go('.notification_target', $, notification_target),
                    info: {
                        due_date_start: $('.notice_due_date_start').value,
                        due_date_end: $('.notice_due_date_end').value,
                        description: $('.notice_description').value
                    }
                },
                tap(log),
                $.post('/api/admin/admin_notice_registeration'),
                _ => location.href = '/admin/admin_notice_management'
            )
        })
    }
    global.AdminNoticeRegistration = {
        Do
    };
} ();
const addAttributeAtSelect = (selectBoxName, option) => $(`.${selectBoxName} option[value=${option}]`).setAttribute("selected", "selected");
const notification_target = selecter => selecter.options[selecter.selectedIndex].value;

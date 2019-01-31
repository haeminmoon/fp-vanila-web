!function() {
    const Do = {
        clickTarget : $.on('click', '.target', ({currentTarget : ct}) => {
            let id = $('.num', ct).innerText;
            location.href = `/notice_detail?id=${id}`
        })
    }
    global.AdminNoticeManagement = {
        Do
    };  
} ();
const addAttributeAtSelect = (selectBoxName, option) => $(`.${selectBoxName} option[value=${option}]`).setAttribute("selected", "selected");
const notification_target = selecter => selecter.options[selecter.selectedIndex].value;

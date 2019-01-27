!function(global){

    const formatFrontDate = (date) => {
        const dateFormat = new Date(date);
        return dateFormat.getFullYear() + '-' +
            toString(dateFormat.getMonth()+1).padStart(2, "0") + '-'+
            toString(dateFormat.getDate()).padStart(2, "0")
    };

    const formatBackDate = (date) => {
        return date.getFullYear() + '-' +
            toString(date.getMonth()+1).padStart(2, "0") + '-'+
            toString(date.getDate()).padStart(2, "0")
    };

    const isEmptyObj = (obj) => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };

    const formatStateClass = (state) => {
        let stateClass = '';

        if (state === 'apply_complete') {
            stateClass = 'check0';
        } else if (state === 'wait' || state === 'notice_waiting') {
            stateClass = 'check1';
        } else if (state === 'progress' || state === 'posting_progress') {
            stateClass = 'check2';
        } else if (state === 'complete') {
            stateClass = 'check3';
        }
        return stateClass;
    };

    const formatState = (state) => {
        let stateKo;
        switch(state){
            case 'wait':
                stateKo = '대기중';
                break;
            case 'progress':
                stateKo = '진행중';
                break;
            case 'complete':
                stateKo = '완료';
                break;
            case 'apply_complete':
                stateKo = '신청완료';
                break;
            case 'notice_waiting':
                stateKo = '발표 대기중';
                break;
            case 'posting_progress':
                stateKo = '홍보 진행중';
                break;

        }
        return stateKo;
    };

    const sortObjKey = (obj, key, reverse) => {
        return obj.sort(function (a, b) {
            let valueA = a[key];
            let valueB = b[key];
            if(valueA < valueB)
                return reverse ? 1 : -1;
            if(valueA > valueB)
                return reverse ? -1 : 1;
            return 0;
        })
    };

    const updateDB = (column, value, id) => {
        switch (column) {
            case "name":
                return QUERY`UPDATE campaign SET name = ${value} WHERE id = ${id} RETURNING true`
            case "sns_type":
                return QUERY`UPDATE campaign SET sns_type = ${value} WHERE id = ${id} RETURNING true`
            case "category":
                return QUERY`UPDATE campaign SET category = ${value} WHERE id = ${id} RETURNING true`
            case "state":
                return QUERY`UPDATE campaign SET state = ${value} WHERE id = ${id} RETURNING true`
            case "img":
                return QUERY`UPDATE campaign SET img = ${value} WHERE id = ${id} RETURNING true`
            case "info":
                return QUERY`UPDATE campaign SET info = ${value} WHERE id = ${id} RETURNING true`
            case "updated_at":
                return QUERY`UPDATE campaign SET updated_at = ${value} WHERE id = ${id} RETURNING true`
            case "apply_start_date":
                return QUERY`UPDATE campaign SET apply_start_date = ${value} WHERE id = ${id} RETURNING true`
            case "apply_end_date":
                return QUERY`UPDATE campaign SET apply_end_date = ${value} WHERE id = ${id} RETURNING true`
            case "post_start_date":
                return QUERY`UPDATE campaign SET post_start_date = ${value} WHERE id = ${id} RETURNING true`
            case "post_end_date":
                return QUERY`UPDATE campaign SET post_end_date = ${value} WHERE id = ${id} RETURNING true`
            case "notice_date":
                return QUERY`UPDATE campaign SET notice_date = ${value} WHERE id = ${id} RETURNING true`
            case "sub_img":
                return QUERY`UPDATE campaign SET sub_img = ${value} WHERE id = ${id} RETURNING true`
            case "influencer_id":
                return QUERY`UPDATE campaign SET influencer_id = ${value} WHERE id = ${id} RETURNING true`
            default:
                return ({bool : false});
        }
    }

    const getFileName = fileUrl => fileUrl.split('/')[fileUrl.split('/').length-1].split('?')[0];

    global.Formatter = {
        formatFrontDate, formatBackDate, isEmptyObj, formatStateClass, formatState, sortObjKey, updateDB, getFileName
    }
}(typeof window != 'undefined'? window : global);
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

    global.Formatter = {
        formatFrontDate, formatBackDate, isEmptyObj, formatStateClass, formatState, sortObjKey
    }
}(typeof window != 'undefined'? window : global);
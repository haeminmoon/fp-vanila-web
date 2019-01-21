!function(global){

    const formatFrontDate = (date) => {
        return date.split('T')[0]
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
        let stateClass;
        switch(state){
            case 'wait':
                stateClass = 'check1';
                break;
            case 'progress':
                stateClass = 'check2';
                break;
            case 'complete':
                stateClass = 'check3';
                break;
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
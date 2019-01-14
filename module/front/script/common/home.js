!function() {    
    const Route = {
        signin: $.on('click', _ => { location.href = '/common/signin' })
    };

    global.Home = {
        Route
    };
} ();
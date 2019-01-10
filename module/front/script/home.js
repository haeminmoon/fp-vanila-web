!function() {    
    const route = {
        signin: $.on('click', _ => { location.href = '/signin' })
    };

    global.Home = {
        route
    };
} ();
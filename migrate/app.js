(async () => {
    require('../module/share/base/ff');
    require('../module/share/base/global');
    Object.assign(global, FF);

    const { PostgreSQL } = require('mql2');
    const { CONNECT } = PostgreSQL;
    const dbInfo = require('../config/db_info');
    const POOL = CONNECT({
        host: dbInfo.host,
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database
    });
    Object.assign(global, POOL);
}) ();




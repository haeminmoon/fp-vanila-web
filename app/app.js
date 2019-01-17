(async () => {
    const express = require('express');
    const app = global.app = express();

    /**
     * Custom modules
     */
    require('../module/share/base/ff');
    require('../module/share/base/ttl');
    require('../module/share/base/global');
    Object.assign(global, FF);
    Object.assign(global, TTL);

    require('../module/share/template/tmpl');
    require('../module/share/template/tmpl.layout');
    // require('../module/share/template/common/home');

    /**
     * DB - Query builder setting
     */
    const { PostgreSQL } = require('mql2');
    const { CONNECT } = PostgreSQL;
    const dbInfo = require('../config/dbInfo');
    const POOL = CONNECT({
        host: dbInfo.host,
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database
    });
    Object.assign(global, POOL);

    /**
     * Util middle ware
     */
    const path = require('path');
    const logger = require('morgan');
    const compress = require('compression');
    const session = require('express-session');
    const redisStore = require('connect-redis')(session);
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');

    app.use(compress());
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('stylus').middleware(path.join(__dirname, '../module')));
    app.use(express.static(path.join(__dirname, '../module')));

    app.use(logger('dev'));

    app.use(session({
        secret: 'eatable',
        store: new redisStore({host:'spin-redis.ib55gn.ng.0001.apn2.cache.amazonaws.com', port: 6379}),
        saveUninitialized: false,
        rolling: true,
        resave: false,
        cookie: {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 3600000 * 24 * 7),
            maxAge: 3600000 * 24 * 7
        }
    }));

    /**
     * i18n setting
     */
    const i18n = require('i18n');
    i18n.configure({
        locales:['ko', 'en'],
        directory: __dirname + '/locales',
        cookie: 'lang'
    });
    app.use(i18n.init);

    app.use((req, res, next) => {
        res.send = res.send.bind(res);
        res.json = res.json.bind(res);
        __ = res.__.bind(res);
        next();
    });

    require('./route');

    /**
     * Error handling middle ware
     */
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
        if (!req.url.match('/api')) return res.redirect('/');

        res.status(err.status || 500);
        res.send(err.message);
    });
}) ();

module.exports = app;

const request = require('request');
const get = (endPoint, header) => new Promise((resolve, reject) => {
    request.get({
        url: endPoint,
        headers: header
    }, (err, res, result) => {
        (res.statusCode === 200) ? resolve(JSON.parse(result)) :
            (isUndefined(err) ? reject(JSON.parse(result)) : reject(err))
    });
});

const post = (endPoint, header, body) => new Promise((resolve, reject) => {
    request.post({
        url: endPoint,
        headers: header,
        body: JSON.stringify(body)
    }, (err, res, result) => (res.statusCode === 200) ? resolve(JSON.parse(result)) :
        (isUndefined(err) ? reject(JSON.parse(result)) : reject(err)));
});

module.exports = {
    get, post
}
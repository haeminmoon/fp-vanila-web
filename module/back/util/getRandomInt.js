getRandomInt6 = _ => {
    let result = Math.floor(Math.random() * 1000000) + 100000;
    if(result > 1000000) result= result - 100000;
    return result;
};

getRandomInt8 = _ => {
    let result = Math.floor(Math.random() * 100000000) + 10000000;
    if(result > 100000000) result= result - 10000000;
    return result;
};

module.exports = {getRandomInt8, getRandomInt6};
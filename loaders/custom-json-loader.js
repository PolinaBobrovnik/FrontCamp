module.exports = function(source) {
    const data = JSON.parse(source);
    const newData = Object.keys(data).reduce((currObj, key) => {
        if(!isNumber(key)) {currObj[key] = data[key]}
        return currObj;
        }, {});
    return JSON.stringify(newData);
};

function isNumber(value) { 
    return !isNaN(parseFloat(value)) 
}
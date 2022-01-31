if(process.env.Node_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}
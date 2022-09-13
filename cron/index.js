const cron = require('node-cron');

const removeOldAuthTokens = require('../cron/removeOldAuthTokens');
const removeOldPassword = require('../cron/removeOldPassword');

module.exports = () => {
    cron.schedule(' 0 4 * * *', removeOldAuthTokens);
    cron.schedule(' 0 5 * * *', removeOldPassword);
};
const {emailEctionEnum} = require('../constants');

module.exports = {
    [emailEctionEnum.WELCOME]: {
        subject: 'WELCOME',
        templateName: 'welcome'
    },

    [emailEctionEnum.ORDER_ARRIVER]: {
        subject: 'ORDER ARR',
        templateName: 'order_arrived'
    },

    [emailEctionEnum.FORGOT_PASSWORD]: {
        subject: 'FORGOT_PASS',
        templateName: 'forgot_pass'
    },

}
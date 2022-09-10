const {emailActionEnum} = require('../constants');

module.exports = {
  [emailActionEnum.WELCOME]: {
    subject: 'WELCOME',
    templateName: 'welcome'
  },

  [emailActionEnum.ORDER_ARRIVER]: {
    subject: 'ORDER ARR',
    templateName: 'order_arrived'
  },

  [emailActionEnum.FORGOT_PASSWORD]: {
    subject: 'Ooops, dont worry!!!',
    templateName: 'forgot_pass'
  },

};

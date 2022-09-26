const twilio = require('twilio');
const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = require('../config/config');

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

module.exports = {
  sendSMS: async (phone, body) => {
    try {
      const info = await client.messages.create({
        body,
        messagingServiceSid: TWILIO_SERVICE_SID,
        to: phone,
      });
      console.log(`SMS was sended | sms sid: ${info.accountSid} | sms status ${info.status}`);
    }catch (e) {
      console.log(e.message);
    }
  }
};

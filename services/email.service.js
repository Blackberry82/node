const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLAY_EMAIL, NO_REPLAY_PASSWORD, FRONTEND_URL} = require('../config/config');
const emailTemplateObj = require('../email-templates/welcome-template');
const ApiError = require('../errors/ApiError');

const sendEmail = async (userMail, emailAction, locals = {}) => {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NO_REPLAY_EMAIL,
      pass: NO_REPLAY_PASSWORD
    }
  });

    const templateParser = new EmailTemplates({
        views: {root:path.join(process.cwd(), 'email-templates')}
    });

const emailInfo = emailTemplateObj[emailAction];

if (!emailInfo) {
    throw new ApiError('Wrong templates', 500);
}

    const html = await templateParser.render(emailInfo.templateName, {...locals, frontendURL: FRONTEND_URL});

return transporter.sendMail({
    from: 'Noreplay',
    to: userMail,
    subject: emailInfo.subject,
    html
});
};

module.exports = {
    sendEmail
};

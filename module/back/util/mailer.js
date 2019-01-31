const nodemailer = require('nodemailer');
const mailerAccount = require('../../../config/mailer_info.json');

const sendMail = (subject, text, receiverMail) => {
    const mailTransport = nodemailer.createTransport({
        service: mailerAccount.service,
        auth: { user: mailerAccount.id, pass: mailerAccount.pw }
    });

    const mailOptions = {
        from: `Spin <${mailerAccount.id}>`,
        to: receiverMail,
        subject: subject,
        text: text
    };

    return mailTransport.sendMail(mailOptions);
};

module.exports = {
    sendMail
}





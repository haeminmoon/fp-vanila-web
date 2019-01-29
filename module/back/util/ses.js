const AWS = require('aws-sdk');
const mailerAccount = require('../../../config/mailerInfo.json');
AWS.config.loadFromPath(__dirname + '/../../../config/s3Info.json');
AWS.config.update({region: "us-west-2"});
const ses = new AWS.SES({apiVersion: '2010-12-01'});


const mailOption = (subject, html, receiverMail) => {
   return {
       Source: `Spin <${mailerAccount.id}>`,
       Destination: { ToAddresses : [receiverMail]},
       Message: {
           Body: {
               Html: {
                   Charset: "UTF-8",
                   Data: html
               }
           },
           Subject: {
               Charset: "UTF-8",
               Data: subject
           }
       }
   };
};

module.exports = {
    ses, mailOption
};

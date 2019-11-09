/* 
  This module contains the implementation of the SendGrid API.
 */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

/**
 * @desc  This function sends a welcome email to the user.
 * @param email The email address of the user.
 * @param firstName The first name of the user, to address him in the email
 */
const sendFirstEmail = (email, firstName, url) => {
  sgMail.send({
    to: email,
    from: "support@onthehouse.com",
    subject: "Welcome to On The House! Please Verify Your Email",
    text: `Greetings from our team ${firstName}!\nWe are glad you joined our student network at UCI!\n\nPlease Verify your email using this link\n${url}`
  });
};

const sendSupportEmail = (email, req) => {
  sgMail.send({
    from: "support@onthehouse.com",
    subject: `[Support][UserID:${req.user._id}]${req.body.subject}`,
    text: `${req.body.message}`
  })
}


module.exports = {
  sendFirstEmail,
  sendSupportEmail
};

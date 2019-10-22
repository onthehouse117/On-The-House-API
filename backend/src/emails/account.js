const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendFirstEmail = (email, firstName) => {
  sgMail.send({
    to: email,
    from: "support@onthehouse.com",
    subject: "Welcome to On The House!",
    text: `Greetings from our team ${firstName}!\nWe are glad you joined our student network at UCI!\n\nAt On The House, subleasing is made easy! Simply.....`
  });
};

module.exports = {
  sendFirstEmail
};

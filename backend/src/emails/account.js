const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendFirstEmail = (email, firstName) => {
  sgMail.send({
    to: email,
    from: "support@onthehouse.com",
    subject: "Welcome to On The House!",
    text: `Greatings from our team ${firstName}! We are glad you joined our student network at UCI! At On The House subleasing is made easy! Simply.....`
  });
};

module.exports = {
  sendFirstEmail
};

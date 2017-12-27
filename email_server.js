let addrs = require("email-addresses");
let nodemailer = require("nodemailer");

const handleError = (msg, throwError = true) => {
  const error = new Meteor.Error(
    403,
    Accounts._options.ambiguousErrorMessages
      ? "Something went wrong. Please check your credentials."
      : msg
  );
  if (throwError) {
    throw error;
  }
  return error;
};
// AES 解密
let decryptPwd = (pwd, key) => {
  return CryptoJS.AES.decrypt(pwd, key).toString(CryptoJS.enc.Utf8)
}

let validateSmtp = (email, pass) => {
  let emailConfig = _.clone(Meteor.settings.emails.smtp);
  let password = decryptPwd(pass, email);
  _.extend(emailConfig, {auth: { user: email, pass: password}});
  let transporter = nodemailer.createTransport(emailConfig);
  
  return transporter.verify();
};

Accounts.registerLoginHandler("email", function (options) {
  if (!options.emailAddr)
    return undefined;
  
  let parsedEmail = addrs.parseOneAddress(options.emailAddr);

  if (!parsedEmail)
    handleError("Invalid email");

  // 邮箱密码校验
  // verify email connection configuration
  try {
    validateSmtp(options.emailAddr, options.emailPwd).await();
  } catch (e) {
    handleError("Incorrect password");
  }

  let user = Accounts.findUserByEmail(options.emailAddr);

  if (user) {
    if (Meteor.settings.emails.savePwd) {
      Meteor.users.update(user._id, { $set: {'services.email.id': user._id} });

      return Accounts.updateOrCreateUserFromExternalService('email', {
        id: user._id,
        email: options.emailAddr,
        pass: options.emailPwd
      });
    } else {
      return { userId: user._id };
    }
  } else {
    handleError("User not found");
  }
});
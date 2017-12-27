// Used in the various functions below to handle errors consistently
function reportError(error, callback) {
  if (callback) {
    callback(error);
  } else {
    throw error;
  }
};

Meteor.loginWithEmail = function (emailAddr, emailPwd, callback) {
  Accounts.callLoginMethod({
    methodArguments: [{
      emailAddr: emailAddr,
      emailPwd: Accounts._encryptPwd(emailPwd, emailAddr)
    }],
    userCallback: function (error, result) {
      if (error) {
        reportError(error, callback);
      } else {
        callback && callback();
      }
    }
  });
};

// AES 加密
Accounts._encryptPwd = (pwd, key) => {
  return CryptoJS.AES.encrypt(pwd, key).toString();
};
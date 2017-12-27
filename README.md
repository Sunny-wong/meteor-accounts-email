# meteor-accounts-email

### configure
settings.json
```
"emails": {
  "smtp": {
    "host": "smtp.xxxx.com",
    "port": 465,
    "secure": true,
    "tls": {
      "rejectUnauthorized": false
    }
  },
  "savePwd": false //是否保存邮箱密码
}
```

### client

```
Meteor.loginWithEmail(email, emailPwd, [callback])
```
Log the email in with a email password.

##### ARGUMENTS
* email
* emailPwd

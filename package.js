Package.describe({
  name: 'xiangyang:accounts-email',
  version: '0.0.1',
  summary: 'Login service for Email and EmailPassword',
  git: 'https://github.com/Sunny-wong/meteor-accounts-email',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom("1.5");
  api.use('ecmascript');
  api.use('accounts-base', ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  
  api.use('accounts-password', 'server');
  api.use('underscore');
  api.use('check');
  api.use('mrt:meteor-nodemailer@0.1.0');
  api.use('jparker:crypto-aes@0.1.0');
  api.use('3stack:email-addresses@2.0.1');

  api.addFiles('email_server.js', 'server');
  api.addFiles('email_client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('xiangyang:accounts-email');
  api.mainModule('accounts-email-tests.js');
});

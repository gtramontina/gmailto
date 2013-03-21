#!/usr/bin/env node

var doc = require('fs').readFileSync(require('path').resolve(__dirname, '../lib/usage.txt'), 'utf8');
var options = require('docopt').docopt(doc, { version: require('../package').version });

var to = options['<emails>'];
var subject = options['<subject>'];
var message = options['<message>'] || '';
if (!message) subject += ' <EOM>';
message += "\n\nSent from gmailTo.";

require('./settings').load(function send(settings) {

  require('emailjs/email').server.connect({
    user: settings.username,
    password: settings.password,
    host: 'smtp.gmail.com',
    ssl: true
  }).send({
    text: message,
    from: settings.email,
    to: to,
    subject: subject
  }, function(error) {
    if (error) { console.error(error); process.exit(1); }
    else console.log('Sent!');
  });

});

var fs = require('fs');
var keychain = require('keychain');
var dotGmailTo = require('path').join(process.env['HOME'], '.gmailto.json');

var service = 'gmailto';

exports.load = function(done) {
  if (!fs.existsSync(dotGmailTo)) promptInfo(done);
  else retrieve(done);
};

function promptInfo(done) {
  var prompt = require('prompt');
  prompt.start();
  prompt.message = '> '.bold.yellow;
  prompt.delimiter = '';
  prompt.get([{
    name: 'name',
    description: 'Your name:',
    required: true
  }, {
    name: 'username',
    description: 'Gmail username:',
    required: true
  }, {
    name: 'password',
    description: 'Gmail password:',
    hidden: true,
    required: true
  }], function(error, settings) {
    if (error) process.exit(1);
    settings.email = settings.name + ' <' + settings.username + '@gmail.com>';
    save(settings, done);
  });
}

function retrieve(done) {
  var settings = require(dotGmailTo);
  keychain.getPassword({ account: settings.username, service: service }, function(err, pwd) {
    if (err) promptInfo(done);
    else (settings.password = pwd) && done(settings);
  });
}

function save(settings, done) {
  var password = settings.password;
  delete settings.password;
  fs.writeFile(dotGmailTo, JSON.stringify(settings, null, 2), function() {
    keychain.setPassword({ account: settings.username, service: service, password: password }, function() {
      settings.password = password;
      done(settings);
    });
  });  
}

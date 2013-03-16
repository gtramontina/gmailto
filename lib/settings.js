var fs = require('fs');
var dotGmailTo = require('path').join(process.env['HOME'], '.gmailto.json');

exports.load = function(done) {
  if (!fs.existsSync(dotGmailTo)) promptInfo(done);
  else done(require(dotGmailTo));
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

function save(settings, done) {
  fs.writeFile(dotGmailTo, JSON.stringify(settings, null, 2), function() {
    done(settings);
  });
}

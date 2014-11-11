var fs, mailer, path, Mailgun;

nodemailer = require('nodemailer');

fs = require('fs');

path = require('path');

Mailgun = require('mailgun').Mailgun;

module.exports = {

  confirmEmail: function(opts,emailOpts) {

    var cTpl, tpl, transporter, fullPath;

    fullPath = path.normalize(path.dirname(module.filename)+'../../../templates/');

    tpl = fs.readFileSync(fullPath + 'email_confirmation.tpl', 'utf8');

    // compile template
    cTpl = this.compile(tpl, opts);

//    transporter = nodemailer.createTransport({
//          service: 'Gmail',
//          auth: {
//            user: process.env.EMAIL || '',
//            pass: process.env.EMAIL_SERVICE_PASS || ''
//          }
//    });

//    var mailOptions = {
//      from: emailOpts.from, // sender address
//      to: emailOpts.to, // list of receivers
//      subject: emailOpts.subject, // Subject line
//      html: cTpl // html body
//    };

    Mailgun.sendRaw (emailOpts.from, emailOpts.to, 'Content-Type: text/html; charset=utf-8'
                     + '\nSubject: ' + emailOpts.subject+'\n\n'+ cTpl, function(err){
      if(err) {
          sails.log.error(err);
      }
    });
//    transporter.sendMail(mailOptions, function(error, info){
//      if(error){
//        sails.log.error(error);
//      }else{
//        sails.log.info('Message sent: ' + info.response);
//      }
//    });
  },
  compile: function(tpl, obj) {
    var k, v;
    for (k in obj) {
      v = obj[k];
      tpl = tpl.replace(new RegExp("{{" + k + "}}", "g"), v);
    }
    return tpl;
  }
};

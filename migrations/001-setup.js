var kabamMigrate = require('kabam-plugin-migrate');
kabamMigrate.initMongoose();

exports.up = function(next) {

  var admin = new kabamMigrate.model.User({
    email: 'admin@monimus.com',
    username: 'kabamadmin',
    apiKey: 'APIKEY',
    root: true,
    emailVerified: true,
    profileComplete: true
  });

  admin.save(function(err, admin) {
    if (err) {
      console.error(err);
    }
    admin.setPassword('kabamadmin', function() {
      console.log('Admin account added');
      kabamMigrate.model.Group.create({
        name: 'Main Site',
        uri: '/',
        tier: 0,
        descriptionPublic: 'Main Group',
        descriptionForMembers: 'Main Group'
      }, function(err, group) {
        if (err) {
          console.error(err);
        }
        console.log('World group added');
        next();
      });
    });
  });

};

exports.down = function(next) {
  next();
};

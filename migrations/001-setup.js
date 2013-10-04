var kabamMigrate = require('kabam-plugin-migrate'),
  async = require('async');
kabamMigrate.initMongoose();

exports.up = function(next) {

  async.parallel([
    function(callback) {
      kabamMigrate.model.User.create({
        email: 'admin@monimus.com',
        username: 'kabamadmin',
        root: true,
        emailVerified: true,
        profileComplete: true
      }, function(err, admin) {
        if (err) {
          callback(err);
        }
        admin.setPassword('kabamadmin', callback);
      });
    },
    function(callback) {
      kabamMigrate.model.User.create({
        email: 'user1@monimus.com',
        username: 'user1',
        root: false,
        emailVerified: true,
        profileComplete: true
      }, function(err, user) {
        if (err) {
          callback(err);
        }
        user.setPassword('user1', callback);
      });
    },
    function(callback) {
      kabamMigrate.model.User.create({
        email: 'user2@monimus.com',
        username: 'user2',
        root: false,
        emailVerified: true,
        profileComplete: true
      }, function(err, user) {
        if (err) {
          callback(err);
        }
        user.setPassword('user2', callback);
      });
    },
    function(callback) {
      kabamMigrate.model.Group.create({
        name: 'Main Site',
        uri: '/',
        tier: 0,
        descriptionPublic: 'Main Group',
        descriptionForMembers: 'Main Group'
      }, function(err, group) {
        if (err) {
          callback(err);
        }
        callback(null, group);
      });
    }
  ], function(err, results) {
    if (err) {
      console.error(err);
    }
    console.log('Users kabamadmin, user1 and user2 added');
    console.log('World group added');
    next();
  });

};

exports.down = function(next) {
  async.parallel([
    function(callback) {
      kabamMigrate.model.User.findOneAndRemove({ username: 'kabamadmin' }, undefined, callback);
    },
    function(callback) {
      kabamMigrate.model.User.findOneAndRemove({ username: 'user1' }, undefined, callback);
    },
    function(callback) {
      kabamMigrate.model.User.findOneAndRemove({ username: 'user2' }, undefined, callback);
    },
    function(callback) {
      kabamMigrate.model.Group.findOneAndRemove({ name: 'Main Site' }, undefined, callback);
    }
  ], function(err, results) {
    if (err) {
      console.error(err);
    }
    console.log('initial user and group removed');
    next();
  });
};

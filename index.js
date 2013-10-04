var whoAmI = require(process.cwd()+'/package.json'),
  kabam = undefined;

if(whoAmI.name === 'kabam') {
  //this is demo application
  kabam = require('./../index.js');
} else {
  //this is applicationm created by kabamCli
  kabam = require('kabam');
}

var fs = require('fs'),
  path = require('path'),
  toml = require('toml');

var models = fs.readdirSync(__dirname+'/models'),
  routes = fs.readdirSync(__dirname+'/routes'),
  configFile = __dirname + '/config/config.toml';

function createConfig(configFile) {
  return toml.parse(fs.readFileSync(configFile));
}

var main = kabam(createConfig(configFile));

models.map(function(modelName) {
  var modelObj = require(__dirname+'/models/' + modelName);
  main.extendModel(modelObj.name, modelObj.initFunction);
});

routes.map(function(routeName) {
  //console.log(routeName);
  main.extendRoutes(require(__dirname+'/routes/'+routeName));
});

if(main.config.START_CLUSTER){
  main.startCluster();//to start application as cluster
} else {
  main.start();//to start single process
}

//realtime socket.io powered clock
if(main.config.IO.ENABLED){
  setInterval(function() {
    main.emit('broadcast', {
      'time': new Date().toLocaleTimeString()
    });
  }, 500);
}

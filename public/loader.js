//= require jquery/jquery.js
//= require lodash/dist/lodash.js
//= require vendor/bootstrap.js
//= require select2/select2.js
//= require angular/angular.js
//= require angular-resource/angular-resource.js
//= require angular-cookies/angular-cookies.js
//= require angular-sanitize/angular-sanitize.js
//= require angular-ui-router/release/angular-ui-router.js
//= require angular-bootstrap/ui-bootstrap-tpls.js
//= require angular-ui-select2/src/select2.js
//= require ng-grid/ng-grid-2.0.7.debug.js
//= require states/states.js
//= require auth/main.js

//= require group/main.js
//= require user/main.js
//= require course/main.js
//= require portfolio/main.js

//= require_self
//= require kabam/app.js
//= require kabam/controllers/index.js

(function(){
  'use strict';

  window.moduleDependencies = ['KabamGroup', 'KabamUser', 'Course', 'Portfolio'];

})();

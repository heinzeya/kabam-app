//= require jquery/jquery.js
//= require jquery-ui/ui/jquery-ui.js
//= require pines-notify/jquery.pnotify.js
//= require lodash/dist/lodash.js
//= require vendor/bootstrap.js
//= require select2/select2.js
//= require angular/angular.js
//= require angular-resource/angular-resource.js
//= require angular-cookies/angular-cookies.js
//= require angular-sanitize/angular-sanitize.js
//= require angular-ui-router/release/angular-ui-router.js
//= require angular-bootstrap/ui-bootstrap-tpls.js
//= require angular-ui-utils/modules/utils.js
//= require angular-ui-select2/src/select2.js
//= require angular-grid/ng-grid-2.0.7.debug.js
//= require angular-socket-io/socket.js
//= require fullcalendar/fullcalendar.js
//= require angular-ui-calendar/src/calendar.js
//= require restangular/dist/restangular.js
//= require angular-route/angular-route.js
//= require states/states.js
//= require auth/main.js

//= require dashboard/main.js
//= require course/main.js
//= require portfolio/main.js
//= require webrtc/main.js

//= require_self
//= require kabam/app.js

(function(){
  'use strict';

  window.moduleDependencies = [
    'Dashboard', 'Course',
    'Portfolio', 'webRtc'
  ];

})();

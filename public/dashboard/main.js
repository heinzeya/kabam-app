//= require_self
//= require ./services.js
//= require ./controllers.js
//= require ./states.js

angular.module('Dashboard.services', []);
angular.module('Dashboard.controllers', []);
angular.module('Dashboard.states', []);
angular.module('Dashboard', ['ui.calendar',
                             'ui.bootstrap',
                             'Dashboard.services',
                             'Dashboard.controllers',
                             'Dashboard.states'
                            ]);

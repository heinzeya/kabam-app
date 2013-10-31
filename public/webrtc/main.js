//= require_self
//= require ./lib/PeerConnection.js
//= require ./lib/notification.js
//= require_directory ./call/controllers/
//= require_directory ./call/services/

angular
  .module('kabam.webrtc', [
    'kabam.states',
    // 3rd party dependencies
    'btford.socket-io',
    'ui.bootstrap'
  ])
  .config([
    'kabamStatesProvider', 'socketProvider',
    function(kabamStatesProvider, socketProvider) {

      // TODO replace with the current running server basepath
      var kabamSocket = io.connect('http://localhost:3000');
      // do stuff with kabamSocket
      socketProvider.ioSocket(kabamSocket);

      kabamStatesProvider.push([{
        name: 'callMain',
        url: '/call',
        templateUrl: '/assets/webrtc/views/index.html'
      }, {
        name: 'callRoom',
        url: '/call/room/:id',
        templateUrl: '/assets/webrtc/views/room.html'
      }]);
    }
  ]);
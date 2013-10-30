//= require ./lib/PeerConnection.js
//= require ./lib/notification.js
//= require ./call/controllers/room.js
//= require ./call/controllers/user.js

var webRtcModule = angular.module('webRtc', [
  'kabam.states',
  // 3rd party dependencies
  'btford.socket-io'
]);

webRtcModule.factory('Room', function() {
  var activeRoom = null;

  return {
    setActiveRoom: function(roomId) {
      activeRoom = roomId;
    },
    getActiveRoom: function() {
      return activeRoom;
    }
  };
});

webRtcModule.config([
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
      templateUrl: '/assets/webrtc/views/room.html',
      controller: 'RoomController'
    }]);
  }
]);
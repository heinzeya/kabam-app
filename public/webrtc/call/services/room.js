(function() {

  'use strict';

  angular.module('kabam.webrtc').factory('Room', function() {
    
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
})();
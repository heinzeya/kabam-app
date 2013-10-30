function RoomController($rootScope, $scope, $http, socket, $window, Room) {
  $scope.room = {
    caller: $window.USER.username,
    callee: 'Callee',
    messages: [],
    newMessage: '',
    id: Room.getActiveRoom(),
    ready: false,
    statesShared: false
  };

  /*
   * Start peer connection after both the callee and caller sharing the states
   */
  $scope.startPeerConnection = function() {

    var peer = new PeerConnection({
      socketEvent: 'calling',
      userid: $scope.room.callee,
      roomId: $scope.room.id
    });

    peer.onStreamAdded = function(e) {

      var video = e.mediaElement;
      video.setAttribute('width', '100%');
      video.setAttribute('controls', true);

      if (e.type == 'local') {
        $('#local-video-container').replaceWith(video);
      } else {
        $('#remote-video-container').replaceWith(video);
      }

      video.play();
    };

    peer.onUserFound = function(userid) {
      peer.sendParticipationRequest(userid);
    };

    // Auto broadcasting
    (function startBroadcast() {
      if (peer.startBroadcasting) peer.startBroadcasting();
      else setTimeout(startBroadcast, 1000);
    })();

  }

  /*
   * Initiate the controller with ready state
   */

  $scope.init = function() {

    socket.emit('ready', {
      ready: true
    });
  }

  $scope.sendMessage = function() {
    socket.emit('send_new_chat_message', {
      content: $scope.room.newMessage
    });
    $scope.room.newMessage = '';
  }

  $scope.data = {
    callee: '',
    // TODO replace me with the real user contacts
    onlineContacts: [
      'caller1',
      'caller2'
    ]
  };

  $scope.call = function(username) {

    Room.setActiveRoom(+(new Date()).getTime() + '' +
      (Math.round(Math.random() * 9999999999) + 9999999999));

    $scope.room.id = Room.getActiveRoom();

    $http.get('/call/' + username + '/room/' + $scope.room.id)
      .success(function(data, status, headers, config) {
        window.open('/home#/call/room/' + $scope.room.id, '_self');
      })
      .error(function(data, status, headers, config) {
        console.log('data, status', data, status);
      });
  }

  $scope.$watch('room.callee', function() {

    if ($scope.room.callee !== 'Callee' && $scope.room.id !== null) {
      $scope.room.statesShared = true;

      socket.emit('share_states', {
        caller: $window.USER.username,
        roomId: $scope.room.id
      });
    }
  });

  socket.on('ready', function(data) {

    $scope.room.ready = data.ready;

    if ($scope.room.id !== null) {
      socket.emit('share_states', {
        caller: $window.USER.username,
        roomId: $scope.room.id
      });
    }

    $scope.$apply();
  });

  socket.on('send_new_chat_message', function(data) {
    $scope.room.messages.push(data);
    $scope.$apply();
  });

  socket.on('share_states_to_clients', function(data) {

    $scope.room.id = data.roomId;
    // set the local callee to caller username
    if ($window.USER.username != data.caller) $scope.room.callee = data.caller;

    $scope.$apply();

  });
};
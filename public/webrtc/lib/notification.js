if (typeof io !== 'undefined') {
  var socket = io.connect();
  socket.on('broadcast', function(data) {
    $('#clock').html(data.time);
  });
  socket.on('notify', function(data) {
    $.pnotify.defaults.history = false;
    $.pnotify({
      title: data.user.username + ' is calling',
      text: '<div id="call-action"><a class="btn btn-mini btn-success" target="_self" href="/call/room/' + data.message + '">Accept</a> <a href="#" class="btn btn-mini btn-danger">Reject</a></div>',
      icon: false,
      hide: false,
      sticker: false,
      closer: false,
      addclass: 'custom'
    });
  });
}
jQuery(function($){
  var socket = io.connect();
  var $setName = $('#setName');
  var $nameError = $('#nameError');
  var $nickBox = $('#nickname');
  var $colorBox = $('#colors');
  var $users = $('#users');
  var $messageForm = $('#send-message');
  var $messageBox = $('#message');
  var $chat = $('#chat');

  $('#chat').height($(window).height()-120);

  $(window).resize(function(){
    $("#chat").height($(document).height()-120);
  });

  $('#content').height($(window).height());

  $(window).resize(function(){
    $("#content").height($(document).height());
  });

  $setName.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $nickBox.val(), $colorBox.val(), function(data){
      if(data){
        $('#enterName').hide();
        $('#content').show();
        $('#users').show();
      } else{
        $nameError.html('That username is already taken!  Try again.');
      }
    });
    $nickBox.val('');
    $colorBox.val('');
  });

  socket.on('usernames', function(data){
    var names = '';
    var i;
    for(i=0; i < data.length; i++){
      names += data[i] + '<br/>'
    }
    $users.html(names);
  });

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', $messageBox.val(), function(data){
      $('#messages').append('<span style="color: red; font-weight: 600">' + data + ': </span><br>');
    });
    $messageBox.val('');
  });

  function displayMessages(data) {
    $('#messages').append($('<li>' + '<span style="color: ' + data.color + '; font-weight: 600">' + data.name + ': </span>' + data.msg + '</li>'));
  }

  socket.on('load old msgs', function(docs) {
    for(var i=docs.length-1; i >= 0; i--) {
          displayMessages(docs[i]);
    }
  });

  socket.on('new message', function(data){
    displayMessages(data);
  });

  socket.on('whisper', function(data) {
      $('#messages').append('<span style="color: grey; font-weight: 400; font-style: italic">' + data.name + ': </span>' + data.msg);
  });
});

jQuery(function($){
  var socket = io.connect();
  var $setName = $('#setName');
  var $nameError = $('#nameError');
  var $nickBox = $('#nickname');
  var $colorBox = $('#color');
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
      } else{
        $nameError.html('That username is already taken!  Try again.');
      }
    });
    $nickBox.val('');
    $colorBox.val('');
  });

  socket.on('usernames', function(data){
    var html = '';
    for(i=0; i < data.length; i++){
      html += data[i] + '<br/>'
    }
    $users.html(html);
  });

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  socket.on('new message', function(data){
    $('#messages').append($('<li>' + '<span style="color: ' + data.color + '; font-weight: 600">' + data.nick + ': </span>' + data.msg + '</li>'));
  });
});

jQuery(function($){
  var socket = io.connect();
  var $nickForm = $('#setNick');
  var $nickError = $('#nickError');
  var $nickBox = $('#nickname');
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

  $nickForm.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $nickBox.val(), function(data){
      if(data){
        $('#nickWrap').hide();
        $('#content').show();
      } else{
        $nickError.html('That username is already taken!  Try again.');
      }
    });
    $nickBox.val('');
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
    $('#messages').append($('<li>' + '<b>' + data.nick + ': </b>' + data.msg + '</li>'));
  });
});

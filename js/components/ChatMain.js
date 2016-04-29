import React from 'react';

var ChatMain = React.createClass({
	render: function() {
		return (
			  <div id="content">
			      <div id="chat">
			        <ul id="messages"></ul>
			      </div>
			    <div className="chatArea">
			      <form id="send-message" className="chatTime">  
			        <textarea id="message" placeholder="Send Message"></textarea>
			        <i className="fa fa-smile-o smile" aria-hidden="true"></i>
			        <div className="icons-margin">
			          <i className="fa fa-gear fa-2x gear" aria-hidden="true"></i>
			          <i className="fa fa-list-ul fa-2x list" aria-hidden="true"></i>
			          <button className="chatButton">Chat</button> 
			        </div>
			      </form>
			    </div>
			  </div>  
		);
	}
});

module.exports = ChatMain;
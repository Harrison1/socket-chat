import React from 'react';

import Signin from "./Signin";
import ChatMain from "./ChatMain";
import Users from "./Users";
import Main from '../../public/js/mainjs';

var ChatApp = React.createClass({
	render: function() {
		return (
			<div>
				<Signin />
				<ChatMain />
				<Users />
			</div>	  
		);
	}
});

module.exports = ChatApp;

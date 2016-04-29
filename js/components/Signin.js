import React from 'react';

var Signin = React.createClass({
	render: function() {
		return (
			  <div id="enterName">
			    <h3 className="margin-left: 120px;">Enter A Username and Choose a Color</h3>
			    <p id="nameError"></p>
			    <form id="setName" className="signup" >
			      <input id="nickname" />
			      <select name="cars" id="colors">
			          <option value="#6441a5">Purple</option>
			          <option value="#2196f3">Blue</option>
			          <option value="#f44336">Red</option>
			          <option value="#f50057">Pink</option>
			          <option value="#00e676">Green</option>
			          <option value="#607d8b">Grey</option>
			          <option value="#fb8c00">Orange</option>
			      </select>
			      <button className="signup-button">Submit</button>
			    </form>
			  </div>  
		);
	}
});

module.exports = Signin;

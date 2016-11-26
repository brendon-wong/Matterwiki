import React from 'react';
import Error from './error.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {error: ""};
  }
  handleSubmit(){
    console.log("Login initiated");
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    var myHeaders = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });


    var myInit = { method: 'POST',
               headers: myHeaders,
               body: "email="+email+"&password="+password
              };
    var that = this;
    fetch('/api/authenticate',myInit)
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(response) {
      if(response.error.error)
        that.setState({error: response.error.message})
      else
        alert("Logged In. Token Received.")
      console.log(response);
    });
  }

  render () {
    return(<div className="container login-box row">
      <div className="col-md-12 col-sm-12">
        <h3>Login</h3>
          <Error error={this.state.error} />
        <div className="col-sm-12">
          <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
        </div>
        <div className="col-sm-12">
          <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
        </div>
        <div className="col-sm-12">
          <button onClick={this.handleSubmit} className="btn btn-default btn-block btn-lg">Sign in</button>
        </div>
      </div>
    </div>);
  }
}

export default Login;
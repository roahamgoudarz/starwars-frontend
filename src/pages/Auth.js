import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}")
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            signUp(email: "${email}", password: "${password}")
          }
        `
      };
    }

    fetch('http://localhost/backend/index.php?action=auth', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {

        if (resData.data.login) {
          if(resData.data.login.length === 32){
            this.context.login(resData.data.login);
          }else{
            document.querySelector(".alert").style.opacity = "1";
            document.querySelector(".alert").innerText = resData.data.login;
            document.querySelector(".alert").classList.remove("alert-success");
            document.querySelector(".alert").classList.add("alert-danger");
          }
        }

        if (resData.data.signUp) {
          document.querySelector(".alert").style.opacity = "1";
          
          if(resData.data.signUp.length === 32){
            document.querySelector(".alert").innerHTML = `you are successfully registered. <br> <span class="blink_me">you are automatically redirecting to Movie information list</span>`;
            document.querySelector(".alert").classList.remove("alert-danger");
            document.querySelector(".alert").classList.add("alert-success");
            setTimeout(()=> this.context.login(resData.data.signUp), 5000);
          }else{
            document.querySelector(".alert").innerText = resData.data.signUp;
            document.querySelector(".alert").classList.remove("alert-success");
            document.querySelector(".alert").classList.add("alert-danger");
          }
        }

      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="alert alert-danger">test</div>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} required/>
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button className="btn small-btn" type="submit">Submit</button>
          <button  className="btn small-btn" type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import HomePage from './pages/Home';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';


class App extends Component {
  constructor(props){
    super(props);

      var savedToken = localStorage.getItem( 'token' ) || null;
  
      this.state = {
        token: savedToken
      };
  }
  
  
  state = {
    token: null
  };

  login = (token) => {
    this.setState({ token: token });

    //I only saving token to client's system for avoide any disturbance during the testing of the project, obviously it needs more security checklist to fulfill.
    localStorage.setItem( 'token', token );
  };

  logout = () => {
    localStorage.removeItem( 'token');
    this.setState({ token: null });
  };
  
  render() {
    return (
      <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            login: this.login,
            logout: this.logout
          }}
        >
          <MainNavigation />
          <main className="main-content">
            <Switch>
              {this.state.token && <Redirect from="/" to="/home" exact />}
              {this.state.token && (
                <Redirect from="/auth" to="/home" exact />
              )}
              {!this.state.token && (
                <Route path="/auth" component={AuthPage} />
              )}

              {this.state.token && (
                <Route path="/home" component={HomePage} />
              )}
              {!this.state.token && <Redirect to="/auth" exact />}
            </Switch>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
    );
  }
}

export default App;
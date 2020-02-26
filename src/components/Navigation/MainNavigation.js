import React from 'react';

import AuthContext from '../../context/auth-context';
import logo from '../../assets/img/Star_Wars_Logo.svg';

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header>
          <img className={logo} alt="S T A R  WAR"  src={logo} />

          {context.token && (
            <React.Fragment>
                <div className="navbar"><button onClick={context.logout} className="btn small-btn">Logout</button></div>
            </React.Fragment>
          )}
                    
      </header>
      );
    }}
  </AuthContext.Consumer>
);


export default mainNavigation;

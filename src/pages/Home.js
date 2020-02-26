import React, { Component } from 'react';

import {mostAppreadCharacter} from '../components/mostAppreadCharacter'
import {longestOpeningCrawl} from '../components/longestOpeningCrawl'
import {mostAppreadSpecies} from '../components/mostAppreadSpecies'
import {largestVehiclePilots} from '../components/largestVehiclePilots'

import './Home.css';

class HomePage extends Component {
  state = {
    isLogin: true,
    slideOpen: false,
    longestOpeningCrawl: null,
    slideToggleIsRun: false
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.fetchData = this.fetchData.bind(this);
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };
  
fetchData = async (i) => {

  let requestBody = {
    query: `
      query {
          ${i}(token: "test")
      }
    `
  };

  // if(i.parameters.length > 0){
  //   requestBody = {
  //     query: `
  //       query {
  //           ${i}(token: "test") {
  //             ${i.parameters}
  //           }
  //       }
  //     `
  //   };
  // }


    return new Promise((resolve, reject) => {
    fetch(`http://localhost/starwars-backend/index.php?action=${i}`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resData => {

      resolve(resData.json());

    })
    .catch(err => {
      reject(err);
    });
  });
};


  getData = () => {
    
    let container = document.querySelector('#starwar-information');
    if(container.style.height === "auto"){
      container.style.height = container.offsetHeight;
    }else{

      if(this.state.slideOpen === false) {
        this.fetchData(`longestOpeningCrawl`).then(
          function (r){ 
            longestOpeningCrawl.callback(r);
          }
        );

        this.fetchData(`mostAppreadCharacter`).then(
          function (r){ 
            mostAppreadCharacter.callback(r);
          }
        );
        
        this.fetchData(`mostAppreadSpecies`).then(
          function (r){ 
            mostAppreadSpecies.callback(r);
          }
        );
        
        this.fetchData(`largestVehiclePilots`).then(
          function (r){ 
            largestVehiclePilots.callback(r);
          }
        );
      }
    }

      this.slideToggle();

}



  slideToggle() {
    var mdiv = document.querySelector('#starwar-information');

    window.clearInterval(this.state.intval);
    if(this.state.slideOpen) {
      this.setState({slideOpen: false})
      mdiv.style.maxHeight = 0;

    }
    else {
      this.setState({slideOpen: true})
      mdiv.style.maxHeight = 'none';
    }

  }



  

  render() {
    return (
<React.Fragment>
        <div><button className="btn lg-btn" id="getData" onClick={() => { this.getData();}}><span>★</span> Do. Or do not. There is no try. <span>★</span></button></div>


    <section id="starwar-information">
        <div id="data">
            <section>
                <h2>Which of all StarWars movies has longest opening crawl?</h2>
                <ul>
                    <li id="longestOpeningCrawl"></li>
                </ul>
            </section>

            <section>
                <h2>What character (person) appeared in the most of StarWars films?</h2>
                <ul>
                    <li id="mostAppreadCharacter"></li>
                </ul>
            </section>

            <section>
                <h2>What species appeared in the most number of StarWars films?</h2>
                <ul id="mostAppreadSpecies"></ul>
            </section>

            <section>
                <h2>What planet in Star Wars universe provided largest number of vehicle pilots?</h2>
                <ul id="largestVehiclePilots"></ul>
            </section>


        </div>
    </section>
        </React.Fragment>
    );
  }
}

export default HomePage;

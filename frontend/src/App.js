import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'

import './App.css';
import MainNavbar from "./common/MainNavbar";
import HomeRoot from "./home/HomeRoot"
import PacketBuilderRoot from "./packetBuilder/PacketBuilderRoot"

class App extends Component {
  render() {
    return (
      <div>
          <HashRouter>
              <div>
                <MainNavbar/>
                  <div>
                    <Route exact path="/" component={HomeRoot}/>
                    <Route path="/packetBuilder" component={PacketBuilderRoot}/>
                  </div>
              </div>
          </HashRouter>
      </div>
    );
  }
}

export default App;

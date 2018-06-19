import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';
import MainNavbar from "./common/MainNavbar";
import HomeRoot from "./home/HomeRoot"
import PacketBuilderRoot from "./packetBuilder/PacketBuilderRoot"

class App extends Component {
  render() {
    return (
      <div>
          <BrowserRouter>
              <div>
                <MainNavbar/>
                  <div>
                    <Route exact path="/" component={HomeRoot}/>
                    <Route path="/packetBuilder" component={PacketBuilderRoot}/>
                  </div>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import MainNavbar from "./common/MainNavbar";
import HomeRoot from "./home/HomeRoot"
import PacketBuilderRoot from "./packetBuilder/PacketBuilderRoot"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.loadCurrentUser = this.loadCurrentUser.bind(this)
    }

    loadCurrentUser() {
        this.setState({ isLoading: true });
    }

  render() {
    return (
      <div>
          <MainNavbar/>
          <Switch>
              <Route exact path="/" render={(props) => <HomeRoot/>}/>
              <Route path="/packetBuilder" render={(props) => <PacketBuilderRoot/>}/>
          </Switch>
      </div>
    );
  }
}

export default App;

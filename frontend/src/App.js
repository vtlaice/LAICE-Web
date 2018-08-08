import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Spinner from 'react-spinkit'
import Moment from 'moment'
import BigCalendar from 'react-big-calendar'
import momentLocalizer from 'react-widgets-moment'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import './App.css';
import SecureRoute from "./common/SecureRoute"
import API from "./common/API"
import MainNavbar from "./common/MainNavbar";
import HomeRoot from "./home/HomeRoot"
import PacketBuilderRoot from "./packetBuilder/PacketBuilderRoot"
import ScheduleViewerRoot from "./scheduleViewer/ScheduleViewerRoot"

Moment.locale('en');

BigCalendar.momentLocalizer(Moment);
momentLocalizer();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    loadCurrentUser(reloadingFromUserDetailsChangeResponse = null) {
        this.setState({ isLoading: true });
        API.getCurrentUser().then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoading: false
            });

            if (reloadingFromUserDetailsChangeResponse) {
                NotificationManager.success(reloadingFromUserDetailsChangeResponse.message, "User settings")
            }
        }).catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
        });
    }

    componentWillMount() {
        this.loadCurrentUser()
    }

    handleLogout() {
        localStorage.removeItem("accessToken");

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        NotificationManager.info("Logged out successfully", "Authentication");

        this.props.history.push("/");
    }

    handleLogin() {
        this.loadCurrentUser();
        this.props.history.push("/");
    }

  render() {
        if (this.state.isLoading) return (
            <div className="loadingSpinner">
                <Spinner name="ball-spin-fade-loader" fadeIn="none"/>
            </div>
        );
    return (
      <div>
          <MainNavbar
              reloadUser={this.loadCurrentUser}
              isAuthenticated={this.state.isAuthenticated}
              currentUser={this.state.currentUser}
              onLogin={this.handleLogin}
              onLogout={this.handleLogout}
          />
          <Switch>
              <Route exact path="/" render={(props) => <HomeRoot isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}/>}/>
              <SecureRoute
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  role="ROLE_SCHEDULE_PACKET"
                  path="/packetBuilder/:id?"
                  render={(props) => <PacketBuilderRoot isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} updateId={props.match.params.id}/>}
              />
              <SecureRoute
                  isAuthenticated={this.state.isAuthenticated}
                  currentUser={this.state.currentUser}
                  role="ROLE_VIEW_SCHEDULE"
                  path="/scheduleViewer"
                  render={(props) => <ScheduleViewerRoot isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser}/>}
              />
          </Switch>
          <NotificationContainer/>
      </div>
    );
  }
}

export default withRouter(App);

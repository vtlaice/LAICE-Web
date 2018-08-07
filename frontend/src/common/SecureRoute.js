import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class SecureRoute extends Component {
    constructor(props) {
        super(props);

        this.isAuthenticated = this.isAuthenticated.bind(this)
    }

    isAuthenticated() {
        if (this.props.isAuthenticated) {
            if (this.props.role) {
                return !!this.props.currentUser.roles.includes(this.props.role);
            } else {
                return true
            }
        } else {
            return false
        }
    }

    render() {
        if (this.isAuthenticated()) {
            return <Route {...this.props}/>
        }
        return null;
    }
}

export default SecureRoute
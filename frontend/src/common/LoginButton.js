import React, { Component } from 'react'
import { Button, Popover, PopoverBody, Form, Input, FormGroup, Alert, Container, Row, Col } from 'reactstrap'
import Spinner from 'react-spinkit'
import API from './API'

class LoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            popoverOpen: false,
            email: "",
            password: "",
            showAlert: false,
            alertText: ""
        };

        this.togglePopover = this.togglePopover.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    togglePopover() {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            email: "",
            password: "",
            showAlert: false,
            alertText: ""
        });
    }

    handleEmailChange(event) {
        this.setState({
            showAlert: false,
            alertText: "",
            email: event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            showAlert: false,
            alertText: "",
            password: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});
        const request = {
            email: this.state.email,
            password: this.state.password
        };

        API.login(request).then(response => {
            this.setState({isLoading: false});
            localStorage.setItem('accessToken', response.accessToken);
            console.log(localStorage.getItem('accessToken'));
            this.props.onLogin() //Calls up to main app handleLogin
        }).catch(error => {
            this.setState({isLoading: false});
            console.log(error);
            if (error.status === 401) { //Request is unauthorized
                this.setState({
                    email: "",
                    password: "",
                    showAlert: true,
                    alertText: "Invalid Email or Password."
                });
            } else {
                this.setState({
                    showAlert: true,
                    alertText: "Unknown error.  Please try again later."
                });
            }
        });
    }

    render() {
        return (
            <div>
                <Button id="loginPopover" color="primary" onClick={this.togglePopover}>Login</Button>
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="loginPopover" toggle={this.togglePopover}>
                    <PopoverBody>
                        <Form>
                            {this.state.showAlert && <Alert color="danger">{this.state.alertText}</Alert>}
                            <FormGroup><Input type="email" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleEmailChange}/></FormGroup>
                            <FormGroup><Input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/></FormGroup>
                            <div className="d-flex">
                                <Button type="submit" color="success" onClick={this.handleSubmit}>Submit</Button>

                                {this.state.isLoading && <Spinner className="d-flex ml-auto" name="circle" fadeIn="none"/>}
                            </div>
                        </Form>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default LoginButton
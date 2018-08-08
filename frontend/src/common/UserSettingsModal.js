import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap'
import { NotificationManager } from 'react-notifications'

import API from './API'

class UserSettingsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: props.visible || false,

            oldPassword: "",
            newPassword: "",

            firstName: props.currentUser.firstName,
            lastName: props.currentUser.lastName
        };

        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.onUpdateOldPassword = this.onUpdateOldPassword.bind(this);
        this.onUpdateNewPassword = this.onUpdateNewPassword.bind(this);
        this.onUpdateFirstName = this.onUpdateFirstName.bind(this);
        this.onUpdateLastName = this.onUpdateLastName.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitDetails = this.onSubmitDetails.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.visible !== this.state.visible) {
            this.setState({
                visible: props.visible
            })
        }
    }

    toggle() {
        const newState = !this.state.visible;

        if (!newState) {
            this.setState({
                oldPassword: "",
                newPassword: "",

                firstName: this.props.currentUser.firstName,
                lastName: this.props.currentUser.lastName
            })
        }
        this.setState({
            visible: newState
        });

        if (this.props.onToggle) {
            this.props.onToggle(newState)
        }
    }

    close() {
        this.setState({
            visible: false
        });

        if (this.props.onToggle) {
            this.props.onToggle(false)
        }
    }

    onUpdateOldPassword(event) {
        if (event.target) {
            this.setState({
                oldPassword: event.target.value
            })
        }
    }

    onUpdateNewPassword(event) {
        if (event.target) {
            this.setState({
                newPassword: event.target.value
            })
        }
    }

    onUpdateFirstName(event) {
        if (event.target) {
            this.setState({
                firstName: event.target.value
            })
        }
    }

    onUpdateLastName(event) {
        if (event.target) {
            this.setState({
                lastName: event.target.value
            })
        }
    }

    onSubmitPassword() {
        API.updatePassword(this.state.oldPassword, this.state.newPassword).then((response) => {
            NotificationManager.success(response.message, "User Settings");
            if (this.props.reloadUser) {
                this.props.reloadUser();
            }

            this.close()
        }).catch((error) => {
            console.log(error);
            NotificationManager.error(error.message, "User Settings")
        });
    }

    onSubmitDetails() {
        API.updateUserDetails({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        }).then((response) => {
            if (this.props.reloadUser) {
                this.props.reloadUser(response);
            }

            this.close()
        }).catch((error) => {
            console.log(error);
            NotificationManager.error(error.message, "User Settings")
        })
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.visible} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        User Settings
                    </ModalHeader>

                    <ModalBody>
                        <Form>
                            <h5>Change Password</h5>
                            <FormGroup>
                                <Input type="password" placeholder="Old password" value={this.state.oldPassword} onChange={this.onUpdateOldPassword}/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" placeholder="New password" value={this.state.newPassword} onChange={this.onUpdateNewPassword}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={this.onSubmitPassword}>Submit</Button>
                            </FormGroup>
                        </Form>
                        <hr/>
                        <Form>
                            <h5>Change User Details</h5>
                            <FormGroup inline>
                                <Label>First Name</Label>
                                <Input type="text" value={this.state.firstName} onChange={this.onUpdateFirstName}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Last Name</Label>
                                <Input type="text" value={this.state.lastName} onChange={this.onUpdateLastName}/>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" onClick={this.onSubmitDetails}>Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.close}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default UserSettingsModal
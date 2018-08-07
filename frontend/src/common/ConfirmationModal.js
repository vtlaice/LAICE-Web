import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'

class ConfirmationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggle = this.toggle.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.visible !== this.state.visible) {
            this.setState({
                visible: props.visible
            });
        }
    }

    toggle() {
        this.setState({
            visible: !this.state.visible
        })
    }

    show() {
        this.setState({
            visible: true
        });
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Modal isOpen={this.state.visible}>
                <ModalHeader>
                    {this.props.title}
                </ModalHeader>
                <ModalBody>
                    {this.props.message}
                </ModalBody>
                <ModalFooter>
                    {this.props.children}
                    <Button color="secondary" onClick={this.hide}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ConfirmationModal
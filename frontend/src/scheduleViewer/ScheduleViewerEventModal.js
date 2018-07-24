import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Alert } from 'reactstrap'
import LiibMode from '../common/LiibMode'

class ScheduleViewerEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: true
        };

        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        const newState = !this.state.modalOpen;
        this.setState({
            modalOpen: newState
        });

        this.props.onToggleModal(newState);
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.packet.name}</ModalHeader>
                    <ModalBody>
                        {this.props.packet.exported &&
                        <Alert color="primary">This packet has been exported</Alert>
                        }
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <th scope="row">Op Mode</th>
                                    <td>{LiibMode.opModeString(this.props.packet.opMode)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Start Time</th>
                                    <td>{this.props.packet.startTime}</td>
                                </tr>
                                <tr>
                                    <th scope="row">End Time</th>
                                    <td>{this.props.packet.endTime}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Created By</th>
                                    <td>{this.props.packet.createdBy} (at {this.props.packet.createdAt})</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last Updated By</th>
                                    <td>{this.props.packet.lastModifiedBy} (at {this.props.packet.lastModifiedAt})</td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger">Delete</Button>{' '}
                        <Button color="primary">Edit</Button>{' '}
                        <Button color="primary">Export to CSV</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ScheduleViewerEventModal
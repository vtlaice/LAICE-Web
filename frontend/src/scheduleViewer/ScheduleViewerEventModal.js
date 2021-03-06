import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import Spinner from 'react-spinkit'
import fileDownload from 'js-file-download'
import LiibMode from '../common/LiibMode'
import ConfirmationModal from '../common/ConfirmationModal'
import API from '../common/API'

class ScheduleViewerEventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: true,
            deleteConfirmationModalOpen: false,
            loadingDownload: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.deletePacket = this.deletePacket.bind(this);
        this.editPacket = this.editPacket.bind(this);
        this.downloadPacket = this.downloadPacket.bind(this);
    }

    toggleModal() {
        const newState = !this.state.modalOpen;
        this.setState({
            modalOpen: newState
        });

        this.props.onToggleModal(newState);
    }

    openDeleteModal() {
        this.setState({
            deleteConfirmationModalOpen: true
        });
    }

    deletePacket() {
        API.deletePacket(this.props.packet.id).then(() => {
            this.setState({
                deleteConfirmationModalOpen: false,
                modalOpen: false
            });
            NotificationManager.success("Packet deleted successfully", "Schedule Viewer");
            this.props.refreshCalendar();
        }).catch((error) => {
            console.log(error);
            NotificationManager.error("Unable to delete packet " + this.props.packet.id, "Schedule Viewer");
        })
    }

    editPacket() {
        this.props.history.push("/packetBuilder/" + this.props.packet.id);
    }

    downloadPacket() {
        this.setState({
            loadingDownload: true
        });
        API.exportPacket(this.props.packet.id).then((response) => {
            fileDownload(response.csv, response.filename);
            this.setState({
                loadingDownload: false,
                modalOpen: false
            });
            this.props.refreshCalendar()
        }).catch((error) => {
            NotificationManager.error("Error fetching packet for download", "Schedule Viewer");
            console.log(error);
            this.setState({
                loadingDownload: false
            })
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.packet.name}</ModalHeader>
                    <ModalBody>
                        {!this.props.packet.writable &&
                        <Alert color="warning">This packet has already elapsed and is now view only</Alert>
                        }
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
                        {this.state.loadingDownload && <Spinner className="d-flex mr-auto" name="circle" fadeIn="none"/>}

                        {this.props.isAuthenticated && this.props.currentUser.roles.includes("ROLE_SCHEDULE_PACKET") &&
                            <div>
                                <Button disabled={this.state.loadingDownload || !this.props.packet.writable} color="danger" onClick={this.openDeleteModal}>Delete</Button>{' '}
                                <Button disabled={this.state.loadingDownload || !this.props.packet.writable} color="primary" onClick={this.editPacket}>Edit</Button>{' '}
                            </div>
                        }
                        {this.props.isAuthenticated && this.props.currentUser.roles.includes("ROLE_EXPORT_PACKET") &&
                            <div>
                                <Button disabled={this.state.loadingDownload} color="primary" onClick={this.downloadPacket}>Export to CSV</Button>{' '}
                            </div>
                        }
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>

                <ConfirmationModal
                    visible={this.state.deleteConfirmationModalOpen}
                    title="Are you sure?"
                    message="Are you sure you want to delete this packet?  This operation cannot be undone!"
                >
                    <Button color="danger" onClick={this.deletePacket}>Delete</Button>
                </ConfirmationModal>
            </div>
        );
    }
}

export default withRouter(ScheduleViewerEventModal)
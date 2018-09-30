import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button, Container, Row, Col, Alert } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import LiibMode from '../common/LiibMode'
import PacketBuilderLIIBSelector from './PacketBuilderLIIBSelector'
import PacketBuilderRPAModeSelector from './PacketBuilderRPAModeSelector'
import PacketBuilderLINASModeSelector from './PacketBuilderLINASModeSelector'
import PacketBuilderSNeuPIModeSelector from './PacketBuilderSNeuPIModeSelector'
import PacketBuilderScheduler from './PacketBuilderScheduler'
import API from '../common/API'

class PacketBuilderRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liibMode: props.liibMode || LiibMode.NONE,
            rpa: props.rpa || false,
            linas: props.linas || false,
            sneupi: props.rpa || false,
            rg2ModeRpa: props.rg2ModeRpa || null,
            sweepModeRpa: props.sweepModeRpa || null,
            dutyCycleLinas: props.dutyCycleLinas || null,
            filamentSelectLinas: props.filamentSelectLinas || null,
            collectorGainStateLinas: props.collectorGainStateLinas | null,
            dutyCycleSneupi: props.dutyCycleSneupi || null,
            emissionModeSneupi: props.emissionModeSneupi || null,

            startDate: props.startDate || null,
            endDate: props.endDate || null,

            calendarPage: props.calendarPage || false,
            packetErrors: [],
            scheduleErrors: []
        };

        this.updateLiibMode = this.updateLiibMode.bind(this);
        this.updateRpa = this.updateRpa.bind(this);
        this.updateRg2ModeRpa = this.updateRg2ModeRpa.bind(this);
        this.updateSweepModeRpa = this.updateSweepModeRpa.bind(this);
        this.updateLinas = this.updateLinas.bind(this);
        this.updateDutyCycleLinas = this.updateDutyCycleLinas.bind(this);
        this.updateFilamentSelectlinas = this.updateFilamentSelectlinas.bind(this);
        this.updateCollectorGainStateLinas = this.updateCollectorGainStateLinas.bind(this);
        this.updateSneupi = this.updateSneupi.bind(this);
        this.updateDutyCycleSneupi = this.updateDutyCycleSneupi.bind(this);
        this.updateEmissionModeSneupi = this.updateEmissionModeSneupi.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.onScheduleButton = this.onScheduleButton.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.identifyPacketErrors = this.identifyPacketErrors.bind(this);
        this.identifyScheduleErrors = this.identifyScheduleErrors.bind(this);

        //Populate initial packet starting date (this will get overwritten if we have an update id)
        API.getNewPacketStartTime().then((response)=> {
            this.setState({
                startDate: new Date(response.time),
                endDate: new Date(response.time)
            })
        }).catch((error) => {
            console.log(error)
        });

        //Check if we have an update id, if so, get the packet object from the server and populate the ui
        if (props.updateId) {
            API.getPacket(props.updateId).then((response) => {
                this.setState({
                    liibMode: response.schedulePacket.liibMode,
                    rpa: response.schedulePacket.rpa,
                    linas: response.schedulePacket.linas,
                    sneupi: response.schedulePacket.sneupi,
                    rg2ModeRpa: response.schedulePacket.rg2ModeRpa,
                    sweepModeRpa: response.schedulePacket.sweepModeRpa,
                    dutyCycleLinas: response.schedulePacket.dutyCycleLinas,
                    filamentSelectLinas: response.schedulePacket.filamentSelectLinas,
                    collectorGainStateLinas: response.schedulePacket.collectorGainStateLinas,
                    dutyCycleSneupi: response.schedulePacket.dutyCycleSneupi,
                    emissionModeSneupi: response.schedulePacket.emissionModeSneupi,

                    startDate: new Date(response.startTime),
                    endDate: new Date(response.endTime)
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    updateLiibMode(mode) {
        this.setState({liibMode: mode});
    }

    updateRpa(value) {
        this.setState({rpa: value});
    }

    updateRg2ModeRpa(selected) {
        this.setState({rg2ModeRpa: selected})
    }

    updateSweepModeRpa(selected) {
        this.setState({sweepModeRpa: selected})
    }

    updateLinas(value) {
        this.setState({linas: value});
    }

    updateDutyCycleLinas(selected) {
        this.setState({dutyCycleLinas: selected});
    }

    updateFilamentSelectlinas(selected) {
        this.setState({filamentSelectLinas: selected});
    }

    updateCollectorGainStateLinas(selected) {
        this.setState({collectorGainStateLinas: selected});
    }

    updateSneupi(value) {
        this.setState({sneupi: value});
    }

    updateDutyCycleSneupi(selected) {
        this.setState({dutyCycleSneupi: selected});
    }

    updateEmissionModeSneupi(selected) {
        this.setState({emissionModeSneupi: selected});
    }

    updateStartDate(date) {
        this.setState({startDate: date});
    }

    updateEndDate(date) {
        this.setState({endDate: date});
    }


    onScheduleButton() {
        if (this.identifyPacketErrors()) {
            this.setState({calendarPage: true});
        }
    }

    onBackButton() {
        this.setState({calendarPage: false});
    }

    identifyPacketErrors() {
        const errors = [];
        if (!this.state.liibMode) errors.push("liibMode");

        if (this.state.liibMode === LiibMode.NORMAL_MODE) {
            if (this.state.rpa) {
                if (!this.state.rg2ModeRpa) errors.push("rg2ModeRpa");
                if (!this.state.sweepModeRpa) errors.push("sweepModeRpa");
            }
            if (this.state.linas) {
                if (!this.state.dutyCycleLinas) errors.push("dutyCycleLinas");
                if (!this.state.filamentSelectLinas) errors.push("filamentSelectLinas");
                if (!this.state.collectorGainStateLinas) errors.push("collectorGainStateLinas");
            }
            if (this.state.sneupi) {
                if (!this.state.dutyCycleSneupi) errors.push("dutyCycleSneupi");
                if (!this.state.emissionModeSneupi) errors.push("emissionModeSneupi");
            }
        }

        this.setState({
            packetErrors: errors
        });

        return errors.length === 0;
    }

    identifyScheduleErrors() {
        const errors = [];

        if (!this.state.startDate) errors.push("startDate");
        if (!this.state.endDate) errors.push("endDate");

        if (this.state.startDate && this.state.endDate) {
            if (this.state.endDate <= this.state.startDate) errors.push("endDate")
        }

        this.setState({
            scheduleErrors: errors
        });

        return errors.length === 0;
    }

    onSubmit() {
        if (this.identifyScheduleErrors()) {
            if (this.props.updateId) {
                API.updatePacket(
                    this.state.startDate,
                    this.state.endDate,
                    {
                        liibMode: this.state.liibMode,
                        rpa: this.state.rpa,
                        linas: this.state.linas,
                        sneupi: this.state.sneupi,
                        rg2ModeRpa: this.state.rg2ModeRpa,
                        sweepModeRpa: this.state.sweepModeRpa,
                        dutyCycleLinas: this.state.dutyCycleLinas,
                        filamentSelectLinas: this.state.filamentSelectLinas,
                        collectorGainStateLinas: this.state.collectorGainStateLinas,
                        dutyCycleSneupi: this.state.dutyCycleSneupi,
                        emissionModeSneupi: this.state.emissionModeSneupi
                    },
                    this.props.updateId
                ).then((response) => {
                    NotificationManager.success(response.message, "Packet Builder");
                    this.props.history.push("/");
                    this.props.history.push("/packetBuilder");
                }).catch((error) => {
                    NotificationManager.error(error.message, "Packet Builder");
                    console.log(error);
                })
            } else {
                API.schedulePacket(
                    this.state.startDate,
                    this.state.endDate,
                    {
                        liibMode: this.state.liibMode,
                        rpa: this.state.rpa,
                        linas: this.state.linas,
                        sneupi: this.state.sneupi,
                        rg2ModeRpa: this.state.rg2ModeRpa,
                        sweepModeRpa: this.state.sweepModeRpa,
                        dutyCycleLinas: this.state.dutyCycleLinas,
                        filamentSelectLinas: this.state.filamentSelectLinas,
                        collectorGainStateLinas: this.state.collectorGainStateLinas,
                        dutyCycleSneupi: this.state.dutyCycleSneupi,
                        emissionModeSneupi: this.state.emissionModeSneupi
                    }
                ).then((response) => {
                    NotificationManager.success(response.message, "Packet Builder");
                    this.props.history.push("/");
                    this.props.history.push("/packetBuilder"); //Reload the component
                }).catch((error) => {
                    NotificationManager.error(error.message, "Packet Builder");
                    console.log(error)
                });
            }
        }
    }

    render() {
        return (
            <div className="pt-4 d-flex justify-content-center">
                <Fade in>
                    <Card>
                        <CardHeader>
                            <CardTitle>Packet Builder</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {!this.state.calendarPage &&
                                <Fade in>
                                    <PacketBuilderLIIBSelector updateLiibMode={this.updateLiibMode} selected={this.state.liibMode} errors={this.state.packetErrors}/>
                                    {this.state.liibMode === LiibMode.NORMAL_MODE &&
                                        <Fade in>
                                            <div className="d-flex">
                                                <PacketBuilderRPAModeSelector
                                                    active={this.state.rpa}
                                                    rg2Mode={this.state.rg2ModeRpa}
                                                    sweepMode={this.state.sweepModeRpa}
                                                    onActive={this.updateRpa}
                                                    onRg2Mode={this.updateRg2ModeRpa}
                                                    onSweepMode={this.updateSweepModeRpa}
                                                    errors={this.state.packetErrors}
                                                />
                                                <PacketBuilderLINASModeSelector
                                                    active={this.state.linas}
                                                    dutyCycle={this.state.dutyCycleLinas}
                                                    filamentSelect={this.state.filamentSelectLinas}
                                                    collectorGainState={this.state.collectorGainStateLinas}
                                                    onActive={this.updateLinas}
                                                    onDutyCycle={this.updateDutyCycleLinas}
                                                    onFilamentSelect={this.updateFilamentSelectlinas}
                                                    onCollectorGainState={this.updateCollectorGainStateLinas}
                                                    errors={this.state.packetErrors}
                                                />
                                                <PacketBuilderSNeuPIModeSelector
                                                    active={this.state.sneupi}
                                                    dutyCycle={this.state.dutyCycleSneupi}
                                                    emissionMode={this.state.emissionModeSneupi}
                                                    onActive={this.updateSneupi}
                                                    onDutyCycle={this.updateDutyCycleSneupi}
                                                    onEmissionMode={this.updateEmissionModeSneupi}
                                                    errors={this.state.packetErrors}
                                                />
                                            </div>
                                        </Fade>
                                    }
                                    <div className="pt-5">
                                        {this.state.packetErrors.length !== 0 && <Alert color="danger">Please correct all errors before submitting</Alert>}
                                        {this.state.liibMode !== LiibMode.NONE && <div className="text-right"><Button color="success" onClick={this.onScheduleButton}>Schedule Packet</Button></div>}
                                    </div>
                                </Fade>
                            }

                            {this.state.calendarPage &&
                                <Fade in>
                                    <PacketBuilderScheduler
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onStartDate={this.updateStartDate}
                                        onEndDate={this.updateEndDate}
                                        errors={this.state.scheduleErrors}
                                    />
                                    <div className="d-flex flex-fill pt-3">
                                        <div className="p-2"><Button color="danger" onClick={this.onBackButton}>Back</Button></div>
                                        <div className="ml-auto p-2"><Button color="success" onClick={this.onSubmit}>Submit</Button></div>
                                    </div>
                                </Fade>
                            }

                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default withRouter(PacketBuilderRoot);
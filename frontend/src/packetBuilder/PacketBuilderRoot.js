import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button, Container, Row, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'
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

            calendarPage: props.calendarPage || false
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
        this.setState({calendarPage: true});
    }

    onBackButton() {
        this.setState({calendarPage: false});
    }

    onSubmit() {
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
        ).then(() => {
            this.props.history.push("/scheduleViewer")
        }).catch((error) => {
            console.log(error)
        });
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
                                    <PacketBuilderLIIBSelector updateLiibMode={this.updateLiibMode} selected={this.state.liibMode}/>
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
                                                />
                                                <PacketBuilderSNeuPIModeSelector
                                                    active={this.state.sneupi}
                                                    dutyCycle={this.state.dutyCycleSneupi}
                                                    emissionMode={this.state.emissionModeSneupi}
                                                    onActive={this.updateSneupi}
                                                    onDutyCycle={this.updateDutyCycleSneupi}
                                                    onEmissionMode={this.updateEmissionModeSneupi}
                                                />
                                            </div>
                                        </Fade>
                                    }
                                    {this.state.liibMode !== LiibMode.NONE && <div className="pt-5 text-right"><Button color="success" onClick={this.onScheduleButton}>Schedule Packet</Button></div>}
                                </Fade>
                            }

                            {this.state.calendarPage &&
                                <Fade in>
                                    <PacketBuilderScheduler
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        onStartDate={this.updateStartDate}
                                        onEndDate={this.updateEndDate}
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

export default withRouter(PacketBuilderRoot)
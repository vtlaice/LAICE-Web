import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button, Container, Row, Col } from 'reactstrap'
import LiibMode from '../common/LiibMode'
import PacketBuilderLIIBSelector from './PacketBuilderLIIBSelector'
import PacketBuilderRPAModeSelector from './PacketBuilderRPAModeSelector'
import PacketBuilderLINASModeSelector from './PacketBuilderLINASModeSelector'
import PacketBuilderSNeuPIModeSelector from './PacketBuilderSNeuPIModeSelector'

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
            emissionModeSneupi: props.emissionModeSneupi || null
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

    render() {
        return (
            <div className="pt-4 d-flex justify-content-center">
                <Fade in>
                    <Card>
                        <CardHeader>
                            <CardTitle>Packet Builder</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <PacketBuilderLIIBSelector updateLiibMode={this.updateLiibMode} selected={this.state.liibMode}/>
                            {this.state.liibMode === LiibMode.NORMAL &&
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
                            }

                            {this.state.liibMode !== LiibMode.NONE && <div className="pt-5 text-right"><Button color="success">Schedule Packet</Button></div>}
                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default PacketBuilderRoot
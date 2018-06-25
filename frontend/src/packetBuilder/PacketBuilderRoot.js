import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button } from 'reactstrap'
import LiibMode from '../common/LiibMode'
import PacketBuilderLIIBSelector from './PacketBuilderLIIBSelector'
import PacketBuilderRPAModeSelector from './PacketBuilderRPAModeSelector'

class PacketBuilderRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liibMode: props.liibMode || LiibMode.NONE,
            rpa: props.rpa || false,
            sneupi: props.rpa || false,
            linas: props.linas || false,
            rg2ModeRpa: props.rg2ModeRpa || null,
            sweepModeRpa: props.sweepModeRpa || null
        };

        this.updateLiibMode = this.updateLiibMode.bind(this);
        this.updateRpa = this.updateRpa.bind(this);
        this.updateRg2ModeRpa = this.updateRg2ModeRpa.bind(this);
        this.updateSweepModeRpa = this.updateSweepModeRpa.bind(this);
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
                            <PacketBuilderRPAModeSelector
                            active={this.state.rpa}
                            rg2Mode={this.state.rg2ModeRpa}
                            sweepMode={this.state.sweepModeRpa}
                            onActive={this.updateRpa}
                            onRg2Mode={this.updateRg2ModeRpa}
                            onSweepMode={this.updateSweepModeRpa}
                            />
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
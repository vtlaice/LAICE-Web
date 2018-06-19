import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button } from 'reactstrap'
import LiibMode from '../common/LiibMode'
import OpMode from '../common/OpMode'
import PacketBuilderLIIBSelector from './PacketBuilderLIIBSelector'
import PacketBuilderOpModeSelector from './PacketBuilderOpModeSelector'

class PacketBuilderRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liibMode: LiibMode.NONE,
            opMode: OpMode.NONE
        };

        this.updateLiibMode = this.updateLiibMode.bind(this);
        this.updateOpMode = this.updateOpMode.bind(this);
    }

    updateLiibMode(mode) {
        this.setState({liibMode: mode});
    }

    updateOpMode(mode) {
        this.setState({opMode: mode});
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
                            <PacketBuilderLIIBSelector updateLiibMode={this.updateLiibMode}/>
                            {this.state.liibMode === LiibMode.NORMAL && <PacketBuilderOpModeSelector updateOpMode={this.updateOpMode}/>}

                            {this.state.opMode !== OpMode.NONE && <div className="pt-5 text-right"><Button color="success">Schedule Packet</Button></div>}
                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default PacketBuilderRoot
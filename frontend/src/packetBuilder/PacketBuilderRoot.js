import React, { Component } from 'react'
import { Fade, Card, CardBody, CardHeader, CardTitle, CardText, ButtonGroup, Button } from 'reactstrap'
import LiibMode from '../common/LiibMode'
import Instruments from '../common/Instruments'
import PacketBuilderLIIBSelector from './PacketBuilderLIIBSelector'
import PacketBuilderRPAModeSelector from './PacketBuilderRPAModeSelector'

class PacketBuilderRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            liibMode: LiibMode.NONE
        };

        this.updateLiibMode = this.updateLiibMode.bind(this);
    }

    updateLiibMode(mode) {
        this.setState({liibMode: mode});
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
                            {this.state.liibMode === LiibMode.NORMAL &&
                            <PacketBuilderRPAModeSelector/>
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
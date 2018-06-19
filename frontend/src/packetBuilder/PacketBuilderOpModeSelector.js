import React, { Component } from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import OpMode from '../common/OpMode'

class PacketBuilderOpModeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {selected: OpMode.NONE};
        this.onBtn = this.onBtn.bind(this);
    }

    onBtn(mode) {
        this.setState({selected: mode});
        this.props.updateOpMode(mode);
    }

    render() {
        return (
            <div className="pt-3">
                <ButtonGroup size="md">
                    <Button outline disabled>Operational Mode</Button>
                    <Button outline color="secondary" onClick={() => this.onBtn(OpMode.STANDBY)} active={this.state.selected === OpMode.STANDBY}>Standby</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.SNEUPI)} active={this.state.selected === OpMode.SNEUPI}>SNeuPI</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.LINAS)} active={this.state.selected === OpMode.LINAS}>LINAS</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.NEUTRAL)} active={this.state.selected === OpMode.NEUTRAL}>Neutral</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.PLASMA)} active={this.state.selected === OpMode.PLASMA}>Plasma</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.HIGH_RES_CORRELATION)} active={this.state.selected === OpMode.HIGH_RES_CORRELATION}>High Res Correlation</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.LOW_RES_CORRELATION)} active={this.state.selected === OpMode.LOW_RES_CORRELATION}>Low Res Correlation</Button>
                    <Button outline color="primary" onClick={() => this.onBtn(OpMode.PRIME_SCIENCE)} active={this.state.selected === OpMode.PRIME_SCIENCE}>Prime Science</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default PacketBuilderOpModeSelector
import React, { Component } from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import LiibMode from '../common/LiibMode'

class PacketBuilderLIIBSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {selected: LiibMode.NONE};
        this.onBtn = this.onBtn.bind(this);
    }

    onBtn(mode) {
        this.setState({selected: mode});
        this.props.updateLiibMode(mode);
    }

    render() {
        return (
            <div>
                <ButtonGroup size="md">
                    <Button outline disabled>LIIB Mode</Button>
                    <Button outline color="success" onClick={() => this.onBtn(LiibMode.NORMAL)} active={this.state.selected === LiibMode.NORMAL}>Normal</Button>
                    <Button outline color="warning" onClick={() => this.onBtn(LiibMode.TK1_CHARGE)} active={this.state.selected === LiibMode.TK1_CHARGE}>TK1 Charge</Button>
                    <Button outline color="warning" onClick={() => this.onBtn(LiibMode.TK1_DISCHARGE)} active={this.state.selected === LiibMode.TK1_DISCHARGE}>TK1 Discharge</Button>
                    <Button outline color="warning" onClick={() => this.onBtn(LiibMode.TK2_CHARGE)} active={this.state.selected === LiibMode.TK2_CHARGE}>TK2 Charge</Button>
                    <Button outline color="warning" onClick={() => this.onBtn(LiibMode.TK2_DISCHARGE)} active={this.state.selected === LiibMode.TK2_DISCHARGE}>TK2 Discharge</Button>
                    <Button outline color="danger"  onClick={() => this.onBtn(LiibMode.TK_OVERRIDE)} active={this.state.selected === LiibMode.TK_OVERRIDE}>TK Override</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default PacketBuilderLIIBSelector
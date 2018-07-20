import React, { Component } from 'react'
import {Button, ButtonGroup} from 'reactstrap'
import ButtonGroupControl from '../common/ButtonGroupControl'
import LiibMode from '../common/LiibMode'

class PacketBuilderLIIBSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected || LiibMode.NONE
        };
        this.onBtn = this.onBtn.bind(this);
    }

    onBtn(mode) {
        this.setState({selected: mode});
        this.props.updateLiibMode(mode);
    }

    render() {
        return (
            <div>
                <ButtonGroupControl size="md" name="LIIB Mode" onChange={this.onBtn} selected={this.state.selected}>
                    <Button color="success" value={LiibMode.NORMAL_MODE}>Normal</Button>
                    <Button color="warning" value={LiibMode.TK1_CHARGE}>TK1 Charge</Button>
                    <Button color="warning" value={LiibMode.TK1_DISCHARGE}>TK1 Discharge</Button>
                    <Button color="warning" value={LiibMode.TK2_CHARGE}>TK2 Charge</Button>
                    <Button color="warning" value={LiibMode.TK2_DISCHARGE}>TK2 Discharge</Button>
                    <Button color="danger" value={LiibMode.TK_OVERRIDE}>TK Override</Button>
                </ButtonGroupControl>
            </div>
        );
    }
}

export default PacketBuilderLIIBSelector
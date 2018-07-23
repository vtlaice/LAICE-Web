import React, { Component } from 'react'
import { Button, ListGroupItem } from 'reactstrap'
import ListControl from "../common/ListControl"
import ButtonGroupControl from "../common/ButtonGroupControl";
import { RG2ModeRPA, SweepModeRPA } from '../common/Modes'

class PacketBuilderRPAModeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active || false,
            rg2Mode: props.rg2Mode || null,
            sweepMode: props.sweepMode || null
        };

        this.onRg2Btn = this.onRg2Btn.bind(this);
        this.onSweepBtn = this.onSweepBtn.bind(this);
        this.onList = this.onList.bind(this);
    }

    onRg2Btn(selected) {
        this.setState({
            rg2Mode: selected
        });
        this.props.onRg2Mode(selected);
    }

    onSweepBtn(selected) {
        this.setState({
            sweepMode: selected
        });
        this.props.onSweepMode(selected);
    }

    onList(value) {
        this.setState({
            active: value
        });
        this.props.onActive(value);
    }

    render() {
        return (
            <div className="pt-3 d-flex">
                <ListControl name="RPA" active={this.state.active} onChange={this.onList}>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="RG2 Mode" selected={this.state.rg2Mode} onChange={this.onRg2Btn} vertical error={this.props.errors.includes("rg2ModeRpa")}>
                            <Button color="primary" value={RG2ModeRPA.RETARDING}>Retarding</Button>
                            <Button color="primary" value={RG2ModeRPA.APERTURE}>Aperture</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Sweep Mode" selected={this.state.sweepMode} onChange={this.onSweepBtn} vertical error={this.props.errors.includes("sweepModeRpa")}>
                            <Button color="primary" value={SweepModeRPA.LINEAR_SWEEP}>Linear Sweep</Button>
                            <Button color="primary" value={SweepModeRPA.CONSTANT_VOLTAGE}>Constant Voltage</Button>
                            <Button color="primary" value={SweepModeRPA.SMART_SWEEP}>Smart Sweep</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                </ListControl>

            </div>
        );
    }
}

export default PacketBuilderRPAModeSelector
import React, { Component } from 'react'
import { ListGroupItem, Button } from 'reactstrap'
import ListControl from '../common/ListControl'
import ButtonGroupControl from '../common/ButtonGroupControl'
import {EmissionModeSNeuPI} from "../common/Modes";

class PacketBuilderSNeuPIModeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active || false,
            dutyCycle: props.dutyCycle || null,
            emissionMode: props.emissionMode || null
        };

        this.onDutyCycleBtn = this.onDutyCycleBtn.bind(this);
        this.onEmissionModeBtn = this.onEmissionModeBtn.bind(this);
        this.onList = this.onList.bind(this);
    }

    onDutyCycleBtn(selected) {
        this.setState({
            dutyCycle: selected
        });
        this.props.onDutyCycle(selected);
    }

    onEmissionModeBtn(selected) {
        this.setState({
            emissionMode: selected
        });
        this.props.onEmissionMode(selected);
    }

    onList(value) {
        this.setState({
            active: value
        });
        this.props.onActive(value);
    }

    render() {
        return (
            <div className="pt-3 pl-3 d-flex">
                <ListControl name="SNeuPI" active={this.state.active} onChange={this.onList}>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Duty Cycle" selected={this.state.dutyCycle} onChange={this.onDutyCycleBtn} error={this.props.errors.includes("dutyCycleSneupi")}>
                            <Button color="primary" value={10}>10%</Button>
                            <Button color="primary" value={20}>20%</Button>
                            <Button color="primary" value={50}>50%</Button>
                            <Button color="primary" value={100}>100%</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Emission Mode" selected={this.state.emissionMode} onChange={this.onEmissionModeBtn} vertical error={this.props.errors.includes("emissionModeSneupi")}>
                            <Button color="primary" value={EmissionModeSNeuPI.SWEEP_EMISSION}>Sweep Emission</Button>
                            <Button color="primary" value={EmissionModeSNeuPI.EMISSION_OFF}>Emission Off</Button>
                            <Button color="primary" value={EmissionModeSNeuPI.EMISSION_LEVEL_A}>Emission Level A</Button>
                            <Button color="primary" value={EmissionModeSNeuPI.EMISSION_LEVEL_C}>Emission Level C</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                </ListControl>
            </div>
        );
    }
}

export default PacketBuilderSNeuPIModeSelector
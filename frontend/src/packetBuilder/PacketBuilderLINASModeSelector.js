import React, { Component } from 'react'
import { ListGroupItem, Button } from 'reactstrap'
import ListControl from '../common/ListControl'
import ButtonGroupControl from '../common/ButtonGroupControl'
import {CollectorGainStateLINAS, FilamentSelectLINAS} from "../common/Modes";

class PacketBuilderLINASModeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: props.active || false,
            dutyCycle: props.dutyCycle || null,
            filamentSelect: props.filamentSelect || null,
            collectorGainState: props.collectorGainState || null
        };

        this.onDutyCycleBtn = this.onDutyCycleBtn.bind(this);
        this.onFilamentSelectBtn = this.onFilamentSelectBtn.bind(this);
        this.onCollectorGainStateBtn = this.onCollectorGainStateBtn.bind(this);
        this.onList = this.onList.bind(this);
    }

    onDutyCycleBtn(selected) {
        this.setState({
            dutyCycle: selected
        });
        this.props.onDutyCycle(selected);
    }

    onFilamentSelectBtn(selected) {
        this.setState({
            filamentSelect: selected
        });
        this.props.onFilamentSelect(selected);
    }

    onCollectorGainStateBtn(selected) {
        this.setState({
            collectorGainState: selected
        });
        this.props.onCollectorGainState(selected);
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
                <ListControl name="LINAS" active={this.state.active} onChange={this.onList}>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Duty Cycle" selected={this.state.dutyCycle} onChange={this.onDutyCycleBtn} error={this.props.errors.includes("dutyCycleLinas")}>
                            <Button color="primary" value={10}>10%</Button>
                            <Button color="primary" value={20}>20%</Button>
                            <Button color="primary" value={50}>50%</Button>
                            <Button color="primary" value={100}>100%</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Filament" selected={this.state.filamentSelect} onChange={this.onFilamentSelectBtn} vertical error={this.props.errors.includes("filamentSelectLinas")}>
                            <Button color="primary" value={FilamentSelectLINAS.FILAMENT_1}>Primary (Filament 1)</Button>
                            <Button color="primary" value={FilamentSelectLINAS.FILAMENT_2}>Secondary (Filament 2)</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ButtonGroupControl className="d-flex justify-content-center" size="md" name="Collector Gain State" selected={this.state.collectorGainState} onChange={this.onCollectorGainStateBtn} vertical error={this.props.errors.includes("collectorGainStateLinas")}>
                            <Button color="primary" value={CollectorGainStateLINAS.SWITCH_GAIN_STATE}>Switch Gain at 10<sup>-5</sup> Torr</Button>
                            <Button color="primary" value={CollectorGainStateLINAS.LOW_PRESSURE_SENSITIVE}>Low Pressure Sensitive</Button>
                            <Button color="primary" value={CollectorGainStateLINAS.HIGH_PRESSURE_SENSITIVE}>High Pressure Sensitive</Button>
                        </ButtonGroupControl>
                    </ListGroupItem>
                </ListControl>
            </div>
        );
    }
}

export default PacketBuilderLINASModeSelector
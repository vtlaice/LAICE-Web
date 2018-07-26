import React, { Component } from 'react'
import { DateTimePicker } from 'react-widgets'

import ScheduleViewerCalendar from '../scheduleViewer/ScheduleViewerCalendar'

class PacketBuilderScheduler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: props.startDate || null,
            endDate: props.endDate || null
        };

        this.onStartDatePicker = this.onStartDatePicker.bind(this);
        this.onEndDatePicker = this.onEndDatePicker.bind(this);
        this.producePotentialEvent = this.producePotentialEvent.bind(this);
    }

    onStartDatePicker(value) {
        this.setState({
            startDate: value
        });
        this.props.onStartDate(value);
    }

    onEndDatePicker(value) {
        this.setState({
            endDate: value
        });
        this.props.onEndDate(value);
    }

    producePotentialEvent() {
        if (this.state.startDate && this.state.endDate) {
            return {
                name: "New command",
                startTime: this.state.startDate,
                endTime: this.state.endDate,
                potential: true
            };
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <div>
                        {this.props.errors.includes("startDate") ? <span style={{color: "red"}}>Start Date:</span> : "Start Date:"}
                        <DateTimePicker
                            value={this.state.startDate}
                            onChange={this.onStartDatePicker}
                        />
                    </div>
                    <div className="ml-auto">
                        {this.props.errors.includes("endDate") ? <span style={{color: "red"}}>End Date:</span> : "End Date:"}
                        <DateTimePicker
                            value={this.state.endDate}
                            onChange={this.onEndDatePicker}
                        />
                    </div>
                </div>
                <div className="pt-3">
                    <ScheduleViewerCalendar
                        potentialEvent={this.producePotentialEvent()}
                    />
                </div>
            </div>
        );
    }
}
export default PacketBuilderScheduler
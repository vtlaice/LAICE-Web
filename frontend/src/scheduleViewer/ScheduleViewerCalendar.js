import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import API from '../common/API'
import ScheduleViewerEventModal from "./ScheduleViewerEventModal";

class ScheduleViewerCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],

            selectable: props.selectable || false,
            editable: props.editable || false,

            selectedEvent: null
        };

        this.updateDate = this.updateDate.bind(this);
        this.createEventList = this.createEventList.bind(this);
        this.onToggleModal = this.onToggleModal.bind(this);
    }

    componentDidMount() {
        const now = new Date();
        this.updateDate(now);
    }

    updateDate(date) {
        const month = date.getUTCMonth() + 1; //Because apparently months are zero-indexed now?  Makes perfect sense!
        const year = date.getUTCFullYear();

        API.getPacketsForMonth(month, year).then(response => {
            this.setState({
                events: response
            });
        }).catch(error => {
            console.log(error)
        });
    }

    createEventList() {
        if (this.props.potentialEvent) {
            return [...this.state.events, this.props.potentialEvent];
        } else {
            return this.state.events;
        }
    }

    onToggleModal(newState) {
        if (!newState) {
            this.setState({
                selectedEvent: null
            });
        }
    }

    render() {
        return (
            <div style={{width: 800, height: 600}}>
                <BigCalendar
                    events={this.createEventList()}
                    titleAccessor={(e) => {
                        return e.name.toString()
                    }}
                    startAccessor={(e) => {
                        return new Date(e.startTime)
                    }}
                    endAccessor={(e) => {
                        return new Date(e.endTime)
                    }}
                    onNavigate={this.updateDate}
                    eventPropGetter={
                        (event, start, end, isSelected) => {
                            if (event.potential) {
                                return {style: {backgroundColor: "#DBA901"}};
                            } else {
                                return {};
                            }
                        }
                    }
                    selected={this.state.selectedEvent}
                    onSelectEvent={
                        (event, e) => {
                            this.setState({
                                selectedEvent: event
                            })
                        }
                    }
                />

                {this.state.selectedEvent !== null &&
                <ScheduleViewerEventModal
                    packet={this.state.selectedEvent}
                    onToggleModal={this.onToggleModal}
                />
                }
            </div>
        );
    }
}

export default ScheduleViewerCalendar
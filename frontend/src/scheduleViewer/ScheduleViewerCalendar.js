import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import API from '../common/API'

class ScheduleViewerCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };

        this.updateDate = this.updateDate.bind(this);
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

    render() {
        return (
            <div style={{width: 1000, height: 800}}>
                <BigCalendar
                events={this.state.events}
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
                />
            </div>
        );
    }
}

export default ScheduleViewerCalendar
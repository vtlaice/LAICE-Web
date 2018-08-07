import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Fade } from 'reactstrap'
import ScheduleViewerCalendar from './ScheduleViewerCalendar'

class ScheduleViewerRoot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pt-4 d-flex justify-content-center">
                <Fade in>
                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule Viewer</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <ScheduleViewerCalendar
                            isAuthenticated={this.props.isAuthenticated}
                            currentUser={this.props.currentUser}
                            />
                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default ScheduleViewerRoot
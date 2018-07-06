import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardBody, CardText, Fade } from 'reactstrap'
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
                            <ScheduleViewerCalendar/>
                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default ScheduleViewerRoot
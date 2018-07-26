import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardBody, CardText, Fade, Button } from 'reactstrap'
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
                            <div className="d-flex flex-fill pt-3">
                                <div className="ml-auto"><Button color="secondary">Export to CSV</Button></div>
                            </div>
                        </CardBody>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default ScheduleViewerRoot
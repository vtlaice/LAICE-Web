import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardText, Fade } from 'reactstrap'

class HomeRoot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Fade in>
                <Card body width="100%">
                    <CardTitle>Test</CardTitle>
                </Card>
                </Fade>
            </div>
        );
    }
}

export default HomeRoot
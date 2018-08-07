import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardText, Fade, Jumbotron } from 'reactstrap'

class HomeRoot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pt-4 d-flex justify-content-center">
                <Fade in>
                    <Jumbotron>
                        <h1 className="display-3">Please Log In</h1>
                    </Jumbotron>
                </Fade>
            </div>
        );
    }
}

export default HomeRoot
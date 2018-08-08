import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, Fade, Jumbotron } from 'reactstrap'

import CenterFadeCard from "../common/CenterFadeCard"

class HomeRoot extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Fade in>
                    <CenterFadeCard>
                        <CardHeader>
                            <CardTitle>LAICE</CardTitle>
                        </CardHeader>
                        <CardBody>
                            {!this.props.isAuthenticated && <CardText>Please log in</CardText>}
                            {this.props.isAuthenticated &&
                            <div>
                                <CardText>Hello, {this.props.currentUser.firstName} {this.props.currentUser.lastName}!</CardText>

                            </div>
                            }
                        </CardBody>
                    </CenterFadeCard>
                </Fade>
            </div>
        );
    }
}

export default HomeRoot
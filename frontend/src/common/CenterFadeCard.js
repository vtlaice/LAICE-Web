import React, { Component } from 'react'
import { Fade, Card } from 'reactstrap'

class CenterFadeCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="pt-4 d-flex justify-content-center">
                <Fade in>
                    <Card>
                        {this.props.children}
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default CenterFadeCard
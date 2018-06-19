import React, { Component } from 'react'
import { Button, ButtonGroup, Card, CardBody } from 'reactstrap'

class TestComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {rSelected:1};

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)
    }

    onRadioBtnClick(rSelected) {
        this.setState({rSelected})
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                <ButtonGroup>
                    <Button size="lg" outline color="info" disabled>Select State</Button>
                    <Button size="lg" outline color="secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Standby</Button>
                    <Button size="lg" outline color="danger" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>TK1</Button>
                    <Button size="lg" outline color="danger" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>TK2</Button>
                </ButtonGroup>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TestComponent
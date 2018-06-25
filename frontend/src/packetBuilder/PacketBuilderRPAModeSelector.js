import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap'
import ListControl from "../common/ListControl"
import ButtonGroupControl from "../common/ButtonGroupControl";

class PacketBuilderRPAModeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(
            {active: !this.state.active}
        );
    }

    render() {
        return (
            <div className="pt-3 d-flex">
                <ListControl name="RPA">
                    <ButtonGroupControl size="md">
                        <Button value="TEST">Test</Button>
                        <Button value="TEST2">Test 2</Button>
                    </ButtonGroupControl>
                </ListControl>

            </div>
        );
    }
}

export default PacketBuilderRPAModeSelector
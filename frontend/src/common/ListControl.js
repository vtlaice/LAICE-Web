import React, { Component } from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'

class ListControl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        const newActive = !this.state.active;
        this.setState(
            {active: newActive}
        );

        if (this.props.onChange) {
            this.props.onChange(newActive);
        }
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem className="btn" onClick={this.toggle} active={this.state.active}>
                    <ListGroupItemHeading>{this.props.name}</ListGroupItemHeading>
                    <ListGroupItemText>Click to {(this.state.active) ? "disable" : "enable"}</ListGroupItemText>
                </ListGroupItem>
                {this.state.active &&
                <ListGroupItem>
                    {this.props.children}
                </ListGroupItem>
                }
            </ListGroup>
        );
    }
}

export default ListControl
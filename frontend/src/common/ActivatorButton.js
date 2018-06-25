import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

class ActivatorButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const newActive = !this.state.active;
        this.setState({
            active: newActive
        });
        if (newActive) {
            if (this.props.onActive) {
                this.props.onActive();
            }
        } else {
            if (this.props.onInactive) {
                this.props.onInactive();
            }
        }
    }

    render() {
        return(
            <Button color={(this.state.active) ? "success" : "danger"} onClick={this.toggle}><FontAwesomeIcon icon={(this.state.active) ? faCheck : faTimes }/></Button>
        );
    }
}

export default ActivatorButton
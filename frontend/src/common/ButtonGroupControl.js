import React, { Component } from 'react'
import { ButtonGroup, Button } from 'reactstrap'

class ButtonGroupControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || null
        };

        this.onBtn = this.onBtn.bind(this);
    }

    onBtn(selected) {
        this.setState({selected: selected});

        if (this.props.onChange) {
            this.props.onChange(selected);
        }
    }

    render() {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child => {
            return React.cloneElement(child, {
                onClick: () => this.onBtn(child.props.value),
                active: this.state.selected === child.props.value,
                outline: true
            });
        });

        return (
            <ButtonGroup size={this.props.size} vertical={this.props.vertical} className={this.props.className}>
                <Button color={this.props.error ? "danger" : "secondary"} disabled outline={!this.props.error}>{this.props.name}</Button>
                {childrenWithProps}
            </ButtonGroup>
        );
    }
}

export default ButtonGroupControl
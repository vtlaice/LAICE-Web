import React, { Component } from 'react'
import { ButtonGroup, Button } from 'reactstrap'

class ButtonGroupControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected || null,
            error: props.error || false,
            errorFixed: false
        };

        this.onBtn = this.onBtn.bind(this);
    }

    componentWillReceiveProps(props) {
        if (this.state.selected !== props.selected) {
            this.setState({
                selected: props.selected
            })
        }
        if (this.state.error !== props.error) {
            this.setState({
                error: props.error
            })
        }
    }

    onBtn(selected) {
        this.setState({
            selected: selected,
            error: false,
            errorFixed: true
        });

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
                <Button color={this.state.error && !this.state.errorFixed ? "danger" : "secondary"} disabled outline={(!this.state.error) || (this.state.error && this.state.errorFixed)}>{this.props.name}</Button>
                {childrenWithProps}
            </ButtonGroup>
        );
    }
}

export default ButtonGroupControl
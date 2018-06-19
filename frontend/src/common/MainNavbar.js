import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button, ButtonGroup, NavLink } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'

class MainNavbar extends Component {
    constructor(props) {
        super(props);

    }

    static createNavItem(name, page, doRender, exact = false) {
        if (!doRender) return null;
        return (
            <NavItem>
                <NavLink tag={RRNavLink} exact={exact} to={page}>{name}</NavLink>
            </NavItem>
        );
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand href="/">LAICE</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {MainNavbar.createNavItem("Home", "/", true, true)}
                        {MainNavbar.createNavItem("Packet Builder", "/packetBuilder", true)}
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <ButtonGroup>
                            <Button color="primary">Options</Button>
                            <Button color="danger">Logout</Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default MainNavbar
import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button, NavLink, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap'
import { NavLink as RRNavLink } from 'react-router-dom'
import LoginButton from './LoginButton'
import API from './API'
import UserSettingsModal from './UserSettingsModal'

class MainNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginPopoverOpen: false,
            userSettingsModalOpen: false
        };

        this.toggleLoginPopover = this.toggleLoginPopover.bind(this);
        this.createNavItem = this.createNavItem.bind(this);
        this.createSecureNavItem = this.createSecureNavItem.bind(this);
        this.createLoginLogoutComponent = this.createLoginLogoutComponent.bind(this);
        this.onOptionsButton = this.onOptionsButton.bind(this);
        this.onOptionsModalToggle = this.onOptionsModalToggle.bind(this);
    }

    toggleLoginPopover() {
        this.setState({ loginPopoverOpen: !this.state.loginPopoverOpen })
    }

    onOptionsButton() {
        this.setState({
            userSettingsModalOpen: true
        })
    }

    onOptionsModalToggle(newState) {
        this.setState({
            userSettingsModalOpen: newState
        })
    }

    createNavItem(name, page, doRender = true, exact = false) {
        if (!doRender) return null;
        return (
            <NavItem>
                <NavLink tag={RRNavLink} exact={exact} to={page}>{name}</NavLink>
            </NavItem>
        );
    }

    createSecureNavItem(name, page, role, exact = false) {
        if (!this.props.isAuthenticated) return null;
        if (!this.props.currentUser.roles.includes(role)) return null;

        return this.createNavItem(name, page, true, exact)
    }

    createLoginLogoutComponent() {
        if (!this.props.isAuthenticated) {
            return (
                <LoginButton onLogin={this.props.onLogin}/>
            )
        }
        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {this.props.currentUser.firstName + " " + this.props.currentUser.lastName}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem href="#" onClick={this.onOptionsButton}>Options</DropdownItem>
                    <DropdownItem href="#" onClick={this.props.onLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <NavbarBrand href="/">LAICE</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {this.createNavItem("Home", "/", true, true)}
                        {this.createSecureNavItem("Schedule Viewer", "/scheduleViewer", "ROLE_VIEW_SCHEDULE")}
                        {this.createSecureNavItem("Packet Builder", "/packetBuilder", "ROLE_SCHEDULE_PACKET")}
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        {this.createLoginLogoutComponent()}
                    </Nav>
                </Navbar>
                <UserSettingsModal reloadUser={this.props.reloadUser} currentUser={this.props.currentUser} visible={this.state.userSettingsModalOpen} onToggle={this.onOptionsModalToggle}/>
            </div>
        );
    }
}

export default MainNavbar
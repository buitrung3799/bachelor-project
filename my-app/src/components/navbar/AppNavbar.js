import React, {useState} from 'react';
import{
    Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
 } from 'reactstrap';
  import "../../assets/css/AppNavbar.css";
    
    const AppNavbar= (props) => {
        const [isOpen,setIsOpen]= useState(false);
        const toggle = () => setIsOpen(!isOpen);
        return (
            <Navbar className="mainnav" color="dark" light expand="lg">
                <NavbarBrand href="/">Medical Image Segmentation</NavbarBrand>
                <NavbarToggler onPress={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/"><b>Update Label Names</b></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/"><b>More Images</b></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/"><b>Save your Work</b></NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    };
    export default AppNavbar;



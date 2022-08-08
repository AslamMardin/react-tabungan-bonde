import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarHeader = () => {
	return (
		<div className="fixed-top">
		<Container fluid>
		<Navbar expand="lg" variant="light" bg="light">
		<Container>
		<Navbar.Brand href="#">Navbar</Navbar.Brand>
		</Container>
		</Navbar>
		</Container>
		</div>
		)
}

export default NavbarHeader
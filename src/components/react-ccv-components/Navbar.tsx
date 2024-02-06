import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar as DefaultNavbar } from 'react-bootstrap';

import { ReactComponent as CCVLogo } from './assets/svg/ccv-logo.svg';
import { ReactComponent as BrownLogo } from './assets/svg/brown-logo.svg';

import '../../styles/custom.scss';

export const Navbar = () => {
  return (
    <DefaultNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <DefaultNavbar.Brand href="https://www.brown.edu">
          <BrownLogo style={{ height: 50 }} />
        </DefaultNavbar.Brand>
        <DefaultNavbar.Brand href="https://ccv.brown.edu/">
          <CCVLogo style={{ height: 50 }} />
        </DefaultNavbar.Brand>
        <DefaultNavbar.Toggle aria-controls="basic-navbar-nav" />
        <DefaultNavbar.Collapse id="basic-navbar-nav" role="" className="justify-content-end">
          <Nav className="ml-auto">
            {/*<Navbar.Text>*/}
            {/*  Signed in as: <a href="#login">Mark Otto</a>*/}
            {/*</Navbar.Text>*/}
            <Nav.Link href="#link">Login</Nav.Link>
          </Nav>
        </DefaultNavbar.Collapse>
      </Container>
    </DefaultNavbar>
  );
};

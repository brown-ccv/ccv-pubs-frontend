import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar as DefaultNavbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleLogin, handleLogout } from '../../utils/firebase.ts';
import { selectUser } from '../../store/slice/appState';
import { ReactComponent as CCVLogo } from './assets/svg/ccv-logo.svg';
import { ReactComponent as BrownLogo } from './assets/svg/brown-logo.svg';

export const Navbar = () => {
  const user = useSelector(selectUser);

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
            {user ? (
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon icon={faUser} /> {user.displayName}
                  </>
                }
                id="userMenu"
              >
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            )}
          </Nav>
        </DefaultNavbar.Collapse>
      </Container>
    </DefaultNavbar>
  );
};

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
        <div className="d-flex align-items-center">
          <DefaultNavbar.Brand href="https://it.brown.edu" className="flex-shrink-0 pe-lg-2">
            <BrownLogo width={150} className="d-block" />
            <span className="visually-hidden">OIT Home</span>
          </DefaultNavbar.Brand>
          <DefaultNavbar.Brand href="https://ccv.brown.edu/" className="flex-shrink-0 pe-lg-2">
            <CCVLogo width={150} className="d-block" />
            <span className="visually-hidden">CCV Home</span>
          </DefaultNavbar.Brand>
        </div>

        <h1 className="h2 d-none d-lg-flex flex-grow-1 ps-3">
          Center for Computation and Visualization
        </h1>
        <DefaultNavbar.Toggle aria-controls="basic-navbar-nav" />
        <DefaultNavbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
          role="navigation"
        >
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

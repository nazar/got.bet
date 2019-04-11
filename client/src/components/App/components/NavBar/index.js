import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Icon, Image, Menu, Responsive } from 'semantic-ui-react';

import './navBar.styl';

import logo from './logo.png';

export default function NavBar() {
  return (
    <div className="navbar">
      <Container>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile />
        </Responsive>

        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop />
        </Responsive>
      </Container>
    </div>
  );
}


const NavBarDesktop = () => (
  <Menu inverted borderless>
    <Menu.Item>
      <Link to="/">
        <Image size="mini" src={logo} />
      </Link>
    </Menu.Item>

    <MenuItems />
  </Menu>
);

function NavBarMobile() {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <Menu inverted borderless>
        <Menu.Item>
          <Link to="/">
            <Image size="mini" src={logo} />
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item onClick={toggleMenu}>
            <Icon name="bars" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {
        visible && (
          <Menu inverted vertical fluid>
            <MenuItems />
          </Menu>
        )
      }
    </React.Fragment>
  );

  //

  function toggleMenu() {
    setVisible(!visible);
  }
}

const MenuItems = () => (
  <React.Fragment>
    <Menu.Item as={NavLink} name="Home" exact to="/" />
    <Menu.Item as={NavLink} name="Place your Bet" to="/place" />
    <Menu.Item as={NavLink} name="GOT Bets" to="/bets" />
    <Menu.Item as={NavLink} name="Companies" to="/companies" />
    <Menu.Item as={NavLink} name="The Players" to="/players" />
    <Menu.Item as={NavLink} name="About GOT Bets" to="/about" />
  </React.Fragment>
);

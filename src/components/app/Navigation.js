import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export default function Navigation({ open, handleClick }) {
  return (
    <MenuStyled className="Navigation" right width={'200px'} open={open}>
      <NavLinkStyled exact to="/" onClick={handleClick}>
        Animals
      </NavLinkStyled>
      <NavLinkStyled to="/events" onClick={handleClick}>
        Events
      </NavLinkStyled>
      <NavLinkStyled to="/map" onClick={handleClick}>
        Karte
      </NavLinkStyled>
    </MenuStyled>
  )
}

const MenuStyled = styled.nav`
  display: flex;
  flex-direction: column;
  background: white;
  right: ${({ open }) => (open ? 0 : '-300px')};
  height: 50vh;
  text-align: left;
  padding: 10px;
  position: fixed;
  top: 0;
  margin: 10px;
  transition: right 0.3s ease-in-out;
  z-index: 10;
`

const NavLinkStyled = styled(NavLink)`
  font-size: 1.2rem;
  padding: 15px;
  color: black;
  text-decoration: none;
  transition: color 0.3s linear;
`
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { HomeIcon } from "@heroicons/react/24/solid";

const NavbarContainer = styled.nav`
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: 5px;
  color: #fff; // Icon color
  transition: color 0.3s ease;

  &:hover {
    color: #f39c12; // Icon color on hover
  }
`;

export default function Navbar() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToCategories = () => {
    navigate("/categories");
  };

  const goToReturnBooks = () => {
    navigate("/return");
  };

  return (
    <NavbarContainer>
      <NavItem onClick={goToHome}>
        <Icon>
          <HomeIcon style={{ width: 20, color: "white" }} />
        </Icon>
        Home
      </NavItem>

      <NavItem onClick={goToCategories}>Borrow Books</NavItem>

      <NavItem onClick={goToReturnBooks}>Return Books</NavItem>
    </NavbarContainer>
  );
}

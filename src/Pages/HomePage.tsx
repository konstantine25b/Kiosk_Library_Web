import React from "react";
import styled from "@emotion/styled";
import { BookOpenIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <HomePageContainer>
      <ServicesContainer>
        <Title>
          <BuildingLibraryIcon className="library-icon" />
          Welcome to the Library Kiosk
        </Title>
        <Subtitle>Explore our services:</Subtitle>
        <ServiceButton onClick={() => navigate("/categories")}>
          <BookOpenIcon className="button-icon" />
          Borrow a Book
        </ServiceButton>
        <ServiceButton onClick={() => navigate("/return")}>
          <BookOpenIcon className="button-icon" />
          Return a Book
        </ServiceButton>
      </ServicesContainer>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #2b5876, #4e4376);
`;

const ServicesContainer = styled.div`
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  .library-icon {
    margin-right: 10px;
    width: 40px; /* Adjust the size of the library icon */
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const ServiceButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1.3rem;
  padding: 12px 25px;
  margin: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.3s ease;

  .button-icon {
    margin-right: 10px;
    width: 20px; /* Adjust the size of the book icon */
  }

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

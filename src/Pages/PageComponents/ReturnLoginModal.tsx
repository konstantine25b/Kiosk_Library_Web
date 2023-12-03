import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

interface ReturnLoginModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
}

const ReturnLoginModal: React.FC<ReturnLoginModalProps> = ({
  onClose,
  onLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<
    Array<{ userName: string; Password: string }>
  >([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUsers(data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // Check if the submitted username and password match any user
    const matchedUser = users.find(
      (user) => user.userName === username && user.Password === password
    );

    if (matchedUser) {
      // Login successful
      onLogin(username, password);
      onClose();
    } else {
      // Login failed
      alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          Login
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <InputLabel>Username:</InputLabel>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
          <InputLabel>Password:</InputLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
          <LoginButton onClick={handleLogin}>Login</LoginButton>
        </ModalBody>
      </Modal>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Adjust the z-index to appear above the previous modal */
`;

const Modal = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1.2rem;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export default ReturnLoginModal;

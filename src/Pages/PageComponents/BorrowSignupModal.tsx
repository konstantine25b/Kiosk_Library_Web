import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { UserContext } from "../../App";

// Define the props for the AuthenticationModal component
interface AuthenticationModalProps {
  onClose: () => void; // Function to close the modal
  onLogin: (username: string, password: string) => void; // Function to handle login
}

// Define the AuthenticationModal component as a functional component
const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onClose,
  onLogin,
}) => {
  // State to manage username input value
  const [username, setUsername] = useState("");
  // State to manage password input value
  const [password, setPassword] = useState("");
  // State to manage username validation warning
  const [usernameWarning, setUsernameWarning] = useState<string | null>(null);
  // State to manage password validation warning
  const [passwordWarning, setPasswordWarning] = useState<string | null>(null);

  // Access UserContext to get selected book information
  const context = useContext(UserContext);
  const selectedBookInfo = context?.book;

  // Function to handle the login process
  const handleLogin = () => {
    // Validate the length of the username
    if (username.length < 5) {
      setUsernameWarning("Username must be at least 5 characters long.");
      return;
    } else {
      setUsernameWarning(null);
    }

    // Validate the length of the password
    if (password.length < 8) {
      setPasswordWarning("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordWarning(null);
    }

    // Call the onLogin function with username and password
    onLogin(username, password);
  };

  // Event handler for username input change
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          User Authentication
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {selectedBookInfo && (
            <BookInfo>
              <BookInfoTitle>Book: {selectedBookInfo.title}</BookInfoTitle>
              <BookInfoDetail>
                <strong>Author:</strong> {selectedBookInfo.author}
              </BookInfoDetail>
              <BookInfoDetail>
                <strong>Year:</strong> {selectedBookInfo.year}
              </BookInfoDetail>
            </BookInfo>
          )}
          <InputLabel>
            Username (min 5 characters):
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </InputLabel>
          {usernameWarning && <Warning>{usernameWarning}</Warning>}
          <InputLabel>
            Password (min 8 characters):
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </InputLabel>
          {passwordWarning && <Warning>{passwordWarning}</Warning>}
        </ModalBody>
        <ModalFooter>
          <LoginButton onClick={handleLogin}>Sign Up</LoginButton>
        </ModalFooter>
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
  z-index: 20;
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

const BookInfo = styled.div`
  margin-bottom: 20px;
`;

const BookInfoTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #3498db;
`;

const BookInfoDetail = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
`;

const InputLabel = styled.label`
  display: block;
  padding-bottom: 8px;
  color: #555;
  margin-top: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 0px;

  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
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

const Warning = styled.span`
  color: #e74c3c;
  font-size: 0.8rem;
  margin-bottom: 8px;
  display: block;
  padding: 8px;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

export default AuthenticationModal;

import React, { useState } from "react";
import styled from "@emotion/styled";

interface AuthenticationModalProps {
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  selectedBookInfo: {
    title: string;
    author: string;
    year: number;
    id: string;
  } | null;
}

const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onClose,
  onLogin,
  selectedBookInfo,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameWarning, setUsernameWarning] = useState<string | null>(null);
  const [passwordWarning, setPasswordWarning] = useState<string | null>(null);

  const handleLogin = () => {
    if (username.length < 5) {
      setUsernameWarning("Username must be at least 5 characters long.");
      return;
    } else {
      setUsernameWarning(null);
    }

    if (password.length < 8) {
      setPasswordWarning("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordWarning(null);
    }

    onLogin(username, password);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

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
          <LoginButton onClick={handleLogin}>Login</LoginButton>
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

import React from 'react';
import styled from '@emotion/styled';

interface ReturnConfirmationModalProps {
  onClose: () => void;
  success: boolean;
  userName?: string;
  bookData?: {
    id: string;
    title: string;
    author: string;
    year: number;
  } | null; 
  errorMessage?: string;
}

const ReturnConfirmationModal: React.FC<ReturnConfirmationModalProps> = ({
  onClose,
  success,
  userName,
  bookData,
  errorMessage,
}) => {
  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          {success ? 'Return Confirmation' : 'Error'}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {success ? (
            <>
              <ConfirmationMessage>
                Book returned successfully! 📚
              </ConfirmationMessage>
              {userName && <p>User: {userName}</p>}
              {bookData && (
                <BookDetails>
                  <strong>Title:</strong> {bookData.title}
                  <br />
                  <strong>Author:</strong> {bookData.author}
                  <br />
                  <strong>Year:</strong> {bookData.year}
                </BookDetails>
              )}
            </>
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
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
  z-index: 30;
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

const ConfirmationMessage = styled.p`
  color: #2ecc71;
  font-size: 1rem;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 1rem;
  margin-bottom: 16px;
`;

const BookDetails = styled.div`
  margin-top: 16px;
`;

export default ReturnConfirmationModal;

import React, { useContext } from "react";
import styled from "@emotion/styled";
import { UserContext } from "../../App";

interface BorrowConfirmationModalProps {
  onClose: () => void;
  success: boolean;
}

const BorrowConfirmationModal: React.FC<BorrowConfirmationModalProps> = ({
  onClose,
  success,
}) => {
 // Access UserContext to get selected book information
 const context = useContext(UserContext);
 const selectedBookInfo = context?.book;

  return (
    <ModalOverlay>
      <Modal>
        <ModalHeader>
          {success ? "Borrow Confirmation" : "Error"}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {success ? (
            <>
              <ConfirmationMessage>
                Book borrowed successfully! 📚
              </ConfirmationMessage>
              {selectedBookInfo && (
                <BookInfo>
                  <BookInfoTitle>{selectedBookInfo.title}</BookInfoTitle>
                  <BookInfoDetail>
                    <strong>Author:</strong> {selectedBookInfo.author}
                  </BookInfoDetail>
                  <BookInfoDetail>
                    <strong>Year:</strong> {selectedBookInfo.year}
                  </BookInfoDetail>
                </BookInfo>
              )}
            </>
          ) : (
            <ErrorMessage>
              There was an error borrowing the book. Please try again.
            </ErrorMessage>
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

const BookInfo = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
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

export default BorrowConfirmationModal;

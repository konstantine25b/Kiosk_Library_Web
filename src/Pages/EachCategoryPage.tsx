import React, { useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import AuthenticationModal from "./LoginModal";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export default function EachCategoryPage() {
  const { state } = useLocation();

  const ITEMS_PER_PAGE = 4;
  const allBooks: Book[] = state.category.books;

  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const visibleBooks = allBooks.slice(startIdx, endIdx);

  const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showAuthenticationModal, setShowAuthenticationModal] = useState(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleBookSelection = (book: Book) => {
    setSelectedBook(book);
    setShowAuthenticationModal(true);
  };

  const handleCloseModal = () => {
    setShowAuthenticationModal(false);
  };

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, let's just alert a successful login
    alert("Login successful!");
    // Close the modal after successful login
    handleCloseModal();
  };

  return (
    <BooksContainer>
      <CategoryTitle>{state.category.name} Books</CategoryTitle>
      <BooksList>
        {visibleBooks.map((book: Book) => (
          <div key={book.id}>  
           {selectedBook && showAuthenticationModal && (
              <AuthenticationModal
                onClose={handleCloseModal}
                onLogin={handleLogin}
                selectedBookInfo={{
                  title: selectedBook.title,
                  author: selectedBook.author,
                  year: selectedBook.year,
                  id: selectedBook.id
                }}
              />
            )}
              <BookItem key={book.id}>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
            <BookYear>{book.year}</BookYear>
            <SelectButton onClick={() => handleBookSelection(book)}>
              Select This Book
            </SelectButton>
          </BookItem>
          
          </div>
        
        ))}
      </BooksList>

      <PaginationContainer>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </PaginationButton>
        <PageIndicator>
          Page {currentPage} of {totalPages}
        </PageIndicator>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </PaginationButton>
      </PaginationContainer>
    </BooksContainer>
  );
}

const BooksContainer = styled.div`
  padding: 20px;
`;
const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 20px;
  text-align: center;
`;

const BooksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const BookItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const BookTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const BookAuthor = styled.p`
  margin: 5px 0 0;
  font-size: 1rem;
  color: #555;
`;

const BookYear = styled.p`
  margin: 5px 0 0;
  font-size: 1rem;
  color: #888;
`;

const SelectButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1.2rem;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 50px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const PaginationButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

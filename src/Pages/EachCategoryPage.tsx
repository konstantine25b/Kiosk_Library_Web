import React, { useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

export default function EachCategoryPage() {
  const { state } = useLocation();

  const ITEMS_PER_PAGE = 5;
  const allBooks: Book[] = state.category.books;

  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const visibleBooks = allBooks.slice(startIdx, endIdx);

  const totalPages = Math.ceil(allBooks.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleBookSelection = (book: Book) => {
    // Implement your book selection logic here
    console.log("Selected Book:", book);
  };

  return (
    <BooksContainer>
      <CategoryTitle>{state.category.name} Books</CategoryTitle>
      <BooksList>
        {visibleBooks.map((book: Book) => (
          <BookItem key={book.id} onClick={() => handleBookSelection(book)}>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
            <BookYear>{book.year}</BookYear>
          </BookItem>
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

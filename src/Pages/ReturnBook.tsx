import React, { useState, FormEvent } from "react";
import styled from "@emotion/styled";
import ReturnLoginModal from "./PageComponents/ReturnLoginModal";
import ReturnConfirmationModal from "./PageComponents/ReturnConfirmationModal";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

interface Category {
  name: string;
  id: string;
  books: Book[];
}
interface ReturnBookProps {}

const ReturnBook: React.FC<ReturnBookProps> = () => {
  const [bookId, setBookId] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const [showReturnConfirmationModal, setShowReturnConfirmationModal] =
    useState(false);
  const [returnConfirmationModalData, setReturnConfirmationModalData] =
    useState({
      success: false,
      userName: "",
      bookData: null,
      errorMessage: "",
    });

  const handleBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add logic to handle the book ID submission
    console.log("Book ID submitted:", bookId);

    // Show the login modal after form submission
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    // Close the login modal
    setShowLoginModal(false);
  };

  const BOOK_CATEGORIES_API =
    "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/Categories";

  const fetchCategories = async () => {
    const response = await fetch(BOOK_CATEGORIES_API);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };
  const handleCloseReturnConfirmationModal = () => {
    // Close the confirmation modal
    setShowReturnConfirmationModal(false);
  };

  const handleLogin = async (username: string, password: string) => {
    console.log("Login with:", username, password);
    console.log(bookId);
    setShowLoginModal(false);

    try {
      // Fetch the book categories
      const categories = await fetchCategories();

      // Check if the book ID is valid
      const matchingBook = categories.reduce(
        (foundBook: Book, category: Category) => {
          if (!foundBook) {
            const book = category.books.find((book) => book.id === bookId);
            return book ? { category, book } : null;
          }
          return foundBook;
        },
        null
      );

      if (matchingBook) {
        // Book ID is valid, proceed with the login logic
        console.log("Valid book ID. Proceeding with login...");
        console.log(matchingBook);

        setReturnConfirmationModalData({
          success: true,
          userName: username, // Set the username
          bookData: matchingBook.book, // Set book data
          errorMessage: "", // Reset error message
        });
      } else {
        // Book ID is not valid, show an error message
        console.error("Invalid book ID. Please enter a valid book ID.");
        setReturnConfirmationModalData({
          success: false,
          userName: "", // Reset username
          bookData: null, // Reset book data
          errorMessage: "Invalid book ID. Please enter a valid book ID.", // Set error message
        });
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching book categories:", error);
      setReturnConfirmationModalData({
        success: false,
        userName: "", // Reset username
        bookData: null, // Reset book data
        errorMessage: "Error fetching book categories", // Set error message
      });
    }
    setShowReturnConfirmationModal(true);
  };

  return (
    <Container>
      <Title>Return a Book</Title>
      <Form onSubmit={handleSubmit}>
        <InputLabel>Book ID:</InputLabel>
        <Input
          type="text"
          value={bookId}
          onChange={handleBookIdChange}
          placeholder="Enter Book ID"
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      {showLoginModal && (
        <ReturnLoginModal
          onClose={handleCloseLoginModal}
          onLogin={(username, password) => handleLogin(username, password)}
        />
      )}
      {showReturnConfirmationModal && (
        <ReturnConfirmationModal
          onClose={handleCloseReturnConfirmationModal}
          success={returnConfirmationModalData.success}
          userName={returnConfirmationModalData.userName}
          bookData={returnConfirmationModalData.bookData || undefined}
          errorMessage={returnConfirmationModalData.errorMessage}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #3498db;
  margin-top: 100px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;

  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export default ReturnBook;

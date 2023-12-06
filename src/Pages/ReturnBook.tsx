import React, { useState, FormEvent } from "react";
import styled from "@emotion/styled";
import ReturnLoginModal from "./PageComponents/ReturnLoginModal";
import ReturnConfirmationModal from "./PageComponents/ReturnConfirmationModal";
import colors from "./styles/colors";

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
  // State for storing the book ID entered by the user
  const [bookId, setBookId] = useState<string>("");

  // State to manage the visibility of the login modal
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // State to manage the visibility of the return confirmation modal
  const [showReturnConfirmationModal, setShowReturnConfirmationModal] =
    useState(false);

  // State to store data for the return confirmation modal
  const [returnConfirmationModalData, setReturnConfirmationModalData] =
    useState({
      success: false,
      userName: "",
      bookData: null as Book | null,
      errorMessage: "",
    });

  // Event handler for changes in the book ID input field
  const handleBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add logic to handle the book ID submission
    console.log("Book ID submitted:", bookId);

    // Show the login modal after form submission
    setShowLoginModal(true);
  };

  // Event handler to close the login modal
  const handleCloseLoginModal = () => {
    // Close the login modal
    setShowLoginModal(false);
  };

  // API endpoint for fetching book categories
  const BOOK_CATEGORIES_API =
    "https://656ac10ddac3630cf72744fc.mockapi.io/Categories/Categories";

  // Function to fetch book categories from the API
  const fetchCategories = async () => {
    const response = await fetch(BOOK_CATEGORIES_API);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  };

  // Event handler to close the return confirmation modal
  const handleCloseReturnConfirmationModal = () => {
    // Close the confirmation modal
    setShowReturnConfirmationModal(false);
  };

  // Event handler for login logic
  const handleLogin = async (username: string, password: string) => {
    console.log("Login with:", username, password);
    console.log(bookId);
    setShowLoginModal(false);

    try {
      // Fetch the book categories
      const categories = await fetchCategories();

      // Check if the book ID is valid
      const matchingBook = categories.reduce(
        (foundBook: Book | null, category: Category) => {
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

        // Set data for the return confirmation modal
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

    // Show the return confirmation modal
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
  background-color: ${colors.backgroundOverlay}; // Update to your desired color
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${colors.bookTitle};
  margin-top: 100px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: ${colors.modalBackground};
  box-shadow: ${colors.boxShadow};
  border-radius: 8px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
  color: ${colors.bookInfo};
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid ${colors.borderColor};
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: ${colors.bookTitle};
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

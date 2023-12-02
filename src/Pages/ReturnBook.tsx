import React, { useState, FormEvent } from "react";
import styled from "@emotion/styled";

interface ReturnBookProps {}

const ReturnBook: React.FC<ReturnBookProps> = () => {
  const [bookId, setBookId] = useState<string>("");

  const handleBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookId(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add logic to handle the book ID submission
    console.log("Book ID submitted:", bookId);
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #3498db;
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

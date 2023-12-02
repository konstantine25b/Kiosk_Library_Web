import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
}

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

const ITEMS_PER_PAGE = 7;

export default function BookCategories() {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<Category[]>("bookCategories", fetchCategories);

  const [currentPage, setCurrentPage] = useState(1);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;

  const visibleCategories = categories?.slice(startIdx, endIdx);

  const totalPages = Math.ceil((categories?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  if (isError) {
    return <ErrorContainer>Error fetching data</ErrorContainer>;
  }

  return (
    <CategoriesContainer>
      <CategoriesHeading>Book Categories</CategoriesHeading>
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
      <CategoriesList>
        {visibleCategories?.map((category) => (
          <CategoryItem
            onClick={() =>
              navigate(`/categories/books`, {
                state: {
                  category: category,
                },
              })
            }
            key={category.id}
          >
            {category.name}
          </CategoryItem>
        ))}
      </CategoriesList>
    </CategoriesContainer>
  );
}

const CategoriesContainer = styled.div`
  padding: 20px;

  border-radius: 10px;
  margin-left: 5%;
  width: 90%;
`;

const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  font-size: 1.2rem;
  padding: 10px;
  margin: 10px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: #3498db;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin: 30px;
  margin-left: 50px;
  margin-right: 50px;
`;

const PaginationButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
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

const LoadingContainer = styled.div`
  font-size: 1.2rem;
  color: #3498db;
  margin-top: 20px;
`;

const ErrorContainer = styled.div`
  font-size: 1.2rem;
  color: #e74c3c;
  margin-top: 20px;
`;
const CategoriesHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #3498db;
`;

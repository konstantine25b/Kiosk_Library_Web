# Library Kiosk 

The Library Kiosk is a web application built with React and TypeScript, serving as a virtual library where users can explore, borrow, and return books. The back-end is simulated using the mock API provided by mockapi.io.



Features
1. Book Browsing
Users can explore various book categories, each containing a list of books.
Pagination is implemented for easy navigation through a large number of books.
2. Book Selection
Users can select a book for borrowing by clicking the "Select This Book" button.
A login modal is displayed for authentication before proceeding with the borrowing process.
3. Authentication
Users need to log in with a valid username and password to borrow a book.
The system validates user credentials against a mock API.
4. Borrow Confirmation
After successful authentication, users receive a confirmation message indicating a successful book borrowing.
5. Book Return
Users can return a borrowed book by entering the book ID.
A login modal is displayed for authentication before proceeding with the return process.
6. Return Confirmation
After successful authentication, users receive a confirmation message indicating a successful book return.
In case of an error or invalid book ID, appropriate error messages are displayed.



Setup

Clone the repository: git clone https://github.com/konstantine25b/Kiosk_Library_Web.git
Install dependencies: npm install
Run the application: npm start



Technologies
Front-end: React, TypeScript, React Router, React Query, Emotion (for styling).
Back-end: mockapi.io (Mocking).



# Library Kiosk 

The Library Kiosk is a web application built with React and TypeScript, serving as a virtual library where users can explore, borrow, and return books. The back-end is simulated using the mock API provided by mockapi.io.



# Features
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



# Setup

Clone the repository: git clone https://github.com/konstantine25b/Kiosk_Library_Web.git

Navigate to the project directory: cd Kiosk_Library_Web

Install dependencies: npm install

Run the application: npm start



# Technologies
Front-end: React, TypeScript, React Router, React Query, Emotion (for styling).
Back-end: mockapi.io (Mocking).

# Pages
# 1. Homepage
The landing page where users are greeted with two options: "Borrow a Book" and "Return a Book." This serves as the starting point for users, allowing them to choose their desired action.
<img width="1440" alt="Screenshot 2023-12-03 at 22 40 41" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/191b3a9b-7ddb-4efb-b585-89d065e31a70">


# 2. Borrow a Book Page
When users choose the "Borrow a Book" option from the navigation bar or the homepage, they are seamlessly navigated (thanks to React Router DOM) to the "Borrow a Book" page. This dedicated page leverages React Query to fetch book categories dynamically from the database.
<img width="1440" alt="Screenshot 2023-12-03 at 22 41 00" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/b6dd278b-3c1d-48fc-a0cf-231ba2f6fc6d">

2.1 . Each Category Books Page
Upon selecting a specific book category from the "Borrow a Book" page, users are directed to the "Each Category Books" page. This page focuses on providing an in-depth exploration of books within a particular category, offering both detailed information about each book and the option to borrow.
<img width="1440" alt="Screenshot 2023-12-03 at 22 41 09" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/2431b2cb-2a3e-4482-8154-8e7b22c556e0">

2.2 . Sign Up Modal
The "Sign Up Modal" serves as the gateway for users to create accounts and proceed with the book borrowing process. Upon selecting a book for borrowing, users encounter this modal, which demands special username and password requirements for a secure authentication process. User Context Hook is used to save selected book data for further use.
<img width="1440" alt="Screenshot 2023-12-03 at 22 41 35" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/1c412d0a-64f2-4520-93b4-95168ba59b59">

2.3 . Success and Unsuccessful Modals
The "Success Modal" and "Unsuccessful Modal" play a crucial role in providing immediate feedback to users after attempting to create an account or log in on the "Sign Up Modal" page. These modals serve as confirmation messages, notifying users of the outcome of their authentication attempt.
<img width="1440" alt="Screenshot 2023-12-03 at 22 41 47" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/6bdc278e-2ecf-47a8-b26a-87726e0d33da">

# 3.  Return Book Page
The "Return Book Page" serves as a convenient platform for users to return borrowed books. Accessible from both the homepage and the navigation bar, this page features a simple form where users can input the book ID of the item they wish to return.

Upon submitting the book ID, the application utilizes the React Query library to fetch all books from the database, enabling real-time validation of the entered book ID. To ensure the security of book return transactions, a login modal promptly appears, requiring users to authenticate their identity.
<img width="1440" alt="Screenshot 2023-12-03 at 22 42 03" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/0ee997b3-447e-488d-94c3-6cbf081b7fbf">

3.1 Return LogIn Page
Once users successfully submit their login credentials on the "Return Book Page," the system checks the user's existence in the database. This page employs the React Query library to efficiently fetch all relevant information. In the case of a successful login, users receive a clear confirmation message, signaling the triumphant return of the borrowed book. Conversely, an error message promptly appears if the login is unsuccessful or if the user does not exist in the database.
<img width="1440" alt="Screenshot 2023-12-03 at 22 42 19" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/0c9314a5-638e-44f7-a516-62f9a2ccb21e">

3.2 Return Confirmation Modal
The "Return Confirmation Modal" is a component that appears on the "Return Confirmation Page." It provides immediate feedback to users after attempting to return a book.
<img width="1440" alt="Screenshot 2023-12-03 at 22 42 29" src="https://github.com/konstantine25b/Kiosk_Library_Web/assets/102245292/87448864-3831-4efc-a8e3-38ba28491fed">






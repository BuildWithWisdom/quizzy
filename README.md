# Quizzy: A Dynamic React Quiz Application

## Project Overview

Quizzy is a single-page web application built with React that allows users to test their general knowledge through a dynamic quiz. Questions are fetched from a third-party API, providing a fresh set of challenges with each play. The application features a clean, intuitive user interface, allowing users to select answers, navigate between questions, and view their results.

## Features

*   **Dynamic Question Fetching:** Questions are fetched from the Open Trivia Database (OpenTDB) API, ensuring a variety of questions for each quiz session.
*   **Interactive Quiz Interface:** Users can select one option per question.
*   **Navigation:** Users can move to the next question or go back to a previous question to change their answer.
*   **Real-time Answer Selection:** Options are visually highlighted upon selection, and only one option can be selected per question.
*   **Result Summary:** After completing the quiz, users can view a summary of their performance, including which answers were correct, incorrect, and their selected choices.
*   **Play Again Functionality:** Users can restart the quiz with a new set of questions.
*   **Responsive Design:** (Assuming it's responsive, if not, this can be removed or adjusted) The UI is designed to be user-friendly across different screen sizes.

## How It Works

The application is built using React and leverages functional components and hooks for state management and lifecycle handling.

*   **`App.jsx` (Main Component):**
    *   Manages the core application state, including `startQuiz` (to control initial screen), `questions` (the current set of quiz questions), `answeredQuestions` (a historical record of user's answers), `questionNumber` (current question index), and `submit` (to trigger result display).
    *   **`useEffect`:** Fetches quiz questions from the OpenTDB API on component mount and when the user chooses to "Play Again". Includes error handling for API responses.
    *   **`handleSelectAnswer`:** Updates the `questions` state to mark the selected option for the current question. It also updates the `answeredQuestions` state to record the user's choice, handling both new answers and re-selections.
    *   **`handleNextQuestion`:** Advances the `questionNumber` to the next question or triggers the quiz submission if all questions are answered.
    *   **`handlePrevQuestion`:** Allows users to navigate back to the previous question, enabling them to review or change their answers.
    *   **`handlePlayAgain`:** Resets the quiz state and fetches a new set of questions.
    *   **Conditional Rendering:** Dynamically renders the "Start Quiz" screen, the `Quiz` component, or the `Result` component based on the application's state.

*   **`QuizCard.jsx` (Quiz Display Component):**
    *   Receives the current question, selection handler, and navigation functions as props.
    *   Renders the question text and its options.
    *   Includes "Next" and "Prev" buttons for navigation, with conditional display for the "Prev" button on the first question.
    *   Displays a loading message while questions are being fetched.

*   **`QuizResult.jsx` (Results Display Component):**
    *   Receives the `answeredQuestions` array as a prop.
    *   Iterates through the `answeredQuestions` to display each question, the user's selected answer, and the correct answer.
    *   Applies color-coded styling (red for incorrect selected, green for correct, gray for unselected incorrect) to provide clear visual feedback.
    *   Includes a "Play Again" button to restart the quiz.

## What I Learned

This project provided invaluable hands-on experience and deepened my understanding of several core React and web development concepts:

*   **Advanced State Management:** Gained proficiency in managing complex state objects and arrays, particularly with nested data structures (questions, options).
*   **Immutability in React:** Solidified the importance of immutability when updating state, using `map`, `filter`, and spread syntax (`...`) to create new arrays/objects rather than mutating existing ones.
*   **Asynchronous Data Fetching:** Learned how to integrate third-party APIs using `fetch` and `useEffect`, including handling loading states, successful responses, and errors.

*   **Conditional Rendering:** Mastered dynamic UI rendering based on multiple state variables, ensuring the correct component is displayed at each stage of the quiz.
*   **Component Communication:** Reinforced understanding of passing functions and data as props between parent and child components.
*   **Debugging Asynchronous Operations:** Experienced and debugged common issues related to asynchronous state updates and data availability (e.g., "undefined" errors due to data not yet loaded).
*   **Code Organization and Reusability:** Practiced extracting reusable logic into dedicated functions (like `fetchQuestions`) to improve code clarity and maintainability.
*   **Git Workflow:** Gained practical experience with Git staging, committing, and pushing changes, including understanding commit message best practices.

## Future Improvements

*   **Scoring System:** Implement a robust scoring mechanism to calculate and display the user's final score.
*   **Difficulty and Category Selection:** Allow users to choose quiz difficulty and categories before starting the quiz.
*   **Timer:** Add a timer for each question or for the entire quiz.
*   **User Authentication:** Implement user accounts to track scores and progress.
*   **More Robust Error Handling UI:** Display user-friendly messages for API errors or when no questions can be loaded.
*   **Accessibility (A11y):** Improve accessibility features for users with disabilities.
*   **Styling Enhancements:** Further refine the UI/UX with more advanced CSS or a UI library.
*   **Routing:** Integrate React Router to manage different views (e.g., Home, Quiz, Results) with distinct URLs.
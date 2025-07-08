import { useEffect, useState } from "react";
import Quiz from "./components/QuizCard";
import Result from "./components/QuizResult";
import { quizData } from "./components/quiz";
import { clsx } from "clsx";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    const data = quizData.map((newQuestion) => {
      return [
        {
          question: newQuestion.question,
          options: [
            {
              answer: newQuestion.correct_answer,
              isCorrect: true,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[0],
              isCorrect: false,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[1],
              isCorrect: false,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[2],
              isCorrect: false,
              isSelected: false,
            },
          ],
        },
      ];
    });
    const rondomNum = Math.floor(Math.random() * quizData.length);
    setQuestions([...data[rondomNum]]);
  }, []);

  function handleStartQuiz() {
    setStartQuiz(true);
    // console.log(questions)
  }

  function handleSelectAnswer(questionIndex, optionIndex) {
    // Update the 'questions' state to mark the selected option
    setQuestions((prevQuestions) => {
      // Create a new array of questions to maintain immutability
      const updatedQuestions = prevQuestions.map((question, qIndex) => {
        // Find the specific question that was interacted with
        if (qIndex === questionIndex) {
          return {
            ...question,
            // Create a new array of options, marking only the selected one as true
            options: question.options.map((option, oIndex) => {
              // 'oIndex === optionIndex' ensures only the clicked option is 'isSelected: true'
              // and all others are 'isSelected: false' for mutual exclusivity.
              return { ...option, isSelected: oIndex === optionIndex };
            }),
          };
        }
        return question; // Return other questions unchanged
      });

      // After updating 'questions' state, derive the 'answeredQuestion' from this *updated* state.
      // This ensures 'answeredQuestion' contains the latest selection.
      const answeredQuestion = updatedQuestions[questionIndex];

      // Optional: Basic check to ensure an option was actually selected.
      // This 'if' block might be removed if selection is guaranteed by UI/UX.
      if (!answeredQuestion.options.some((opt) => opt.isSelected)) {
        // If no option is selected (e.g., due to an edge case), return the updated questions
        // without attempting to modify 'answeredQuestions' state.
        return updatedQuestions;
      }

      // Update the 'answeredQuestions' state to store the user's selection.
      // This state holds a record of all questions the user has interacted with.
      setAnsweredQuestions((prevAnswered) => {
        // Find if this specific question has been answered before.
        const existingQuestionIndex = prevAnswered.findIndex(
          (answered) => answered.question === answeredQuestion.question,
        );

        if (existingQuestionIndex > -1) {
          // If the question was already answered, update its entry.
          // We create a new array to maintain immutability.
          const newAnswered = [...prevAnswered];
          // Replace the old answered question object with the newly updated one.
          newAnswered[existingQuestionIndex] = answeredQuestion;
          return newAnswered;
        } else {
          // If it's a new question being answered for the first time, add it.
          // Create a new array with the new answered question appended.
          return [...prevAnswered, answeredQuestion];
        }
      });

      // Log the currently processed answered question for debugging.
      // Note: 'answeredQuestions' in the console.log below will still show the *previous* state
      // due to React's asynchronous state updates.
      // console.log("Current answered question being processed:", answeredQuestion);
      // console.log("Answered questions state (after potential update):", answeredQuestions);

      // Finally, return the 'updatedQuestions' array to become the new 'questions' state.
      return updatedQuestions;
    });
  }

  function handleNextQuestion() {
    const data = quizData.map((newQuestion) => {
      return [
        {
          question: newQuestion.question,
          options: [
            {
              answer: newQuestion.correct_answer,
              isCorrect: true,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[0],
              isCorrect: false,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[1],
              isCorrect: false,
              isSelected: false,
            },
            {
              answer: newQuestion.incorrect_answers[2],
              isCorrect: false,
              isSelected: false,
            },
          ],
        },
      ];
    });
    const rondomNum = Math.floor(Math.random() * quizData.length);
    if (questionNumber === 5) {
      console.log("You have completed the Questions", answeredQuestions);
      setSubmit(true);
      setStartQuiz(false);
      return; // submit feature here
    } else setQuestions([...data[rondomNum]]);
    setQuestionNumber((prevNumber) => prevNumber + 1);
  }

  function handlePlayAgain() {
    setSubmit(false);
    setQuestionNumber(1);
    setStartQuiz(true);
    setAnsweredQuestions([]);
  };

  return (
    <>
      <main className={clsx("flex flex-col justify-center items-center font-inter", submit ? "py-8" : 'h-screen')}>
        {submit ? (
          <Result answeredQuestions={answeredQuestions} handlePlayAgain={handlePlayAgain} />
        ) : startQuiz ? (
          <Quiz
            questions={questions}
            selectOption={handleSelectAnswer}
            nextQuestion={handleNextQuestion}
            questionNumber={questionNumber}
          />
        ) : (
          <div className="max-w-110 p-8 flex flex-col items-center justify-center gap-4 bg-white rounded-[20px] shadow-card text-center">
            <h1 className="text-[28px] font-bold text-primary">
              Ready to test your Knowledge
            </h1>
            <p className="text-sm text-secondary">
              Flex your brain muscles and see how much you know!
            </p>
            <button
              onClick={handleStartQuiz}
              className="w-[200px] h-[50px] bg-blueAccent text-white cursor-pointer rounded-3xl shadow-btn transition-all duration-200 hover:shadow-option-hover"
            >
              Start Quiz
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

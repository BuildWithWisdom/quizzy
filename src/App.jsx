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

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
      const data = await res.json();

      // Check if data.results exists and is an array before mapping
      if (data && Array.isArray(data.results)) {
        const newData = data.results.map((newQuestion) => {
          return {
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
          };
        });
        setQuestions([...newData]);
      } else {
        console.error("API response did not contain expected 'results' array:", data);
        // Optionally, set an error state here to display a message to the user
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      // Optionally, set an error state here to display a message to the user
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []); // Empty dependency array means this runs once on mount

  function handleStartQuiz() {
    setStartQuiz(true);
    // console.log(questions)
  }

  function handleSelectAnswer(optionIndex) {
    // console.log(questions)

    // Update the 'questions' state to mark the selected option
    setQuestions(prevQuestions => {
      // Map over the previous questions array to create a new one
      return prevQuestions.map((question, qIndex) => {
        // Check if this is the current question being displayed
        if (qIndex === questionNumber - 1) {
          // If it is, return a new question object with updated options
          return {
            ...question,
            options: question.options.map((option, oIndex) => {
              return {
                ...option,
                isSelected: oIndex === optionIndex // Mark the selected option as true, others as false
              }
            })
          };
        }

        return question; // Return other questions unchanged
      });
    });

  }

  function handleNextQuestion() {
    if (questionNumber === 5) {
      setAnsweredQuestions(questions)
      
      setSubmit(true);
      setStartQuiz(false);
      return; // submit feature here
    }
    setQuestionNumber((prevNumber) => prevNumber + 1);
  }

  function handlePrevQuestion() {
    if(questionNumber === 1) {
      return
    }
    console.log(questionNumber)
    setQuestionNumber((prevNumber) => prevNumber - 1)
  }

  function handlePlayAgain() {
    setSubmit(false);
    setQuestionNumber(1);
    setStartQuiz(true);
    setAnsweredQuestions([]);
    fetchQuestions(); // Fetch new questions for the next round
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
            prevQuestion={handlePrevQuestion}
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

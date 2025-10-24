import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// 1️⃣ Khởi tạo state ban đầu
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "", 
  timeLeft: 10,
  highScore: 0, 
};

// 2️⃣ Reducer chính
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      const isCorrect =
        action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect
          ? "Correct! 🎉"
          : `Incorrect! The correct answer is ${state.questions[state.currentQuestion].answer}`,
      };

    case "NEXT_QUESTION":
      const correct =
        state.selectedOption ===
        state.questions[state.currentQuestion].answer;
      const updatedScore = correct ? state.score + 1 : state.score;

      // nếu là câu cuối → hiển thị điểm
      const isLast = state.currentQuestion + 1 === state.questions.length;
      const finalScore = isLast ? updatedScore : state.score;

      // Cập nhật high score vào localStorage
      if (isLast) {
        const high = Math.max(
          updatedScore,
          Number(localStorage.getItem("highScore") || 0)
        );
        localStorage.setItem("highScore", high);
      }

      return {
        ...state,
        score: updatedScore,
        currentQuestion: isLast ? state.currentQuestion : state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        showScore: isLast,
        timeLeft: 10,
        highScore: Number(localStorage.getItem("highScore") || 0),
      };

    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "TIME_UP":
      const autoIsLast = state.currentQuestion + 1 === state.questions.length;
      if (autoIsLast) {
        const high = Math.max(state.score, state.highScore);
        localStorage.setItem("highScore", high);
      }
      return {
        ...state,
        currentQuestion: autoIsLast ? state.currentQuestion : state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        showScore: autoIsLast,
        timeLeft: 10,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: Number(localStorage.getItem("highScore") || 0),
      };

    default:
      return state;
  }
}

// 3️⃣ Component chính
function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialState,
    highScore: Number(localStorage.getItem("highScore") || 0),
  });

  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    timeLeft,
    highScore,
  } = state;

  // 4️⃣ useEffect để đếm ngược thời gian
  useEffect(() => {
    if (showScore) return; // dừng khi hoàn tất
    if (timeLeft <= 0) {
      dispatch({ type: "TIME_UP" });
      return;
    }

    const timer = setTimeout(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, showScore]);

  // 5️⃣ Các hàm xử lý
  const handleOptionSelect = (option) => {
    if (!selectedOption) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // 6️⃣ Giao diện
  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        {showScore ? (
          <div className="text-center">
            <h2>
              🏆 Your Score: {score} / {questions.length}
            </h2>
            <h5>High Score: {highScore}</h5>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between">
              <h5>
                Question {currentQuestion + 1}/{questions.length}
              </h5>
              <h5 style={{ color: timeLeft <= 5 ? "red" : "black" }}>
                ⏱️ {timeLeft}s
              </h5>
            </div>

            <h4 className="mt-2">
              {questions[currentQuestion].question}
            </h4>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option
                      ? "success"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!selectedOption}
                >
                  {option}
                </Button>
              ))}
            </div>

            {feedback && (
              <Alert
                variant={
                  feedback.startsWith("Correct") ? "success" : "danger"
                }
                className="mt-3"
              >
                {feedback.startsWith("Correct") ? (
                  <FaCheckCircle className="me-2 text-success" />
                ) : (
                  <FaTimesCircle className="me-2 text-danger" />
                )}
                {feedback}
              </Alert>
            )}

            <Button
              variant="primary"
              className="mt-3"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBankAdvanced;

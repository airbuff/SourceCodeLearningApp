import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export function QuizSection({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (index) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === quiz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  };

  if (!quiz || quiz.length === 0) {
    return <div>No quiz available</div>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Quiz</h2>
        {showResults ? (
          <div className="text-center p-4">
            <h3 className="text-xl mb-2">Quiz Complete!</h3>
            <p className="text-lg mb-4">
              Your score: {score} out of {quiz.length}
            </p>
            <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
          </div>
        ) : (
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {quiz.length}
            </p>
            <h3 className="text-lg font-medium mb-4">
              {quiz[currentQuestion].question}
            </h3>
            <div className="space-y-2 mb-6">
              {quiz[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-3 rounded cursor-pointer border ${
                    selectedOption === index
                      ? isAnswered
                        ? index === quiz[currentQuestion].correctAnswer
                          ? "bg-green-100 dark:bg-green-900 border-green-500"
                          : "bg-red-100 dark:bg-red-900 border-red-500"
                        : "bg-blue-100 dark:bg-blue-900 border-blue-500"
                      : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            {isAnswered ? (
              <div className="flex justify-between">
                <div className={`text-${selectedOption === quiz[currentQuestion].correctAnswer ? 'green' : 'red'}-600 font-medium`}>
                  {selectedOption === quiz[currentQuestion].correctAnswer 
                    ? "Correct!" 
                    : `Wrong! The correct answer is: ${quiz[currentQuestion].options[quiz[currentQuestion].correctAnswer]}`}
                </div>
                <Button onClick={handleNextQuestion}>
                  {currentQuestion < quiz.length - 1 ? "Next Question" : "See Results"}
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleCheckAnswer} 
                disabled={selectedOption === null}
              >
                Check Answer
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

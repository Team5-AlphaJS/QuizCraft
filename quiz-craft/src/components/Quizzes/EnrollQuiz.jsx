import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const EnrollQuiz = ({ quiz, setEnroll }) => {
    const [quizStart, setQuizStart] = useState(false);

    const [questionIds] = useState(Object.keys(quiz.questions));
    const [questionIndex, setQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(quiz.questions[questionIds[questionIndex]]);
    const [participantAnswears, setParticipantAnswears] = useState({});

    useEffect(() => {
        questionIds.map(questionId => participantAnswears[questionId] = []);
        setParticipantAnswears({ ...participantAnswears });
    }, []);

    useEffect(() => {
        setCurrentQuestion(quiz.questions[questionIds[questionIndex]]);
    }, [questionIndex]);

    const setAnswear = (answearId, questionType) => {
        if (questionType === 'single') {
            participantAnswears[questionIds[questionIndex]][0] = answearId;
        } else if (questionType === 'multi') {
            if (participantAnswears[questionIds[questionIndex]].includes(answearId)) {
                participantAnswears[questionIds[questionIndex]].splice(participantAnswears[questionIds[questionIndex]].indexOf(answearId), 1)
            } else {
                participantAnswears[questionIds[questionIndex]].push(answearId);
            }
        }

        setParticipantAnswears({ ...participantAnswears });
    }

    const finish = () => {
        const score = { total: 0, time: 0 };
        const pointsPerAnswear = Math.ceil(quiz.score / Object.keys(quiz.questions).length);

        Object.keys(quiz.questions).map(questionId => {
            if (quiz.questions[questionId].type === 'single') {
                if (participantAnswears[questionId].includes(Object.keys(quiz.questions[questionId].correct)[0])) {
                    score.total = score.total + pointsPerAnswear;
                }
            } else if (quiz.questions[questionId].type === "multi") {
                const pointsPerPieceAnswear = Math.ceil(pointsPerAnswear / Object.keys(quiz.questions[questionId].correct).length)
                Object.keys(quiz.questions[questionId].correct).map(answearId => {
                    if (participantAnswears[questionId].includes(answearId)) {
                        score.total = score.total + pointsPerPieceAnswear;
                    }
                });
            }
        });
        console.log(score);
    };


    return (
        <>
            {!quizStart &&
                <div className="flex flex-col w-11/12 justify-around">
                    <di className="flex flex-col pl-8 pt-8 h-2/4">
                        <h1>{quiz.title}</h1>
                        <p>Of category: {quiz.category}</p>
                        <p>Time left to complete: {quiz.dueDate - Date.now()}</p>
                        <p>You will have to answear {Object.keys(quiz.questions).length} questions in {quiz.timer} time to complete.</p>
                    </di>
                    <div className="flex justify-between">
                        <Button className="ml-2" onClick={() => setEnroll('')}>Back</Button>
                        <Button className="mr-4" onClick={() => setQuizStart(true)}>Start</Button>
                    </div>
                </div>
            }
            {quizStart && <div className="quiz`">
                <div className="question">
                    <p>{currentQuestion.question}</p>
                    {quiz.questions[questionIds[questionIndex]].type === "single" &&
                        <RadioGroup>
                            {Object.keys(quiz.questions[questionIds[questionIndex]].answears).map(answearId =>
                                <div key={answearId} className="flex items-center space-x-2">
                                    <RadioGroupItem
                                        id={answearId}
                                        checked={participantAnswears[questionIds[questionIndex]].includes(answearId) || false}
                                        value={quiz.questions[questionIds[questionIndex]].answears[answearId]}
                                        onClick={(e) => setAnswear(e.target.id, 'single')}
                                    />
                                    <Label htmlFor={answearId}>{quiz.questions[questionIds[questionIndex]].answears[answearId]}</Label>
                                </div>
                            )}
                        </RadioGroup>
                    }
                    {quiz.questions[questionIds[questionIndex]].type === "multi" &&
                        <div className="flex flex-col space-y-1">
                            <p>More than one answear possible.</p>
                            {Object.keys(quiz.questions[questionIds[questionIndex]].answears).map(answearId =>
                                <div key={answearId} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={answearId}
                                        checked={participantAnswears[questionIds[questionIndex]].includes(answearId) || false}
                                        onClick={(e) => setAnswear(e.target.id, 'multi')}
                                    />
                                    <Label
                                        htmlFor={answearId}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {quiz.questions[questionIds[questionIndex]].answears[answearId]}
                                    </Label>
                                </div>
                            )}

                        </div>
                    }
                </div>
                <div className="navigate">
                    {questionIndex !== 0 && <Button onClick={() => setQuestionIndex(questionIndex - 1)}>Previous</Button>}
                    {questionIndex < questionIds.length - 1 && <Button onClick={() => setQuestionIndex(questionIndex + 1)}>Next</Button>}
                    {questionIndex === questionIds.length - 1 && <Button onClick={finish}>Finish</Button>}
                </div>
            </div>
            }
        </>

    )
};

EnrollQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    setEnroll: PropTypes.func.isRequired
}

export default EnrollQuiz;
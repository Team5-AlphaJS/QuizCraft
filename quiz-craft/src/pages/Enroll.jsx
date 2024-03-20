// import { AuthContext } from "../../context/AuthContext";
import Timer from "@/components/Timer/Timer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizData, participated, removeFromParticipatns } from "../../services/quiz.service";
import { Button } from "../components/ui/button";
import { studentParticipated, studentEnrolled } from "../../services/users.service";

const Enroll = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext)

    const [quiz, setQuiz] = useState({
        title: '',
        category: '',
        openOrInvite: '',
        questions: {},
        timer: 0,
        dueDate: '',
        author: '',
        orderQuestions: '',
        orderAnswears: '',
        score: 0
    });

    const [questions, setQuestions] = useState([]);
    const [onStart, setOnStart] = useState(false);
    const [participantAnswers, setParticipantAswers] = useState({});
    const [startTime, setStartTime] = useState(new Date());
    const [score, setScore] = useState({ score: 0 });
    const [showScore, setShowScore] = useState(false);

    // questions navigation
    const [currentIndex, setCurrentIndex] = useState(0);
    const [questionsIds, setQuestionIds] = useState([]);


    useEffect(() => {
        getQuizData(id)
            .then(snap => setQuiz(snap.val()))
    }, [id]);

    useEffect(() => {
        setQuestionIds(Object.keys(quiz.questions));
        Object.keys(quiz.questions).map(questionId => {
            participantAnswers[questionId] = []
            setParticipantAswers({ ...participantAnswers })
            quiz.questions[questionId].id = questionId;
            questions.push(quiz.questions[questionId]);
            setQuestions([...questions])
        });
    }, [quiz]);

    const setAnswear = (answearId) => {
        // console.log(questions[currentIndex].type)
        if (questions[currentIndex].type === 'single') {
            participantAnswers[questions[currentIndex].id][0] = answearId;
        } else {
            if (participantAnswers[questions[currentIndex].id].includes(answearId)) {
                const answerIndex = participantAnswers[questions[currentIndex].id].indexOf(answearId);
                participantAnswers[questions[currentIndex].id].splice(answerIndex, 1);
            } else {
                participantAnswers[questions[currentIndex].id].push(answearId);
            }
        }
        setParticipantAswers({ ...participantAnswers });
    };

    const onStartQuiz = () => {
        setOnStart(true);
        const newDate = new Date();
        const time = quiz.timer * 60
        newDate.setSeconds(newDate.getSeconds() + time);
        setStartTime(newDate);
    };

    const onFinish = async () => {
        setOnStart(false);
        setShowScore(true);

        const ponitsPerAns = Math.ceil(quiz.score / Object.keys(quiz.questions).length);
        Object.keys(quiz.questions).map(questionId => {
            if (quiz.questions[questionId].type === 'single') {
                if (participantAnswers[questionId].includes(Object.keys(quiz.questions[questionId].answears)[0])) {
                    score.score += ponitsPerAns;
                    setScore(score);
                }
            } else {
                const pointsPerAnsPiece = Math.ceil(ponitsPerAns / Object.keys(quiz.questions[questionId].correct).length);
                Object.keys(quiz.questions[questionId].answears).map(answear => {
                    if (participantAnswers[questionId].includes(answear)) {
                        score.score += pointsPerAnsPiece;
                        setScore(score);
                    }
                })
            }
        });

        // zapishi v bazata na quiaz participated scora
        await participated(userData.username, id, score);
        // mahni ot usera ongoing
        await studentEnrolled(userData.username, id);
        userData.enrolled = { [id]: score };

        console.log(userData);

        // zapishi v bazata na usera enrolled scora
        await studentParticipated(userData.username, id, score);
        // mahni ot quiza participants
        await removeFromParticipatns(userData.username, id);
    };

    return (
        <>
            {!onStart ? (
                <div className="flex flex-col items-center justify-center space-y-12 h-[700px]">
                    {!showScore &&
                        <div>
                            <p>Once you click on Start you`ll have {quiz.timer} minutes to complete {Object.keys(questions).length} questions <br />
                                to solve. Are you ready ?
                            </p>
                        </div>
                    }
                    {showScore &&
                        <div>
                            <p className="text-2xl">Great Job</p>
                            <p>Your score is {score.score}</p>
                        </div>}
                    <div className="flex justify-between w-3/5">
                        <Button onClick={() => navigate(-1)}>Back</Button>
                        {!showScore && <Button onClick={onStartQuiz}>Start</Button>}

                    </div>
                </div>
            ) : (
                <>

                    <div className="flex flex-col items-center justify-center space-y-12  h-[700px]">
                        <Timer setOnStart={setOnStart} expiryTimestamp={startTime} onFinish={onFinish} />
                        <div className="flex flex-col w-1/2">
                            <div className="flex justify-between">
                                <p className="text-2xl mb-4">{questions[currentIndex].question}</p>
                                {questions[currentIndex].type === 'multi' && <p>More than one answer possible.</p>}
                            </div>
                            {questions[currentIndex].type === 'single' &&
                                <RadioGroup className="">
                                    {Object.keys(questions[currentIndex].answears).map(answearId =>
                                        <div key={answearId} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={questions[currentIndex].answears[answearId]}
                                                checked={participantAnswers[questions[currentIndex].id].includes(answearId)}
                                                id={answearId}
                                                onClick={() => setAnswear(answearId)}
                                            />
                                            <Label htmlFor={answearId}>{questions[currentIndex].answears[answearId]}</Label>
                                        </div>)
                                    }
                                </RadioGroup>
                            }
                            {questions[currentIndex].type === 'multi' &&
                                <div className="checkboxes space-y-2">
                                    {Object.keys(questions[currentIndex].answears).map(answearId =>
                                        <div key={answearId} className="flex items-center space-x-2">
                                            <Checkbox
                                                value={questions[currentIndex].answears[answearId]}
                                                checked={participantAnswers[questions[currentIndex].id].includes(answearId)}
                                                id={answearId}
                                                onClick={() => setAnswear(answearId)}
                                            />
                                            <Label htmlFor={answearId}>{questions[currentIndex].answears[answearId]}</Label>
                                        </div>)
                                    }
                                </div>}


                        </div>
                        <div className="flex justify-between w-3/5">
                            {currentIndex !== 0 && <Button onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</Button>}
                            {currentIndex < questionsIds.length - 1 && <Button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</Button>}
                            {currentIndex === questionsIds.length - 1 && <Button onClick={onFinish}>Finish</Button>}
                        </div>
                    </div>
                </>)}
        </>
    );
};

export default Enroll;
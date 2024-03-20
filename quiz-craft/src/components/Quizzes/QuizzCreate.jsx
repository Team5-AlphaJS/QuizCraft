import { Label } from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import CategorySelect from "../CategorySelect/CategorySelect";
import OpenInvite from "../OpenInvite/OpenInvite";
// import { v4 as uuidv4 } from "uuid";
import QuestionCreateEdit from "../QuestionCreateEdit/QuestionCreateEdit";
import SetDate from "../SetDate/SetDate";
import SetTimer from "../SetTimer/SetTimer";
import SimpleQuestion from "../SimpleQuestion/SimpleQuestion";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { AuthContext } from "../../../context/AuthContext";
import { createQuiz, inviteStudent } from "../../../services/quiz.service";
import OrderQuestions from "../OrderQuestions/OrderQuestions";
import Scoring from "../Scoring/Scoring";



const QuizCreate = ({ quizzes, setQuizzes }) => {
    const { userData } = useContext(AuthContext);
    const [quiz, setQuiz] = useState({
        title: '',
        category: '',
        openOrInvite: '',
        questions: {},
        timer: 0,
        dueDate: '',
        author: userData.username,
        score: 100
    });

    const { toast } = useToast();

    const onCreate = async () => {
        console.log(quiz);
        if (quiz.title.length < 3 || quiz.title.length > 30) {
            toast({
                title: "Invalid title",
                description: 'Title must be between 3 and 30 characters long!'
            });
            return;
        }

        if (!quiz.category) {
            toast({
                title: "Invalid category",
                description: "Please select a category!"
            });
            return;
        }

        if (!quiz.openOrInvite) {
            toast({
                title: "Invalid availability",
                description: "Plesase select to whome is the quiz avaible!"
            });
            return;
        }

        if (quiz.openOrInvite === 'invitational' && (!('invited' in quiz) || Object.keys(quiz.invited) === 0)) {
            toast({
                title: "No participants/studnets",
                description: "You must invite at least one studnet"
            });
            return;
        }

        if (Object.keys(quiz.questions).length === 0) {
            toast({
                title: "No questions",
                description: "Plesase provide at least one question"
            });
            return;
        }


        try {
            const response = await createQuiz(quiz);
            if (quiz.openOrInvite === "invitational") {
                const quizId = response._path.pieces_[1];
                const invitation = {
                    status: "pending"
                };

                Object.keys(quiz.invited).map(async participant => await inviteStudent(participant, invitation, quizId));
            }
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: e.message
            });
        } finally {
            toast({
                title: `Quiz created successfuly`,
            });
            // setQuizzes([...quizzes, quiz]);
            setQuiz({
                title: '',
                category: '',
                openOrInvite: '',
                questions: {},
                timer: 0,
                dueDate: '',
                author: userData.username,
            });
        }
    };

    return (
        <Card className="h-[90%] w-5/6 p-3 flex flex-col border-3">
            <div className="flex justify-between">
                <Label className="mt-1.5 mr-1 pl-1 w-24" htmlFor="title">Quiz Title</Label>
                <Input
                    className="w-full p-1"
                    id="title"
                    placeholder="Medieval history"
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
            </div>
            <div className=" mt-1 mb-1 flex justify-start ">
                <CategorySelect quiz={quiz} setQuiz={setQuiz} />{" "}
                <OpenInvite quiz={quiz} setQuiz={setQuiz} />{" "}
                <SetTimer quiz={quiz} setQuiz={setQuiz} /> {" "}
                <SetDate quiz={quiz} setQuiz={setQuiz} />
                <OrderQuestions quiz={quiz} setQuiz={setQuiz} />
                <Scoring quiz={quiz} setQuiz={setQuiz} />
            </div>
            <div className="flex">
                <div className="w-full mr-2">
                    <QuestionCreateEdit quiz={quiz} setQuiz={setQuiz} />
                    <div className="added-questions mt-4">
                        <p className="text-xl ml-1">Questions:</p>
                        {Object.keys(quiz.questions).length > 0 ? (
                            <ScrollArea className="">
                                <div className="p-4">
                                    {quiz.questions && Object.keys(quiz.questions).map(questionId => (
                                        <SimpleQuestion key={questionId} questionId={questionId} quiz={quiz} setQuiz={setQuiz} />
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : <p>No questions added.</p>}

                    </div>
                </div>
            </div>
            <Button className="ml-1 w-1/6 h-8 self-end" onClick={onCreate}>Create quiz</Button>
            <Toaster />
        </Card>
    );
};

QuizCreate.propTypes = {
    quizzes: PropTypes.array,
    setQuizzes: PropTypes.func,
};

export default QuizCreate;
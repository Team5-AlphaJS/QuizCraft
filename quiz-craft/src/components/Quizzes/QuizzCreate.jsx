import { Label } from "@radix-ui/react-dropdown-menu";
import PropTypes from "prop-types";
import { useState } from "react";
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

const QuizCreate = ({ quizzes, setQuizzes }) => {
    const [quiz, setQuiz] = useState({
        title: '',
        category: '',
        openOrInvite: '',
        questions: {},
        timer: 0,
        dueDate: '',
        author: '',
    });

    const onCreate = () => {
        console.log(quiz);
    };

    return (
        <Card className="h-full w-5/6 ">
            <div className="flex justify-between">
                <Label className="mt-1.5 mr-1 pl-1 w-24" htmlFor="title">Quiz Title</Label>
                <Input
                    className="w-full p-1 border-none"
                    id="title"
                    placeholder="Medieval history"
                    value={quiz.title}
                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                />
            </div>
            <div className="flex">
                <div className="w-2/3 mr-2">
                    <QuestionCreateEdit quiz={quiz} setQuiz={setQuiz} />
                    <div className="added-questions mt-4">
                        <p className="text-xl ml-1">Questions:</p>
                        <ScrollArea>
                            {quiz.questions && Object.keys(quiz.questions).map(questionId => (
                                <SimpleQuestion key={questionId} questionId={questionId} quiz={quiz} setQuiz={setQuiz} />
                            ))}
                        </ScrollArea>

                    </div>
                </div>
                <div className="border-l-4 mt-1 p-3 mb-1 flex justify-around ">
                    <CategorySelect className="w-1/4" quiz={quiz} setQuiz={setQuiz} />{" "}
                    <OpenInvite className="w-1/4" quiz={quiz} setQuiz={setQuiz} />{" "}
                    <SetTimer className="w-1/4" quiz={quiz} setQuiz={setQuiz} /> {" "}
                    <SetDate className="w-1/4" quiz={quiz} setQuiz={setQuiz} />
                    <Button className="ml-1 w-1/4 h-8" onClick={onCreate}>Create quiz</Button>
                </div>
            </div>
        </Card>
    );
};

QuizCreate.propTypes = {
    quizzes: PropTypes.array,
    setQuizzes: PropTypes.func,
};

export default QuizCreate;
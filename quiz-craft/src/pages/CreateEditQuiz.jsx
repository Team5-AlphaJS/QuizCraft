import { useContext, useEffect, useState } from "react";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import OpenInvite from "../components/OpenInvite/OpenInvite";
import QuestionCreateEdit from "../components/QuestionCreateEdit/QuestionCreateEdit";
import SetDate from "../components/SetDate/SetDate";
import SetTimer from "../components/SetTimer/SetTimer";
import SimpleQuestion from "../components/SimpleQuestion/SimpleQuestion";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/use-toast";
import { AuthContext } from "../../context/AuthContext";
import { createQuiz, inviteStudent, editQuiz } from "../../services/quiz.service";
import Scoring from "../components/Scoring/Scoring";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizData } from "../../services/quiz.service";

const CreateEditQuiz = () => {
    const { userData } = useContext(AuthContext);
    const id = useParams().id
    const navigate = useNavigate();

    const [onEdit, setOnEdit] = useState(false);

    const [quiz, setQuiz] = useState({
        title: '',
        category: '',
        openOrInvite: '',
        questions: {},
        timer: 60,
        dueDate: '',
        author: userData?.username || '',
        score: 100
    });

    useEffect(() => {
        if (window.location.href.split('/')[3] === "edit-quiz") {
            setOnEdit('true');
        }
    }, []);

    useEffect(() => {
        if (onEdit) {
            getQuizData(id)
                .then(snap => snap.val())
                .then(data => setQuiz(data));
        }
    }, [onEdit])

    const { toast } = useToast();

    const onCreateEdit = async () => {
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
            let response;
            if (onEdit) {
                response = await editQuiz(id, quiz);
            } else {
                response = await createQuiz(quiz);
            }
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
                title: `Quiz ${onEdit ? 'edited' : 'created'} successfuly`,
            });
            if (onEdit) {
                navigate('/active');
            } else {
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
        }
    };

    return (
        <div className="flex justify-center w-full h-[750px] mt-4" >
            <Card className="flex flex-col items-center w-3/5">
                <Input type="text" id="quiz-title" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} className="w-4/5 mt-4" placeholder="Enter quiz title" />
                <div className=" mt-1 mb-1 flex justify-start ">
                    <CategorySelect quiz={quiz} setQuiz={setQuiz} />{" "}
                    <OpenInvite quiz={quiz} setQuiz={setQuiz} />{" "}
                    <SetTimer quiz={quiz} setQuiz={setQuiz} /> {" "}
                    <SetDate quiz={quiz} setQuiz={setQuiz} />
                    <Scoring quiz={quiz} setQuiz={setQuiz} />
                </div>
                <div className="w-4/5">
                    <QuestionCreateEdit quiz={quiz} setQuiz={setQuiz} />
                </div>
                <div className="added-questions w-4/5">
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
                <Button className="ml-1 w-1/6 h-8 mr-2 self-end" onClick={onCreateEdit}>{onEdit ? 'Edit' : 'Create'} quiz</Button>
                <Toaster />
            </Card>
        </div>
    );
};

export default CreateEditQuiz;
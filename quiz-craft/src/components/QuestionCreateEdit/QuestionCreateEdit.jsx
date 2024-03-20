import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import AnswearCreateEdit from "../AnswerCreateEdit/AnswearCreateEdit";
import SimpleAnswear from "../SimpleAnswer/SimpleAsnwear";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";

const QuestionCreateEdit = ({ quiz, setQuiz, onEdit, setOnEdit, questionId }) => {
    const { toast } = useToast();
    const [question, setQuestion] = useState({
        question: '',
        type: 'single',
        answears: {},
        correct: {}
    });

    useEffect(() => {
        if (onEdit) {
            // TODO: check why question type in not showing when onEdit
            setQuestion({ ...quiz.questions[questionId] });
        }
    }, []);

    const onAddQuestion = () => {
        if (!question.question.length) {
            toast({
                title: "Invalid question",
                description: 'Question cannot be empty!'
            });
            return;
        }
        if (!Object.keys(question.answears).length || Object.keys(question.answears).length < 2) {
            toast({
                title: "Invalid amount of naswers",
                description: 'Question must have at least two answers!'
            });
            return;
        }
        if (question.type === 'single' && Object.keys(question.correct).length === 0) {
            toast({
                title: "No correct answers selected!",
                description: 'You must select one correct answer!'
            });
            return;
        }
        if (question.type === 'multi' && Object.keys(question.correct).length === 0) {
            toast({
                title: "No correct answers selected!",
                description: 'You must select at least one correct answer!'
            });
        }

        if (!onEdit) {
            const currQuestionId = uuidv4();
            quiz.questions[currQuestionId] = question;
            setQuiz({ ...quiz });
            setQuestion({
                question: '',
                type: 'single',
                answears: {},
                correct: {}
            });
        } else {
            quiz.questions[questionId] = question;
            setQuiz({ ...quiz });
            setOnEdit(false);
        }
    };

    return (
        <div className="create-question mt-3 ml-1 flex flex-col rounded-md">
            <Input placeholder="Enter question here" value={question.question} onChange={(e) => setQuestion({ ...question, question: e.target.value })} /><br />
            <RadioGroup defaultValue={question.type} className="flex justify-start ">
                <p className="pl-3 mt-2 mb-2">Choose type of question</p>
                <div className="flex items-center space-x-2" >
                    <RadioGroupItem value="single" id="single" onClick={() => {
                        if (Object.keys(question.correct).length > 0) {
                            question.correct = {};
                        }
                        setQuestion({ ...question, type: 'single' })
                    }} />
                    <Label htmlFor="single">Single</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multi" id="multi" onClick={() => setQuestion({ ...question, type: 'multi' })} />
                    <Label htmlFor="multi">Multi</Label>
                </div>
            </RadioGroup>
            <div className="flex justify-between ">
                <AnswearCreateEdit  question={question} setQuestion={setQuestion} />
                <Button className="mb-1 self-end" variant='ghost' onClick={onAddQuestion}>{onEdit ? "Save" : "Add"} question</Button>
            </div>
            {Object.keys(question.answears).length > 0
                && <ScrollArea className="h-40 p-2">
                    {Object.keys(question.answears)
                        .map(answearId =>
                            <SimpleAnswear
                                key={answearId}
                                answearId={answearId}
                                question={question}
                                setQuestion={setQuestion} />
                        )}
                </ScrollArea>
            }
            <Toaster />
        </div>
    );
};

QuestionCreateEdit.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired,
    onEdit: PropTypes.bool,
    setOnEdit: PropTypes.func,
    questionId: PropTypes.string,
};

export default QuestionCreateEdit;
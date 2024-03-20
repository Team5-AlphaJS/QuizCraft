import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { Trash2, PencilLine } from 'lucide-react';

const SimpleAnswear = ({ answearId, question, setQuestion }) => {
    const [onEdit, setOnEdit] = useState(false);
    const [answear, setAnswear] = useState(question.answears[answearId]);
    const { toast } = useToast();

    const editAnswer = () => {
        setOnEdit(true);
    };

    const onEditAnswear = () => {
        if (!answear) {
            toast({
                title: "Invalid answer",
                description: 'Answers cannot be empty!'
            });
            return;
        }
        question.answears[answearId] = answear;
        setQuestion({ ...question });
        setOnEdit(false);
    }

    const deleteAnswear = () => {
        delete question.answears[answearId];
        setQuestion({ ...question });
    };

    const onMarkCorrect = () => {
        question.correct[answearId] = true;
        setQuestion({ ...question });
    };

    const onMarkIncorrect = () => {
        delete question.correct[answearId];
        setQuestion({ ...question });
    };

    if (onEdit) {
        return (
            <div className="add-answer w-3/4 flex ">
                <Input className="w-2/3 ml-1 mt-2" placeholder="Enter answear" value={answear} onChange={(e) => setAnswear(e.target.value)} />
                <Button className="ml-1 mt-2" variant="ghost" onClick={(e) => {
                    e.preventDefault();
                    onEditAnswear();
                }}>Save</Button>
                <Toaster />
            </div>
        )
    }

    return (
        <div className="answer flex mt-2 border-b-2 mt-3 ml-1 mr-1 justify-between">
            <div className="flex w-full">
                <p className="w-2/3 grow pl-1 pb-1">{question.answears[answearId]}</p>
                {question.type === 'single' && Object.keys(question.correct).length === 0 && <Button variant="link" className="h-6 mr-1 place-self-end" onClick={onMarkCorrect}>Mark as correct</Button>}
                {question.type === 'multi' && !Object.keys(question.correct).includes(answearId) && <Button variant="link" className="h-6 mr-1 place-self-end" onClick={onMarkCorrect}>Mark as correct</Button>}
                {question.correct && Object.keys(question.correct).includes(answearId) && <Button variant="link" className="h-6 mr-1 place-self-end" onClick={onMarkIncorrect}>Mark as incorrect</Button>}
            </div>
            <div className="flex place-self-end">
                <Button className="m-1 border-1  hover:text-blue-400 hover:border-1 hover:border-blue-400" variant="ghost" onClick={editAnswer}><PencilLine /></Button>
                <Button className="m-1 border-1  hover:text-red-400 hover:border-1 hover:border-red-400" variant="ghost" onClick={deleteAnswear}><Trash2 /></Button>
            </div>
        </div>
    );
};

SimpleAnswear.propTypes = {
    answearId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    setQuestion: PropTypes.func.isRequired
};

export default SimpleAnswear;
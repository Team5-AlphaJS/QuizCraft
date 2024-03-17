import { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const SimpleAnswear = ({ answearId, question, setQuestion }) => {
    const [onEdit, setOnEdit] = useState(false);
    const [answear, setAnswear] = useState(question.answears[answearId]);

    const editAnswer = () => {
        setOnEdit(true);
    };

    const onEditAnswear = () => {
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
            <div className="">
                <Input className="w-2/3 mr-2" placeholder="Enter answear" value={answear} onChange={(e) => setAnswear(e.target.value)} />
                <Button href="" onClick={(e) => {
                    e.preventDefault();
                    onEditAnswear();
                }}>save</Button>
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
                <Button className="h-6 mr-1" variant="ghost" onClick={editAnswer}>Edit</Button>
                <Button className="h-6" variant="ghost" onClick={deleteAnswear}>Delete</Button>
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
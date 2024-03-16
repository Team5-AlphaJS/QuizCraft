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
        <div className="answer flex mt-2 border-b-2 mt-3">
            <p className="w-2/3 pl-1 pb-1">{question.answears[answearId]}</p>
            {question.type === 'single' && Object.keys(question.correct).length === 0 && <Button className="h-6 mr-1" onClick={onMarkCorrect}>Mark as correct</Button>}
            {question.type === 'multi' && !Object.keys(question.correct).includes(answearId) && <Button className="h-6 mr-1" onClick={onMarkCorrect}>Mark as correct</Button>}
            {question.correct && Object.keys(question.correct).includes(answearId) && <Button className="h-6 mr-1" onClick={onMarkIncorrect}>Mark as incorrect</Button>}
            <Button className="h-6 bg-sky-500 mr-1" onClick={editAnswer}>Edit</Button>
            <Button className="h-6 bg-red-500" onClick={deleteAnswear}>Delete</Button>
        </div>
    );
};

SimpleAnswear.propTypes = {
    answearId: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    setQuestion: PropTypes.func.isRequired
};

export default SimpleAnswear;
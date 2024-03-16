import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const AnswearCreateEdit = ({ question, setQuestion }) => {
    const [answear, setAnswear] = useState('');

    const onAddAnswear = () => {
        if (!answear) {
            console.log('Answer must be at least 2 characters long!');
            return;
        }
        const answearId = uuidv4();
        question.answears[answearId] = answear;
        setQuestion({ ...question });
        setAnswear('');
    };

    return (
        <div className="add-naswer flex">
            <Input className="w-2/3 mr-2" placeholder="Enter answear" value={answear} onChange={(e) => setAnswear(e.target.value)} />
            <Button href="" onClick={(e) => {
                e.preventDefault();
                onAddAnswear();
            }}>add</Button>
        </div>
    );
};

AnswearCreateEdit.propTypes = {
    question: PropTypes.object.isRequired,
    setQuestion: PropTypes.func.isRequired
};

export default AnswearCreateEdit;
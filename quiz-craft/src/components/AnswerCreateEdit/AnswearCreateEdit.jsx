import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";



const AnswearCreateEdit = ({ question, setQuestion }) => {
    const [answear, setAnswear] = useState('');
    const { toast } = useToast();

    const onAddAnswear = () => {
        if (!answear) {
            toast({
                title: "Invalid answear",
                description: 'Answears cannot be empty!'
            });
            return;
        }
        const answearId = uuidv4();
        question.answears[answearId] = answear;
        setQuestion({ ...question });
        setAnswear('');
    };

    return (
        <div className="add-naswer w-3/4 flex ">
            <Input className="w-2/3 mr-2" placeholder="Enter answer" value={answear} onChange={(e) => setAnswear(e.target.value)} />
            <Button variant="ghost" onClick={(e) => {
                e.preventDefault();
                onAddAnswear();
            }}>Add</Button>
            <Toaster />
        </div>
    );
};

AnswearCreateEdit.propTypes = {
    question: PropTypes.object.isRequired,
    setQuestion: PropTypes.func.isRequired
};

export default AnswearCreateEdit;
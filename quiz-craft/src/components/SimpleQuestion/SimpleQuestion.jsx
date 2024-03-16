
import PropTypes from "prop-types";
import { useState } from "react";
import QuestionCreateEdit from "../QuestionCreateEdit/QuestionCreateEdit";
import { Button } from "../ui/button";

const SimpleQuestion = ({ questionId, quiz, setQuiz }) => {
    const [onEdit, setOnEdit] = useState(false);

    const onDeleteQuestion = () => {
        delete quiz.questions[questionId];
        setQuiz({ ...quiz });
    };

    if (onEdit) {
        return <QuestionCreateEdit quiz={quiz} setQuiz={setQuiz} onEdit={onEdit} setOnEdit={setOnEdit} questionId={questionId} />
    }

    return (
        <div key={questionId} className="flex justify-between border-b-4 ml-2 mb-3">
            <div className="flex flex-col w-2/3 ">
                <h4>{quiz.questions[questionId].question}</h4>
                <div className="added-asnwers flex flex-wrap">
                    {Object.keys(quiz.questions[questionId].answears).map(answerId => <p className="mr-3" key={answerId}>{quiz.questions[questionId].answears[answerId]}</p>)}
                </div>
            </div>
            <div className="flex justify-end w-2/3">
                <Button className="h-6 bg-sky-500 mr-1" onClick={() => setOnEdit(true)}>Edit</Button>
                <Button className="h-6 bg-red-500" onClick={onDeleteQuestion}>Delete</Button>
            </div>
            <hr />
        </div>
    );
};

SimpleQuestion.propTypes = {
    questionId: PropTypes.string.isRequired,
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default SimpleQuestion;
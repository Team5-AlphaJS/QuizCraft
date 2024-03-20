import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getQuizData } from "../../../services/quiz.service";
import { Button } from "../ui/button";
import EnrollQuiz from "./EnrollQuiz";

const OngoingQuizzes = ({ quizzes, setQuizzes }) => {
    const { userData } = useContext(AuthContext);
    const [ongoing, setOngoing] = useState({});
    const [enroll, setEnroll] = useState('');

    useEffect(() => {
        Object.keys(userData.ongoing).map(async quizId => {
            const quizData = await (await getQuizData(quizId)).val();
            quizData.id = quizId;
            ongoing[quizId] = quizData;
            setOngoing({ ...ongoing });
        });
    }, [userData]);

    const onEnroll = (quizId) => {
        setEnroll(quizId);
    };

    if (enroll) {
        return <EnrollQuiz quiz={ongoing[enroll]} ongoing={ongoing} setOngoing={setOngoing} setEnroll={setEnroll} />
    }

    return (
        <div className="flex w-full">
            {Object.keys(ongoing).map(quizId =>
                <div key={quizId} id={quizId} className="flex flex-col pt-6 place-items-center border-b-3 border-l-3 h-2/6 w-1/4 rounded m-1">
                    <p className="text-left w-full pl-2 ml-2">{ongoing[quizId].title}</p>
                    <p className="text-left w-full pl-2 ml-2">Due Date: {new Date(ongoing[quizId].dueDate).toLocaleDateString()}</p>
                    <Button variant="ghost" className="self-center border mt-12 w-1/2" onClick={(e) => onEnroll(e.target.parentNode.id)}>Enroll</Button>
                </div>
            )}
        </div>
    );
};

export default OngoingQuizzes;
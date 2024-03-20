import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getAllQuizzes } from "../../services/quiz.service";
import SimpleQuiz from "@/components/SimpleQuiz/SimpleQuiz";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const ParticipatingIn = () => {
    const { userData } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getAllQuizzes()
            .then(snap => snap.val())
            .then(data => {
                Object.keys(data).map(quizId => {
                    if ('participants' in data[quizId] && userData.username in data[quizId].participants) {
                        data[quizId].id = quizId;
                        quizzes[quizId] = data[quizId];
                        setQuizzes({ ...quizzes });
                    }
                })
            });

    }, [userData]);

    return (
        <div className="flex flex-col  h-[600px]">
            {Object.keys(quizzes).length !== 0 && Object.keys(quizzes).map(quizId => <SimpleQuiz key={quizId} quiz={quizzes[quizId]} quizzes={quizzes} setQuizzes={setQuizzes} onOngoing={true} />)}
            {Object.keys(quizzes).length === 0 && <p>You are not praticipating in any quizes. You can find<Button className="pl-1 pr-0 " onClick={() => navigate('/active')} variant="link"> some </Button> here</p>}
        </div>
    );
};

export default ParticipatingIn;
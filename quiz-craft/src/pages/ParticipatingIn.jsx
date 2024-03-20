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
        <div className="flex flex-col mb-[60px]">
            <p className="text-center text-white p-2 mb-5 mt-5 text-3xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 w-full">
                Quizzes you are participating in
            </p>
            {Object.keys(quizzes).length !== 0 && Object.keys(quizzes).map(quizId => <SimpleQuiz key={quizId} quiz={quizzes[quizId]} quizzes={quizzes} setQuizzes={setQuizzes} onOngoing={true} />)}
            {Object.keys(quizzes).length === 0 && <p className="text-center text-white mb-5 mt-2 font-semibold bg-gradient-to-r from-pink-900 to-red-900 w-full">😔 You are not participating in any quizzes. You can find <Button className="p-0" onClick={() => navigate('/active')} variant="link"> some</Button> here 😊</p>}
        </div>
    );
};

export default ParticipatingIn;
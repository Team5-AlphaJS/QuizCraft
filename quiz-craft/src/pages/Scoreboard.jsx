import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getQuizData } from "../../services/quiz.service";

const Scoreboard = () => {
    const [quizzes, setQuizzes] = useState({});
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (userData) {
            if ('enrolled' in userData) {
                Object.keys(userData.enrolled).map(async quizId => {
                    const res = await getQuizData(quizId);
                    const data = await res.val();
                    quizzes[quizId] = data;
                    setQuizzes({ ...quizzes });
                });
            }
        }

    }, [userData]);

    return (
        <div>
            {Object.keys(quizzes).map(quizId =>
                <div key={quizId}>
                    {Object.keys(quizzes[quizId].participated).map(name => <p key={name}>{quizzes[quizId].participated[name]}</p>)}
                </div>
            )}
        </div>
    );
};

export default Scoreboard;
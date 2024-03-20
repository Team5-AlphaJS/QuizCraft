import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {getAllQuizzes} from "../../services/quiz.service";
const Finished = () => {
    const { userData } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState({});

    useState(() => {
        if (userData && userData.role === "Student") {
            getAllQuizzes()
                .then(snap => snap.val())
                .then(data => {
                    Object.keys(data).map(quizId => {
                        if (data[quizId].dueDate < new Date().getTime()) {
                            if (userData && "invited" in data[quizId] && userData.username in data[quizId].invited
                                || data[quizId].openOrInvite === "open") {
                                data[quizId].id = quizId;
                                quizzes[quizId] = data[quizId];
                                setQuizzes({ ...quizzes });
                            }
                        }
                    });
                });
        } else if (userData && userData.role === 'Educator') {
            getAllQuizzes()
                .then(snap => snap.val())
                .then(data => {
                    Object.keys(data).map(quizId => {
                        if (data[quizId].dueDate < new Date().getTime()) {
                            if (data[quizId].author === userData.username) {
                                data[quizId].id = quizId;
                                quizzes[quizId] = data[quizId];
                                setQuizzes({ ...quizzes });
                            }
                        }
                    })
                });
        }
    }, [userData])

    return (<></>);
};

export default Finished;
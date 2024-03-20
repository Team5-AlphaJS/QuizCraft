import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { getAllQuizzes } from "../../services/quiz.service";
import SimpleQuiz from "@/components/SimpleQuiz/SimpleQuiz";

const ActiveQuizzes = () => {
    const { userData } = useContext(AuthContext);

    const [quizzes, setQuizzes] = useState({});


    useEffect(() => {
        if (userData && userData.role === 'Educator') {
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

    }, [userData]);


    return (
        <div className="flex flex-col">
            <p className="text-center text-white p-2 mb-5 mt-5 text-3xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 w-full">
                Finished Quizzes
            </p>
            <div className="mb-[60px]">
                {Object.keys(quizzes).length !== 0 ? (
                    <>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "invitational" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                ) : (
                    <>

                    </>

                )}

                {Object.keys(quizzes).length !== 0 ? (
                    <>

                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "open" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                ) : (
                    <>

                    </>
                )}
            </div>
        </div>

    );
};

export default ActiveQuizzes;
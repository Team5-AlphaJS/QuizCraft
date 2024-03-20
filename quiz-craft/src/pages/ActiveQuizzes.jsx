import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { getAllQuizzes } from "../../services/quiz.service";
import SimpleQuiz from "@/components/SimpleQuiz/SimpleQuiz";
// import { ScrollArea } from "@/components/ui/scroll-area";


const ActiveQuizzes = () => {
    const { userData } = useContext(AuthContext);

    const [quizzes, setQuizzes] = useState({});


    useEffect(() => {
        if (userData) {
            getAllQuizzes()
                .then(snap => snap.val())
                .then(data => {
                    Object.keys(data).map(quizId => {
                        if (data[quizId].dueDate > new Date().getTime()) {
                            if (userData && "invited" in data[quizId] && userData.username in data[quizId].invited
                                || data[quizId].openOrInvite === "open") {
                                data[quizId].id = quizId;
                                quizzes[quizId] = data[quizId];
                                setQuizzes({ ...quizzes });

                            }
                        }
                    });
                });
        }

    }, [userData]);


    return (
        <div className="flex flex-col">
            <p className="text-center text-white p-2 mb-5 mt-5 text-3xl font-semibold bg-gradient-to-r from-slate-900 to-slate-700 w-full">
                Active Quizzes
            </p>
            <div className="mb-[60px]">
                {Object.keys(quizzes).length !== 0 ? (
                    <>
                        <p className="text-white text-center py-1 mb-2 text-xl bg-gradient-to-r from-slate-800 to-slate-600 w-full">You are invited to participate in</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "invitational" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                ) : (
                    <p className="text-center text-white mb-5 mt-5 font-semibold bg-gradient-to-r from-pink-900 to-red-900 w-full">You are not invited to any quizzes.</p>
                )}

                {Object.keys(quizzes).length !== 0 ? (
                    <>
                        <p className="text-white text-center py-1 text-xl bg-gradient-to-r from-slate-800 to-slate-600 w-full">Open quizzes for everyone</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "open" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                ) : (
                    <p className="text-center text-white mb-5 mt-5 font-semibold bg-gradient-to-r from-pink-900 to-red-900 w-full">There are no open quizzes at the moment.</p>
                )}
            </div>
        </div>

    );
};

export default ActiveQuizzes;
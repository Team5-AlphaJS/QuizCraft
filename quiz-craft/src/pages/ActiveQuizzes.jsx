import { AuthContext } from "../../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { getAllQuizzes } from "../../services/quiz.service";
import SimpleQuiz from "@/components/SimpleQuiz/SimpleQuiz";
import { ScrollArea } from "@/components/ui/scroll-area";


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
        <div className="flex flex-col  h-[600px]">
            <h1 className="text-2xl mb-3 place-self-center">Active Quizzes</h1>
            <ScrollArea className="h-4/5 ml-4 mr-4">
                {Object.keys(quizzes).length !== 0 && (
                    <>
                        <p className="ml-5 text-lg">You are invited to participate in</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "invitational" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                )}

                {Object.keys(quizzes).length !== 0 && (
                    <>
                        <p className="ml-5 text-lg">Open quizzes for everyone</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "open" &&
                            <SimpleQuiz
                                key={quizId}
                                quiz={quizzes[quizId]}
                                quizzes={quizzes}
                                setQuizzes={setQuizzes} />)}
                    </>
                )}
            </ScrollArea>
        </div>

    );
};

export default ActiveQuizzes;
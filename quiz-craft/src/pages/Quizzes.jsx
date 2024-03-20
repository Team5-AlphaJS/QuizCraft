import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import QuizCreate from "@/components/Quizzes/QuizzCreate";
import { Button } from "@nextui-org/react";
import { getAllQuizzes } from "../../services/quiz.service";
import QuizAll from "@/components/Quizzes/QuizzAll";
import OngoingQuizzes from "@/components/Quizzes/OngoingQuizzes";


const Quizzes = () => {
    const { userData } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState({});

    // educator's state
    const [eduState, setEduState] = useState('show');

    // student's state
    const [studentState, setStudentState] = useState('active')

    useEffect(() => {
        getAllQuizzes().then(snap => setQuizzes(snap.val()));
    }, []);

    const show = () => {
        console.log(quizzes)
    }

    return (
        <div className="h-screen">
            {userData && userData.role === 'Educator'
                && (
                    <div className="flex ml-5">
                        <div className="operations flex flex-col mr-2 mt-3">
                            <Button className="mt-1" href="" onClick={() => {
                                setEduState('show');
                            }}>My quizzes</Button>
                            <Button className="mt-1" href="" onClick={() => {
                                setEduState('create');
                            }}>Create quiz</Button>
                            <Button className="mt-1" href="" onClick={() => {
                                setEduState('group');
                            }}>Group quizzes</Button>
                        </div>
                        <div className="dashboard flex justify-start w-full mt-3">
                            {eduState === 'create' && <QuizCreate quizzes={quizzes} setQuizzes={setQuizzes} />}
                            {eduState === 'show' && <QuizAll quizzes={quizzes} setQuizzes={setQuizzes} />}
                        </div>
                    </div>
                )}
            {userData && userData.role === "Student" && (
                <div className="flex h-4/5">
                    <div className="operations p-2 flex flex-col mr-5 mt-3 bg-gradient-to-t from-slate-600 to-slate-800 h-screen">
                        <Button className="mt-1 font-semibold" color="primary" onClick={() => {
                            setStudentState('active');
                        }}>Active</Button>
                        <Button className="mt-2 font-semibold" color="primary" onClick={() => {
                            setStudentState('ongoing');
                        }}>Ongoing</Button>
                    </div>
                    <div className="dashboard w-full mt-3">
                        {studentState === "active" && <QuizAll quizzes={quizzes} setQuizzes={setQuizzes} />}
                        {studentState === "ongoing" && <OngoingQuizzes quizzes={quizzes} setQuizzes={setQuizzes} />}
                    </div>
                </div>
            )}
            <button onClick={show}>show</button>
        </div>
    );
};

export default Quizzes;
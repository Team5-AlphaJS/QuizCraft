import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import QuizCreate from "@/components/Quizzes/QuizzCreate";
import { Button } from "../components/ui/button";


const Quizzes = () => {
    const { userData } = useContext(AuthContext);
    const [createShow, setCreateShow] = useState('show');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // TODO: get all educator's quizzes and set them in the "quizzes" state
    }, []);

    return (
        <div>
            <p>Quizzes page</p>
            {userData && userData.role === 'educator'
                ? (
                    <div className="flex ml-5">
                        <div className="operations flex flex-col mr-2 mt-3">
                            <Button className="mt-1" href="" onClick={(e) => {
                                e.preventDefault();
                                setCreateShow('show');
                            }}>My quizzes</Button>
                            <Button className="mt-1" href="" onClick={(e) => {
                                e.preventDefault();
                                setCreateShow('create');
                            }}>Create quiz</Button>
                            <Button className="mt-1" href="" onClick={(e) => {
                                e.preventDefault();
                                setCreateShow('group');
                            }}>Group quizzes</Button>
                        </div>
                        <div className="dashboard flex justify-start w-full mt-3">
                            {createShow === 'create' && <QuizCreate quizzes={quizzes} setQuizzes={setQuizzes} />}
                            {createShow === 'show' && <p>All quizes</p>}
                        </div>
                    </div>
                )
                : (
                    <p>Hello student</p>
                )
            }
        </div>
    );
};

export default Quizzes;
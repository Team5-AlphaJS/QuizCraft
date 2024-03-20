import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { acceptInvitation, removeInvitation } from "../../../services/users.service";
import { inviteAcceptedQuiz, removeFromInvated } from "../../../services/quiz.service";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";



const SimpleQuiz = ({ quiz, quizzes, setQuizzes, onOngoing }) => {
    const { userData, setContext } = useContext(AuthContext);
    const navigate = useNavigate();

    const onAccept = async () => {
        try {
            // user update
            await acceptInvitation(quiz.id, userData.username);
            await removeInvitation(quiz.id, userData.username);
            // quiz update
            await inviteAcceptedQuiz(userData.username, quiz.id);
            await removeFromInvated(userData.username, quiz.id);
        } catch (e) {
            console.log(e.message);
        } finally {
            delete userData.invitations[quiz.id];
            setQuizzes({ ...quizzes });
            if (!('ongoing' in userData)) {
                userData['ongoing'] = {};
            }
            userData.ongoing[quiz.id] = true;
            setContext((prev) => prev, userData);

            delete quizzes[quiz.id];
            setQuizzes({ ...quizzes });

        }
    };

    const onReject = async () => {
        try {
            // user update
            await removeInvitation(quiz.id, userData.username);
            // quiz update
            await removeFromInvated(userData.username, quiz.id);
        } catch (e) {
            console.log(e.message);
        } finally {
            if ('invited' in quiz) {
                delete quizzes[quiz.id].invited[userData.username];
            }
            delete quizzes[quiz.id];

            userData['ongoing'] = {};
            userData.ongoing[quiz.id] = true;
            setContext((prev) => prev, userData);
            setQuizzes({ ...quizzes });
        }
    }

    const onParticipate = async () => {
        try {
            await acceptInvitation(quiz.id, userData.username);
            await inviteAcceptedQuiz(userData.username, quiz.id);
        } catch (e) {
            console.log(e.message);
        } finally {

            if (!('ongoing' in userData)) {
                userData['ongoing'] = {};
            }
            userData.ongoing[quiz.id] = true;
            setContext((prev) => prev, userData);

            delete quizzes[quiz.id];
            setQuizzes({ ...quizzes });
        }
    }

    return (
        <div className="flex flex-col ml-20 mr-20 border-b-2 rounded m-3 ">
            <div className="flex justify-between pb-2">
                <div className="flex flex-col">
                    <p className="text-xl">{quiz.title}</p>
                    <p className="text-xs text-gray-400">Author {quiz.author}</p>
                </div>
                <p className="text-sm">{quiz.timer} minutes to complete.</p>
            </div>
            {/* <p className="text-sm">Created by: </p> */}
            <p className="text-sm">Subject: {quiz.category}</p>
            <p className="text-sm">Deadline: {new Date(quiz.dueDate).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
            <p className="text-sm">You have {Object.keys(quiz.questions).length} questions to answear.</p>
            {userData && userData.role === "Student" &&
                <>
                    {onOngoing
                        ?
                        <div className="place-self-end">
                            <Button className="m-1 border-1 hover:text-yellow-300 hover:border-1 hover:border-yellow-300" variant="ghost" onClick={() => navigate(`/enroll/${quiz.id}`)}>Enroll</Button>
                        </div>

                        : <>
                            <>
                                {quiz.openOrInvite === 'invitational' &&
                                    <div className="place-self-end">
                                        <Button className="m-1 border-1 hover:text-green-400 hover:border-1 hover:border-green-400" variant="ghost" onClick={onAccept}>Accept</Button>
                                        <Button className="m-1 border-1 hover:text-red-300 hover:border-1 hover:border-red-400" variant="ghost" onClick={onReject}>Reject</Button>
                                    </div>
                                }
                            </>
                            <>
                                {quiz.openOrInvite === 'open' &&
                                    <div className="place-self-end">
                                        <Button className="m-1 border-1 hover:text-green-400 hover:border-1 hover:border-green-400" variant="ghost" onClick={onParticipate}>Particiapte</Button>
                                    </div>
                                }
                            </>
                        </>}
                </>

            }
            {userData.userName === quiz.author &&
                <div>
                    <div>Edit</div>
                    <div>Delete</div>
                </div>
            }
        </div>
    )
};

SimpleQuiz.propTypes = {
    quiz: PropTypes.object.isRequired,
    quizzes: PropTypes.object.isRequired,
    setQuizzes: PropTypes.func.isRequired,
    onOngoing: PropTypes.bool
};

export default SimpleQuiz;


import PropTypes from "prop-types";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { acceptInvitation, removeInvitation } from "../../../services/users.service";
import { inviteAcceptedQuiz, removeFromInvated } from "../../../services/quiz.service";

const QuizAll = ({ quizzes, setQuizzes }) => {
    const { userData } = useContext(AuthContext);

    const onAccept = async (quizId) => {
        try {
            // user update
            await acceptInvitation(quizId, userData.username);
            await removeInvitation(quizId, userData.username);
            // quiz update
            await inviteAcceptedQuiz(userData.username, quizId);
            await removeFromInvated(userData.username, quizId);
        } catch (e) {
            console.log(e.message);
        } finally {
            delete quizzes[quizId].invited[userData.username];
            setQuizzes({ ...quizzes });

        }
    };

    const onReject = async (quizId) => {
        try {
            // user update
            await removeInvitation(quizId, userData.username);
            // quiz update
            await removeFromInvated(userData.username, quizId);
        } catch (e) {
            console.log(e.message);
        } finally {
            delete quizzes[quizId].invited[userData.username];
            setQuizzes({ ...quizzes });
        }
    }

    const onParticipate = async (quizId) => {
        try {
            await acceptInvitation(quizId, userData.username);
            await inviteAcceptedQuiz(userData.username, quizId);
        } catch (e) {
            console.log(e.message);
        } finally {
            quizzes[quizId]["participants"][userData.username] = true;
            setQuizzes({ ...quizzes });
        }
    }


    return (
        <div>
            {
                userData.role === "Student" &&
                <div className="quizzes-list">
                    <div className="invitational">
                        <p>Invitational</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "invitational" && "invited" in quizzes[quizId] && userData.username in quizzes[quizId].invited &&
                            <div key={quizId}>
                                <p>{quizzes[quizId].title}</p>
                                {userData.invitations && quizId in userData.invitations &&
                                    <div id={quizId}>
                                        <button onClick={(e) => onAccept(e.target.parentNode.id)}>Accept</button>
                                        <button onClick={(e) => onReject(e.target.parentNode.id)}>Reject</button>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                    <div className="open">
                        <p>Open</p>
                        {Object.keys(quizzes).map(quizId =>
                            quizzes[quizId].openOrInvite === "open" && ("participants" in quizzes[quizId] && !(userData.username in quizzes[quizId].participants)) && 
                            <div key={quizId} id={quizId}>
                                <p>{quizzes[quizId].title}</p>
                                <button onClick={(e) => onParticipate(e.target.parentNode.id)}>Participate</button>
                            </div>
                        )}
                    </div>
                </div>
            }

        </div>
    );
};

QuizAll.propTypes = {
    quizzes: PropTypes.object.isRequired,
    setQuizzes: PropTypes.func.isRequired
};

export default QuizAll;
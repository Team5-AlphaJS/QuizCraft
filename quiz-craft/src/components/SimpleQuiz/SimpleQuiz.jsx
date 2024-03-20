import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  acceptInvitation,
  removeInvitation,
} from '../../../services/users.service';
import {
  inviteAcceptedQuiz,
  removeFromInvated,
} from '../../../services/quiz.service';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, Divider } from '@nextui-org/react';
import { Check, X, BookCheck, BookOpenCheck } from 'lucide-react';

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
  };

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
  };

  return (
    <Card
      className="flex flex-col mx-20 my-8 border border-slate-900"
      shadow="lg"
    >
      <CardHeader className="flex justify-between pb-2">
        <div className="flex flex-col">
          <p className="text-2xl">{quiz.title}</p>
          <p className="text-sm text-gray-400">Author: {quiz.author}</p>
        </div>
        <p className="text-lg">{quiz.timer} minutes to complete.</p>
      </CardHeader>
      <Divider />
      <CardBody
        className={
          quiz.category === 'math'
            ? 'bg-gradient-to-br from-blue-700 to-slate-800  text-white'
            : quiz.category === 'biology'
            ? 'bg-gradient-to-br from-red-700 to-slate-800 text-white'
            : quiz.category === 'history'
            ? 'bg-gradient-to-br from-yellow-800 to-slate-800 text-white'
            : quiz.category === 'science'
            ? 'bg-gradient-to-br from-green-800 to-slate-800 text-white'
            : quiz.category === 'chemistry'
            ? 'bg-gradient-to-br from-purple-800 to-slate-800 text-white'
            : 'bg-gradient-to-br from-slate-600 to-slate-800 text-white'
        }
      >
        <p>Subject: {quiz.category}</p>
        <p>
          Deadline:{' '}
          {new Date(quiz.dueDate).toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
        <p>
          You have {Object.keys(quiz.questions).length} questions to answer.
        </p>
        {userData && userData.role === 'Student' && (
          <>
            {onOngoing ? (
              <div className="place-self-end">
                <Button
                  className="m-1 border-1 border-slate-600 hover:text-yellow-300 hover:border-1 hover:border-yellow-300 text-white"
                  variant="ghost"
                  startContent={<BookOpenCheck />}
                  onClick={() => navigate(`/enroll/${quiz.id}`)}
                >
                  Enroll
                </Button>
              </div>
            ) : (
              <>
                <>
                  {quiz.openOrInvite === 'invitational' && (
                    <div className="place-self-end">
                      <Button
                        className="m-1 border-1 border-slate-600 hover:text-green-400 hover:border-1 hover:border-green-400 text-white"
                        variant="ghost"
                        startContent={<Check />}
                        onClick={onAccept}
                      >
                        Accept
                      </Button>
                      <Button
                        className="m-1 border-1 border-slate-600 hover:text-red-300 hover:border-1 hover:border-red-400 text-white"
                        variant="ghost"
                        startContent={<X />}
                        onClick={onReject}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </>
                <>
                  {quiz.openOrInvite === 'open' && (
                    <div className="place-self-end">
                      <Button
                        className="m-1 border-1 border-slate-600 hover:text-sky-500 hover:border-1 hover:border-sky-500 text-white"
                        variant="ghost"
                        startContent={<BookCheck />}
                        onClick={onParticipate}
                      >
                        Participate
                      </Button>
                    </div>
                  )}
                </>
              </>
            )}
          </>
        )}
        {userData.userName === quiz.author && (
          <div>
            <div>Edit</div>
            <div>Delete</div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

SimpleQuiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  quizzes: PropTypes.object.isRequired,
  setQuizzes: PropTypes.func.isRequired,
  onOngoing: PropTypes.bool,
};

export default SimpleQuiz;

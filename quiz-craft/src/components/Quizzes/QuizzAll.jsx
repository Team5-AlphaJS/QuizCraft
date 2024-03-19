import PropTypes from 'prop-types';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import {
  acceptInvitation,
  removeInvitation,
} from '../../../services/users.service';
import {
  inviteAcceptedQuiz,
  removeFromInvated,
} from '../../../services/quiz.service';
import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Divider,
} from '@nextui-org/react';
import { Check, X, BookCheck } from 'lucide-react';

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
  };

  const onParticipate = async (quizId) => {
    try {
      await acceptInvitation(quizId, userData.username);
      await inviteAcceptedQuiz(userData.username, quizId);
    } catch (e) {
      console.log(e.message);
    } finally {
      quizzes[quizId]['participants'][userData.username] = true;
      setQuizzes({ ...quizzes });
    }
  };

  return (
    <div>
      {userData.role === 'Student' && (
        <div className="quizzes-list grid grid-cols-2">
          <div className="invitational">
            <p className="text-center text-white p-2 mb-5 text-2xl font-semibold bg-gradient-to-l from-slate-600 to-slate-800 w-[95%]">
              Invitation Quizzes
            </p>
            <div className="grid grid-cols-2 gap-7 w-[95%]">
              {Object.keys(quizzes).map(
                (quizId) =>
                  quizzes[quizId].openOrInvite === 'invitational' &&
                  'invited' in quizzes[quizId] &&
                  userData.username in quizzes[quizId].invited && (
                    <>
                      <Card className="border border-slate-900" shadow="lg">
                        <CardHeader className="flex items-center justify-center">
                          <p>
                            {quizzes[quizId].title} from{' '}
                            {quizzes[quizId].author}
                          </p>
                        </CardHeader>
                        <Divider />
                        <CardFooter className="flex justify-center">
                          {userData.invitations &&
                            quizId in userData.invitations && (
                              <div id={quizId} className="space-x-5">
                                <Button
                                  startContent={<Check />}
                                  variant="ghost"
                                  color="primary"
                                  onClick={(e) =>
                                    onAccept(e.target.parentNode.id)
                                  }
                                >
                                  Accept
                                </Button>
                                <Button
                                  startContent={<X />}
                                  variant="ghost"
                                  color="danger"
                                  onClick={(e) =>
                                    onReject(e.target.parentNode.id)
                                  }
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                        </CardFooter>
                      </Card>
                    </>
                  )
              )}
            </div>
          </div>
          <div className="open">
            <p className="text-center text-white p-2 mb-5 text-2xl font-semibold bg-gradient-to-r from-slate-600 to-slate-800 w-[97%]">
              Open Quizzes
            </p>
            <div className="grid grid-cols-2 gap-7 w-[97%]">
              {Object.keys(quizzes).map(
                (quizId) =>
                  quizzes[quizId].openOrInvite === 'open' &&
                  'participants' in quizzes[quizId] &&
                  !(userData.username in quizzes[quizId].participants) && (
                    <>
                      <Card className="border border-slate-900" shadow="lg">
                        <CardHeader className="flex items-center justify-center">
                          <p>{quizzes[quizId].title}</p>
                        </CardHeader>
                        <Divider />
                        <CardFooter className="flex justify-center">
                          <div id={quizId}>
                            <Button
                              startContent={<BookCheck />}
                              variant="ghost"
                              color="warning"
                              onClick={(e) =>
                                onParticipate(e.target.parentNode.id)
                              }
                            >
                              Participate
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

QuizAll.propTypes = {
  quizzes: PropTypes.object.isRequired,
  setQuizzes: PropTypes.func.isRequired,
};

export default QuizAll;

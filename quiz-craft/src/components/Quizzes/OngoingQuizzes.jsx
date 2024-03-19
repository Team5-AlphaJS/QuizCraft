import { AuthContext } from '../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { getQuizData } from '../../../services/quiz.service';
import { Button } from '@nextui-org/react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { motion } from 'framer-motion';
import EnrollQuiz from './EnrollQuiz';

const OngoingQuizzes = () => {
  const { userData } = useContext(AuthContext);
  const [ongoing, setOngoing] = useState({});
  const [enroll, setEnroll] = useState('');

  useEffect(() => {
    Object.keys(userData.ongoing).map(async (quizId) => {
      const quizData = await (await getQuizData(quizId)).val();
      ongoing[quizId] = quizData;
      setOngoing({ ...ongoing });
    });
  }, [userData]);

  const onEnroll = (quizId) => {
    setEnroll(quizId);
  };

  if (enroll) {
    return <EnrollQuiz quiz={ongoing[enroll]} setEnroll={setEnroll} />;
  }

  return (
    <div className="grid grid-cols-4 gap-7 w-[98%]">
      {Object.keys(ongoing).map((quizId) => (
        <div key={quizId} className="flex flex-col space-x-3">
          <Card>
            <CardHeader className="flex items-center justify-center">
              <p className="text-2xl">{ongoing[quizId].title}</p>
            </CardHeader>
            <CardBody
              className={
                ongoing[quizId].category === 'math'
                  ? 'bg-blue-900 border-y-2 border-white text-white'
                  : ongoing[quizId].category === 'biology'
                  ? 'bg-red-800 border-y-2 border-white text-white'
                  : ongoing[quizId].category === 'history'
                  ? 'bg-yellow-800 border-y-2 border-white text-white'
                  : ongoing[quizId].category === 'science'
                  ? 'bg-green-800 border-y-2 border-white text-white'
                  : ongoing[quizId].category === 'chemistry'
                  ? 'bg-purple-800 border-y-2 border-white text-white'
                  : 'bg-slate-800 border-y-2 border-white text-white'
              }
            >
              <p>By: {ongoing[quizId].author}</p>
              <p>Category: {ongoing[quizId].category}</p>
              <p>
                Due Date:{' '}
                {new Date(ongoing[quizId].dueDate).toLocaleDateString()}
              </p>
            </CardBody>
            <CardFooter>
              <motion.div whileHover={{scale: 1.1}} id={quizId} className="w-full pt-2 px-2">
                <Button
                  variant="ghost"
                  className={
                    ongoing[quizId].category === 'math'
                      ? 'w-full border-2 border-blue-900'
                      : ongoing[quizId].category === 'biology'
                      ? 'w-full border-2 border-red-800'
                      : ongoing[quizId].category === 'history'
                      ? 'w-full border-2 border-yellow-800'
                      : ongoing[quizId].category === 'science'
                      ? 'w-full border-2 border-green-800'
                      : ongoing[quizId].category === 'chemistry'
                      ? 'w-full border-2 border-purple-800'
                      : 'w-full border-2 border-slate-800'
                  }
                  onClick={(e) => onEnroll(e.target.parentNode.id)}
                >
                  Enroll
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OngoingQuizzes;

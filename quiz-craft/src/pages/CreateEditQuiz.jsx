import { useContext, useEffect, useState } from 'react';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import OpenInvite from '../components/OpenInvite/OpenInvite';
import QuestionCreateEdit from '../components/QuestionCreateEdit/QuestionCreateEdit';
import SetDate from '../components/SetDate/SetDate';
import SetTimer from '../components/SetTimer/SetTimer';
import SimpleQuestion from '../components/SimpleQuestion/SimpleQuestion';
import { Button } from '../components/ui/button';
// import { Card, CardHeader, CardBody, CardFooter } from '../components/ui/card';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Toaster } from '../components/ui/toaster';
import { useToast } from '../components/ui/use-toast';
import { AuthContext } from '../../context/AuthContext';
import {
  createQuiz,
  inviteStudent,
  editQuiz,
} from '../../services/quiz.service';
import Scoring from '../components/Scoring/Scoring';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizData } from '../../services/quiz.service';

const CreateEditQuiz = () => {
  const { userData } = useContext(AuthContext);
  const id = useParams().id;
  const navigate = useNavigate();

  const [onEdit, setOnEdit] = useState(false);

  const [quiz, setQuiz] = useState({
    title: '',
    category: '',
    openOrInvite: '',
    questions: {},
    timer: 60,
    dueDate: '',
    author: userData?.username || '',
    score: 100,
  });

  useEffect(() => {
    if (window.location.href.split('/')[3] === 'edit-quiz') {
      setOnEdit('true');
    }
  }, []);

  useEffect(() => {
    if (onEdit) {
      getQuizData(id)
        .then((snap) => snap.val())
        .then((data) => setQuiz(data));
    }
  }, [onEdit]);

  const { toast } = useToast();

  const onCreateEdit = async () => {
    if (quiz.title.length < 3 || quiz.title.length > 30) {
      toast({
        title: 'Invalid title',
        description: 'Title must be between 3 and 30 characters long!',
      });
      return;
    }

    if (!quiz.category) {
      toast({
        title: 'Invalid category',
        description: 'Please select a category!',
      });
      return;
    }

    if (!quiz.openOrInvite) {
      toast({
        title: 'Invalid availability',
        description: 'Plesase select to whome is the quiz available!',
      });
      return;
    }

    if (
      quiz.openOrInvite === 'invitational' &&
      (!('invited' in quiz) || Object.keys(quiz.invited) === 0)
    ) {
      toast({
        title: 'No participants/students',
        description: 'You must invite at least one student',
      });
      return;
    }

    if (Object.keys(quiz.questions).length === 0) {
      toast({
        title: 'No questions',
        description: 'Please provide at least one question',
      });
      return;
    }

    try {
      let response;
      if (onEdit) {
        response = await editQuiz(id, quiz);
      } else {
        response = await createQuiz(quiz);
      }
      if (quiz.openOrInvite === 'invitational') {
        const quizId = response._path.pieces_[1];
        const invitation = {
          status: 'pending',
        };
        Object.keys(quiz.invited).map(
          async (participant) =>
            await inviteStudent(participant, invitation, quizId)
        );
      }
    } catch (e) {
      toast({
        title: 'Something went wrong',
        description: e.message,
      });
    } finally {
      toast({
        title: `Quiz ${onEdit ? 'edited' : 'created'} successfully`,
      });
      if (onEdit) {
        navigate('/active');
      } else {
        setQuiz({
          title: '',
          category: '',
          openOrInvite: '',
          questions: {},
          timer: 0,
          dueDate: '',
          author: userData.username,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-4 mb-[65px]">
      <Card shadow='lg' className="flex flex-col items-center w-3/5 border border-slate-900">
          <p className="text-2xl font-semibold mt-2">
            {onEdit ? 'Edit' : 'Create'} a quiz
          </p>
        <CardHeader>
          <Input
            type="text"
            id="quiz-title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="w-4/5 mt-4"
            placeholder="Enter quiz title"
          />
          <div className=" mt-1 mb-1 flex justify-start ">
            <CategorySelect quiz={quiz} setQuiz={setQuiz} />{' '}
            <OpenInvite quiz={quiz} setQuiz={setQuiz} />{' '}
            <SetTimer quiz={quiz} setQuiz={setQuiz} />{' '}
            <SetDate quiz={quiz} setQuiz={setQuiz} />
            <Scoring quiz={quiz} setQuiz={setQuiz} />
          </div>
        </CardHeader>
        <CardBody>
          <div className="w-4/5">
            <QuestionCreateEdit quiz={quiz} setQuiz={setQuiz} />
          </div>
          <div className="added-questions w-4/5">
            <p className="text-xl ml-1 mt-2">Questions:</p>
            {Object.keys(quiz.questions).length > 0 ? (
              <ScrollArea className="">
                <div className="p-4">
                  {quiz.questions &&
                    Object.keys(quiz.questions).map((questionId) => (
                      <SimpleQuestion
                        key={questionId}
                        questionId={questionId}
                        quiz={quiz}
                        setQuiz={setQuiz}
                      />
                    ))}
                </div>
              </ScrollArea>
            ) : (
              <p className='ml-1'>No questions added.</p>
            )}
          </div>
        </CardBody>
        <CardFooter className='flex justify-end'>
          <Button
            className="w-1/6 h-8 mr-2 mb-2"
            onClick={onCreateEdit}
          >
            {onEdit ? 'Edit' : 'Create'} quiz
          </Button>
        </CardFooter>
        <Toaster />
      </Card>
    </div>
  );
};

export default CreateEditQuiz;

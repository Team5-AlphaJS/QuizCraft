import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectItem } from '@nextui-org/react';
import { createQuiz } from '/services/quiz.service';

const CreateQuizForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit } = useForm();
  const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', ''] }]);

  const onSubmit = async (data) => {
    try {
      await createQuiz(data)

      toast({
        title: 'Quiz Created',
        description: 'Your quiz has been created successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create quiz. Please try again later.',
      });
    }


  };

  const onSubmitQuestion = async (quizId, data) => {
    try {
      await createQuizQuestion(quizId, data);
      toast({
        title: 'Question Added',
        description: 'Your question was added successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create question. Please try again later'
      })

    }
  }
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answers: ['', '', '', ''] }]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('title')} placeholder="Title" />
        <Input {...register('category')} placeholder="Category" />
        <Select label="Type" {...register('type')}>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="invitational">Invitational</SelectItem>
        </Select>
        <Button type="submit">Create Quiz</Button>
      {questions.map((question, index) => (
          <div key={index}>
            <Input
              placeholder={`Question ${index + 1}`}
              value={question.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
            {question.answers.map((answer, answerIndex) => (
              <Input
                key={answerIndex}
                placeholder={`Answer ${answerIndex + 1}`}
                value={answer}
                onChange={(e) => handleAnswerChange(index, answerIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
        <Button type="button" onClick={handleAddQuestion}>Add Question</Button>
        </form>        
    </div>
  );
}

export default CreateQuizForm;
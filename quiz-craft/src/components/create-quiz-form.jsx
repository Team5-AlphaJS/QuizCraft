import { useForm, useFieldArray } from 'react-hook-form';
import { createQuiz } from '/services/quiz.service';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectItem } from '@nextui-org/react';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import { AuthContext } from '/context/AuthContext';

const CreateQuizForm = () => {
  const { userData } = useContext(AuthContext);
  const { toast } = useToast();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      owner: userData.uid,
      title: '',
      id: uuidv4(),
      category: '',
      type: 'open',
      timer: 0,
      questions: [{ id: uuidv4(), question: '', answers: ['', '', '', ''], correctAnswer: 0, points: 1 }],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const onSubmit = async (data) => {
    try {
      await createQuiz(data);
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

  return (
    <div className="flex-auto mx-20 px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:
          <Input {...register('title')} />
        </label>
        <br />
        <label>
          Category:
          <Input {...register('category')} />
        </label>
        <br />
        <label>
          Type of Quiz:
          <Select {...register('type')} defaultValue="open">
            <SelectItem textValue="open">Open</SelectItem>
            <SelectItem textValue="invitational">Invitational</SelectItem>
          </Select>
        </label>
        <br />
        <label>
          Timer (in minutes):
          <Input type="number" {...register('timer')} />
        </label>
        <br />
        {fields.map((question, index) => (
          <div key={question.id}>
            <label>
              Question {index + 1}:
              <Input {...register(`questions.${index}.question`)} />
            </label>
            <br />
            <label>
              Points:
              <Input type="number" {...register(`questions.${index}.points`)} />
            </label>
            <br />
            <label>
              Answers:
              {question.answers.map((_, answerIndex) => (
                <Input key={answerIndex} {...register(`questions.${index}.answers.${answerIndex}`)} />
              ))}
            </label>
            <br />
            <label>
              Correct Answer:
              <Select {...register(`questions.${index}.correctAnswer`)}>
                {[0, 1, 2, 3].map((option) => (
                  <SelectItem key={option} value={option}>{option + 1}</SelectItem>
                ))}
              </Select>
            </label>
            <Button type="button" onClick={() => remove(index)}>Remove Question</Button>
            <br />
          </div>
        ))}
        <Button type="button" onClick={() => append({ question: '', answers: ['', '', '', ''], correctAnswer: 0, points: 1 })}>
          Add Question
        </Button>
        <br />
        <div className="flex justify-center pt-10 pb-20">
          <Button type="submit">Create Quiz</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuizForm;
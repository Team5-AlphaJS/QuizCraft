import { useForm, useFieldArray } from 'react-hook-form';
import { createQuiz } from '/services/quiz.service';
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectItem } from '@nextui-org/react';

const CreateQuizForm = () => {
  const { toast } = useToast();
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: '',
      questions: [{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }],
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Title:
        <Input {...register('title', { required: true })} />
      </label>
      <br />
      {fields.map((question, index) => (
        <div key={question.id}>
          <label>
            Question {index + 1}:
            <Input {...register(`questions.${index}.question`, { required: true })} />
          </label>
          <br />
          <label>
            Answers:
            {question.answers.map((answer, answerIndex) => (
              <Input key={answer.id} {...register(`questions.${index}.answers.${answerIndex}`, { required: true })} />
            ))}
          </label>
          <br />
          <label>
            Correct Answer:
            <Select {...register(`questions.${index}.correctAnswer`)}>
              {[0, 1, 2, 3].map((option) => (
                <SelectItem key={option} value={option}>
                  {option + 1}
                </SelectItem>
              ))}
            </Select>
          </label>
          <Button type="button" onClick={() => remove(index)}>Remove Question</Button>
          <br />
        </div>
      ))}
      <Button type="button" onClick={() => append({ question: '', answers: ['', '', '', ''], correctAnswer: 0 })}>
        Add Question
      </Button>
      <br />
      <Button type="submit">Create Quiz</Button>
    </form>
  );
};

export default CreateQuizForm;
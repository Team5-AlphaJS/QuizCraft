import { useForm, useFieldArray } from 'react-hook-form';
import { updateQuiz } from '/services/quiz.service'; // Assuming you have implemented updateQuiz function
import { useToast } from './ui/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectItem } from '@nextui-org/react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '/context/AuthContext';

const EditQuizForm = ({ quizData }) => {
  const { userData } = useContext(AuthContext);
  const { toast } = useToast();
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    if (quizData) {
      setDefaultValues({
        owner: userData.uid,
        title: quizData.title,
        id: quizData.id,
        category: quizData.category,
        type: quizData.type,
        timer: quizData.timer,
        questions: quizData.questions.map((question) => ({
          ...question,
          id: question.id || uuidv4(), // Ensure each question has an ID
        })),
      });
    }
  }, [quizData, userData.uid]);

  const { register, handleSubmit, control } = useForm({
    defaultValues: defaultValues,
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'questions' });

  const onSubmit = async (data) => {
    try {
      await updateQuiz(data);
      toast({
        title: 'Quiz Updated',
        description: 'Your quiz has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quiz. Please try again later.',
      });
    }
  };

  return (
    <div className="flex-auto mx-20 px-10">
      {defaultValues && (
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
            <Select {...register('type')}>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="invitational">Invitational</SelectItem>
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
                  <Input
                    key={answerIndex}
                    {...register(`questions.${index}.answers.${answerIndex}`)}
                  />
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
              <Button type="button" onClick={() => remove(index)}>
                Remove Question
              </Button>
              <br />
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              append({ question: '', answers: ['', '', '', ''], correctAnswer: 0, points: 1 })
            }
          >
            Add Question
          </Button>
          <br />
          <div className="flex justify-center pt-10 pb-20">
            <Button type="submit">Update Quiz</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditQuizForm;
import { useState, useEffect } from 'react';
import { getAllQuizzes } from '/services/quiz.service'; // Importing the function to fetch quizzes
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
// import { useNavigate } from 'react-router-dom';
import { removeQuiz } from '/services/quiz.service';
import { useToast } from '../ui/use-toast';
import { Toaster } from '../ui/toaster';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Accordion,
  AccordionItem,
  Button,
} from '@nextui-org/react';
import { Edit, Trash, Search } from 'lucide-react';

const QuizList = () => {
  //   const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [origQuizzes, setOrigQuizzes] = useState([]);

  // search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  // sorting stats
  const [desc, setDesc] = useState(false);
  const [sortBy, setSortBy] = useState('title');

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const { toast } = useToast();

  const sortQuizzes = (quizzesGiven) => {
    return desc
      ? sortBy === 'dueDate' || sortBy === 'timer' || sortBy === 'score'
        ? quizzesGiven.sort((quizA, quizB) => quizB[sortBy] - quizA[sortBy])
        : quizzesGiven.sort((quizA, quizB) =>
            quizB[sortBy]
              .toLowerCase()
              .localeCompare(quizA[sortBy].toLowerCase())
          )
      : sortBy === 'dueDate' || sortBy === 'timer' || sortBy === 'score'
      ? quizzesGiven.sort((quizA, quizB) => quizA[sortBy] - quizB[sortBy])
      : quizzesGiven.sort((quizA, quizB) =>
          quizA[sortBy].toLowerCase().localeCompare(quizB[sortBy].toLowerCase())
        );
  };

  // setting the quizzes in the state
  useEffect(() => {
    getAllQuizzes().then((snapshot) => {
      const quizIds = Object.keys(snapshot.val()); // quiz ids
      const quizData = Object.values(snapshot.val()); // quiz data
      const quizzes = quizIds.map((id, index) => {
        // map the quiz data to the quiz ids
        return {
          id,
          ...quizData[index],
        };
      });
      const sortedQuizzes = sortQuizzes(quizzes);
      setQuizzes([...sortedQuizzes]);
      setOrigQuizzes([...sortedQuizzes]);
    });
  }, []);

  // sorting quizzes
  useEffect(() => {
    setQuizzes([...sortQuizzes(quizzes)]);
  }, [sortBy, desc]);

  // filter quizzes by searchTerm and group
  useEffect(() => {
    let filteredQuizzes = origQuizzes;

    if (searchTerm) {
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz[searchBy].startsWith(searchTerm)
      );
    }

    // Apply additional filtering logic for groups if needed

    setQuizzes([...filteredQuizzes]);
  }, [searchTerm, searchBy]);

  const handleEditQuizClick = (quizId) => {
    // TODO: navigate to the quiz edit page or open a modal to edit the quiz
    console.log('Edit quiz:', quizId);
  };

  const handleRemoveQuizClick = async (quizId) => {
    try {
      await removeQuiz(quizId);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== quizId)
      );
      toast({
        title: 'Quiz removed successfully',
        description: 'The quiz has been removed successfully.',
      });
    } catch (error) {
      console.error('Error removing quiz:', error);
    }
  };

  return (
    <>
      <div className="flex flex-row w-full mb-2">
        <Input
          type="text"
          placeholder="search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          color="primary"
          variant="ghost"
          className="ml-2"
          startContent={<Search />}
        >
          Search
        </Button>
      </div>

      <div className="flex mt-0.5 mb-10 h-[440px]">
        <ScrollArea className="list-of-quizzes w-2/3 border-r-4 h-full">
          <div className="pt-3">
            {quizzes.length > 0 ? (
              <p className="text-xl font-semibold text-center pb-2">
                Total number of quizzes: {quizzes.length}{' '}
              </p>
            ) : (
              <p className="text-xl font-semibold text-center pb-2">
                No quizzes found.
              </p>
            )}
            {quizzes &&
              quizzes.map((quiz) => (
                <Card key={quiz.id} className="mb-4 max-w-[80%]" isBlurred>
                  <CardHeader className="text-center font-bold text-xl">
                    <p>{quiz.title}</p>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p>Author: {quiz.author}</p>
                    <p>Category: {quiz.category}</p>
                    <p>Availability: {quiz.openOrInvite}</p>
                    <p>Time to solve: {quiz.timer} minutes</p>
                    <p>Total Score: {quiz.score} points</p>
                    <p>
                      Due Date:{' '}
                      {new Date(quiz.dueDate).toLocaleDateString(
                        'en-US',
                        options
                      )}
                    </p>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <Button
                      onClick={() => handleEditQuizClick(quiz.id)}
                      className="mr-2"
                      color="primary"
                      startContent={<Edit />}
                      variant="ghost"
                    >
                      Edit quiz
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          color="danger"
                          variant="ghost"
                          startContent={<Trash />}
                        >
                          Remove quiz
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete this quiz from the app.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={() => handleRemoveQuizClick(quiz.id)}
                            color="danger"
                          >
                            Remove
                          </Button>
                          <DialogClose asChild>
                            <Button color="primary">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </ScrollArea>

        <div className="options ml-3">
          <Accordion
            variant="bordered"
            className="w-[415px]"
            selectionMode="multiple"
          >
            <AccordionItem title="Search by">
              <RadioGroup defaultValue="title" className="mb-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="title"
                    id="search-title"
                    onClick={() => setSearchBy('title')}
                  />
                  <Label htmlFor="search-title">Title</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="author"
                    id="search-author"
                    onClick={() => setSearchBy('author')}
                  />
                  <Label htmlFor="search-author">Author</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="category"
                    id="search-category"
                    onClick={() => setSearchBy('category')}
                  />
                  <Label htmlFor="search-category">Category</Label>
                </div>
              </RadioGroup>
            </AccordionItem>

            <AccordionItem title="Sort by">
              <div className="sort-by">
                <div className="flex flex-row">
                  <p className="text-l">Sort order:</p>
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setDesc(!desc);
                    }}
                    className="ml-2"
                  >
                    {!desc ? 'Desc' : 'Asc'}
                  </Link>
                </div>
                <RadioGroup defaultValue="title" className="mb-3">
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem
                      value="title"
                      id="sort-title"
                      onClick={() => setSortBy('title')}
                    />
                    <Label htmlFor="sort-title">Title</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="author"
                      id="sort-author"
                      onClick={() => setSortBy('author')}
                    />
                    <Label htmlFor="sort-author">Author</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="category"
                      id="sort-category"
                      onClick={() => setSortBy('category')}
                    />
                    <Label htmlFor="sort-category">Category</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="dueDate"
                      id="sort-dueDate"
                      onClick={() => setSortBy('dueDate')}
                    />
                    <Label htmlFor="sort-dueDate">Due Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="timer"
                      id="sort-timer"
                      onClick={() => setSortBy('timer')}
                    />
                    <Label htmlFor="sort-timer">Time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="score"
                      id="sort-score"
                      onClick={() => setSortBy('score')}
                    />
                    <Label htmlFor="sort-score">Score</Label>
                  </div>
                </RadioGroup>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default QuizList;

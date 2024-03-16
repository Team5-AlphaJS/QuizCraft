import { useState, useEffect } from 'react';
import { getAllQuizzes } from '/services/quiz.service'; // Importing the function to fetch quizzes
import { Input, Button, Link, Accordion, AccordionItem } from '@nextui-org/react'; // Import Next UI components
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
const QuizList = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [origQuizzes, setOrigQuizzes] = useState([]);

    // search states
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('title');

    // sorting stats
    const [desc, setDesc] = useState(false);
    const [sortBy, setSortBy] = useState('title');

    const sortQuizzes = (quizzesGiven) => {
        return desc
            ? sortBy === 'createdOn'
                ? quizzesGiven.sort((quizA, quizB) => quizB[sortBy] - quizA[sortBy])
                : quizzesGiven.sort((quizA, quizB) => quizB[sortBy].toLowerCase().localeCompare(quizA[sortBy].toLowerCase()))
            : sortBy === 'createdOn'
                ? quizzesGiven.sort((quizA, quizB) => quizA[sortBy] - quizB[sortBy])
                : quizzesGiven.sort((quizA, quizB) => quizA[sortBy].toLowerCase().localeCompare(quizB[sortBy].toLowerCase()));
    };

    // setting the quizzes in the state
    useEffect(() => {
        getAllQuizzes().then(snapshot => {
            const sortedQuizzes = sortQuizzes(Object.values(snapshot.val()));
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
            filteredQuizzes = filteredQuizzes.filter(quiz => quiz[searchBy].startsWith(searchTerm));
        }

        // Apply additional filtering logic for groups if needed

        setQuizzes([...filteredQuizzes]);
    }, [searchTerm, searchBy]);

    const handleManageQuizClick = () => {
      navigate()
    }

    return (
        <>
            <div className="flex flex-col space-y-2">
                <Input type="text" placeholder="Search term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button className='ml-2'>Search</Button>
            </div>
            <div className="flex flex-row mt-2">
                <Accordion className="w-1/4 mr-4">
                    <AccordionItem title="Search by">
                        <RadioGroup defaultValue="title">
                            <Label htmlFor="title-id">Title</Label>
                            <RadioGroupItem value="title" id="title-id" onClick={() => setSearchBy('title')} ></RadioGroupItem>
                            <RadioGroupItem value="category" onClick={() => setSearchBy('category')} >Category</RadioGroupItem>
                            {/* Add more options as needed */}
                        </RadioGroup>
                    </AccordionItem>
                    <AccordionItem title="Sort by">
                        <RadioGroup defaultValue="title">
                            <RadioGroupItem value="title" onClick={() => setSortBy('title')} >Title</RadioGroupItem>
                            <RadioGroupItem value="category" onClick={() => setSortBy('category')} >Category</RadioGroupItem>
                            {/* Add more options as needed */}
                        </RadioGroup>
                        <Link href="" onClick={(e) => {
                            e.preventDefault();
                            setDesc(!desc);
                        }}>{!desc ? "Desc" : "Asc"}</Link>
                    </AccordionItem>
                    {/* Add more accordion items as needed */}
                </Accordion>
                <div className="flex flex-col">
                    {quizzes.length > 0 && <p className="text-lg font-semibold">Total number of quizzes: {quizzes.length} </p>}
                    {quizzes && quizzes.map((quiz) => (
                        <div key={quiz.id} className="border-b py-2">
                            <div>Title: {quiz.title}</div>
                            <div>Category: {quiz.category}</div>
                            <Button onClick={handleManageQuizClick}> Manage quiz </Button>                         
                            {/* Add more details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default QuizList;
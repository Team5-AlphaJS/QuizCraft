import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

const Scoring = ({ quiz, setQuiz }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">Scoring</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Scoring your quiz</DialogTitle>
                    <DialogDescription>By default max score will be 100. Scores for each question will be divided amoung that score.</DialogDescription>
                </DialogHeader>
                <Input type="number" value={quiz.score} onChange={(e) => setQuiz({ ...quiz, score: +e.target.value })} />
            </DialogContent>
        </Dialog>
    )
};

Scoring.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default Scoring;
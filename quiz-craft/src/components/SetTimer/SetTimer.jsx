import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";



const SetTimer = ({ quiz, setQuiz }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">Timer</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Timer</DialogTitle>
                    <DialogDescription>Set time in minutes for the quiz to be completed.</DialogDescription>
                </DialogHeader>
                <Input type="number" value={quiz.timer} onChange={(e) => setQuiz({...quiz, timer: +e.target.value})} />
            </DialogContent>
        </Dialog>
    );
};

SetTimer.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default SetTimer;
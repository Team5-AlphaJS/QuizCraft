import PropTypes from "prop-types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
// import { useState } from "react";


const OrderQuestions = ({ quiz, setQuiz }) => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">Randomization</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select randomization of question and their answers</DialogTitle>
                    <DialogDescription>By default questions and their answers will be in order of creation.</DialogDescription>
                    <div className="flex justify-between">
                        <DialogDescription>Current question order: {quiz.orderQuestions}</DialogDescription>
                        <DialogDescription>Current answears order: {quiz.orderAnswears}</DialogDescription>
                    </div>
                </DialogHeader>
                <div className="flex ">
                    <div className="questions">
                        <Button variant="link" className="place-self-start pt-1 ml-1" onClick={() => setQuiz({...quiz, orderQuestions: 'ordered'})}>Order of creation</Button>
                        <Button variant="link" className="pt-1 ml-1" onClick={() => setQuiz({...quiz, orderQuestions: 'random'})}>Randomize</Button>
                    </div>
                    <div className="answears">
                        <Button variant="link" className="pt-1 ml-1" onClick={() => setQuiz({...quiz, orderAnswears: 'ordered'})}>Order of creation</Button>
                        <Button variant="link" className="pt-1 ml-1" onClick={() => setQuiz({...quiz, orderAnswears: 'random'})}>Randomize</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

OrderQuestions.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default OrderQuestions;
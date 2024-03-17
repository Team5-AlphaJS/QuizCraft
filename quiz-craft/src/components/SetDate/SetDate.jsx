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
import { Calendar } from "../ui/calendar"
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";


const SetDate = ({ quiz, setQuiz }) => {
    const [date, setDate] = useState(new Date());
    const { toast } = useToast();
    const [hour, setHour] = useState('');
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const setNewHour = () => {

        const [currHour, minutes] = hour.split(':').map(Number);

        if (currHour > 23) {
            console.log('Time must be between 0 and 23:59');
            return;
        }

        if (minutes > 59) {
            console.log('Minutes must be between 0 and 59');
            return;
        }
        date.setHours(currHour || 0);
        date.setMinutes(minutes || 0);
        date.setSeconds(0);
        setDate(new Date(date));
        setHour('');
    };

    const onSetEndDate = () => {
        const toSeconds = new Date(date).getTime();
        setQuiz({ ...quiz, dueDate: toSeconds });
        toast({
            title: "End date is set.",
            description: `Date set to ${date}`
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">End Date</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Set end Date</DialogTitle>
                    <DialogDescription>Set the end date and hour when the quiz will be unavaible to participate in.</DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-68 mr-2"
                    />
                    <div className="flex flex-col">
                        <Label className="" htmlFor="set-hout">Set end hour</Label>
                        <div className="flex">
                            <Input
                                className="mt-1 h-7 remove-arrow"
                                id="set-hour"
                                type="text"
                                placeholder="ex: 19/19:30"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                            />
                            <Button className="h-7 mt-1 ml-1" onClick={setNewHour}>Set hour</Button>
                        </div>
                        <div className="flex justify-center">
                            <Button className="mt-20 w-2/3" onClick={onSetEndDate}>Set end date</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
};


SetDate.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default SetDate;
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/users.service";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";


const OpenInvite = ({ quiz, setQuiz }) => {
    const [students, setStudents] = useState([]);
    const [origStudents, setOrigStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllUsers()
            .then(snapshot => {
                const users = Object.entries(snapshot.val());
                setStudents([...users.filter(user => user[1].role === 'Student')]);
                setOrigStudents([...users.filter(user => user[1].role === 'Student')]);
            });
    }, [])

    useEffect(() => {
        setStudents([...origStudents.filter(student => student[1].username.toLowerCase().startsWith(searchTerm.toLowerCase()))]);
    }, [searchTerm]);


    const onInvite = (student) => {
        if (student in quiz.invited) {
            delete quiz.invited[student];
            setQuiz({ ...quiz });
        } else {
            quiz.invited[student] = true;
            setQuiz({ ...quiz });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="pt-1 ml-1">Availability</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Availability</DialogTitle>
                    <DialogDescription>&ldquo;Open&rdquo;. For all students to participate.</DialogDescription>
                    <DialogDescription>&ldquo;Invitational&rdquo;. You must select which studets can participate.</DialogDescription>
                </DialogHeader>
                <RadioGroup className="flex" defaultValue={quiz.openOrInvite}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open" id="open" onClick={() => {
                            if ('participants' in quiz) {
                                delete quiz.invited;
                            }
                            quiz.openOrInvite = 'open'
                            setQuiz({ ...quiz, openOrInvite: 'open' });
                        }} />
                        <Label htmlFor="open">Open</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="invitational" id="invitational" onClick={() => {
                            quiz['invited'] = {};
                            setQuiz({ ...quiz, openOrInvite: 'invitational' });
                        }} />
                        <Label htmlFor="invitational">Invitational</Label>
                    </div>
                </RadioGroup>
                {quiz.openOrInvite === 'invitational' && (
                    <>
                        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="student username" />
                        <ScrollArea className="list-of-users w-full border-r-4 h-full">
                            <div className="p-4">
                                {students.map(student => (
                                    <div key={student[0]} id={student[0]} className="flex justify-between border-b">
                                        <p className="">{student[0]}</p>
                                        <a href="" onClick={(e) => {
                                            e.preventDefault();
                                            onInvite(e.target.parentNode.id);
                                        }}>{student[0] in quiz.invited ? 'Uninvite' : 'Invite'}</a>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

OpenInvite.propTypes = {
    quiz: PropTypes.object.isRequired,
    setQuiz: PropTypes.func.isRequired
};

export default OpenInvite;
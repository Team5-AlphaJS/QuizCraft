import UsersList from "@/components/AdminDashboards/UsersList";
import QuizList from "@/components/EducatorDashboard/QuizList";
import { Button } from "@nextui-org/react";
import { useState } from "react";

const AdminDashboard = () => {
    const [boardOf, setBoardOf] = useState('users');

    return (
        <div className="flex flex-col w-full max-w-l items-center space-x-2">
            <h1 className="my-2 font-semibold text-xl">Admin Dashboard</h1>
            <div className="flex w-full max-w-sm items-center space-x-2 justify-center mb-4">
                <Button color="primary" onClick={() => setBoardOf('users')}>Users</Button>
                <Button color="primary" onClick={() => setBoardOf('quizzes')}>Quizzes</Button>
                <Button color="primary" onClick={() => setBoardOf('groups')}>Groups</Button>
            </div>
            <div className="w-5/6">
                {boardOf === 'users' && <UsersList />}
                {boardOf === 'quizzes' && <QuizList />}
                {boardOf === 'groups' && <h1>Groups Management</h1>}
                {/* {boardOf === 'scores' && <h1>Scores</h1>} */}
            </div>
        </div>
    )
};

export default AdminDashboard;
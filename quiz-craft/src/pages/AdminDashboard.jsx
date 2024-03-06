import UsersList from "@/components/AdminDashboards/UsersList";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminDashboard = () => {
    const [boardOf, setBoardOf] = useState('users');

    return (
        <div className="flex flex-col w-full max-w-l items-center space-x-2">
            <h1 className="mb-2 font-semibold">Welcome to the Admin Dashboard!</h1>
            <div className="flex w-full max-w-sm items-center space-x-2 justify-center mb-2">
                <Button onClick={() => setBoardOf('users')}>Users</Button>
                <Button onClick={() => setBoardOf('quizzes')}>Quizzes</Button>
                <Button onClick={() => setBoardOf('groups')}>Groups</Button>
            </div>
            <div className="w-5/6">
                {boardOf === 'users' && <UsersList />}
                {boardOf === 'quizzes' && <h1>Quizzes</h1>}
                {boardOf === 'groups' && <h1>Groups</h1>}
                {boardOf === 'scores' && <h1>Scores</h1>}
            </div>
        </div>
    )
};

export default AdminDashboard;
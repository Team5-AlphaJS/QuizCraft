import UsersList from "@/components/AdminDashboards/Users";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminDashboard = () => {
    const [boardOf, setBoardOf] = useState('users');

    return (
        <div className="flex flex-col w-full max-w-l items-center space-x-2">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Button onClick={() => setBoardOf('users')}>Users</Button>
                <Button onClick={() => setBoardOf('quizzes')}>Quizzes</Button>
                <Button onClick={() => setBoardOf('groupes')}>Groups</Button>
            </div>
            <div className="w-5/6">
                {boardOf === 'users' && <UsersList />}
                {boardOf === 'quizzes' && <h1>Quizzes</h1>}
                {boardOf === 'scores' && <h1>Scores</h1>}
            </div>
        </div>
    )
};

export default AdminDashboard;
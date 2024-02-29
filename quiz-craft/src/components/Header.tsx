import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { LoginForm } from './Authentication/login-form';
import { AuthContext } from '@/context/AuthContext';
import { logoutUser } from '@/services/auth.service';
import { useToast } from './ui/use-toast';

const NavBar = () => {
  const { user, userData, setContext } = useContext(AuthContext);
  const [showLogInForm, setShowLogInForm] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const toggleLoginForm = () => {
    setShowLogInForm((prev) => !prev);
  };

  const hideLoginForm = () => {
    setShowLogInForm(false);
  };

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });

    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out.',
    });
    
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Link to="/" className="px-8">
            Quiz Craft
          </Link>
          <Button>Random free quiz</Button>
        </div>
        <div>
          <Input placeholder="Search quizzes" />
        </div>
        <ModeToggle />

        {user && (
          <>
            {`Welcome, ${userData?.username}`}
            <Button onClick={logout}>Logout</Button>
          </>
        )}

        <Button onClick={toggleLoginForm} className="px-8">
          Login
        </Button>
        <Button asChild>
          <Link to="/register" className="px-8">
            Register
          </Link>
        </Button>
      </div>
      {showLogInForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="p-8 rounded-lg w-96 max-w-full flex flex-col items-center">
            <LoginForm />
            <Button onClick={hideLoginForm} className="mt-4">
              Back
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;

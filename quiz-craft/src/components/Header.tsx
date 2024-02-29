import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import { LoginForm } from './ui/login-form';

const NavBar = () => {
  const [showLogInForm, setShowLogInForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLogInForm(prev => !prev);
  };

  const hideLoginForm = () => {
    setShowLogInForm(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <Link to="/" className="px-8">
            Quiz Craft
          </Link>
          <Button>
            Random free quiz
          </Button>
        </div>
        <div>
          <Input placeholder="Search quizzes" />
        </div>
        <ModeToggle />
        <Button onClick={toggleLoginForm} className="px-8">
          Login
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
}

export default NavBar;

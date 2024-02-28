import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center ">
          <Link to="/" className="p-8">
            Quiz Craft
          </Link>
          <Button>
            Random free quiz
          </Button>
        </div>
        <div >
          <Input placeholder="Search quizzes" />
        </div>
        <ModeToggle />
        <Link to="/login"  className="p-8">
          Login
        </Link>
      </div>
    </>
  )
}

export default NavBar
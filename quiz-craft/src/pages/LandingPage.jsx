import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.div 
      className="mt-5 flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: -50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'just' }}
    >
      <h1 className="text-4xl font-semibold">Welcome to Quizzify</h1>
      <p className="text-lg">
        Quizzify is a web application that allows users to create, share, and
        take quizzes. It was created by Team 4.
      </p>
      <p className="text-lg">
        The application is being built using a variety of technologies,
        including React, Firebase, and Tailwind CSS. It is designed to be
        user-friendly and accessible to all users.
      </p>
      <p className="text-lg">Have fun! 😊</p>
    </motion.div>
  );
}
import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const demoQuizId = '-NtSHrlTAY-KUP_rAmq-'

  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: -50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'just' }}
    >
      <div className="w-[90%] mt-5 mb-7 flex flex-col items-center space-y-2 bg-gradient-to-t from-slate-900 to-slate-800 p-5 rounded-lg text-white">
        <h1 className="text-4xl font-semibold">Spotify? Nope.</h1>
        <h1 className="text-4xl font-semibold">
          Welcome to <span className="inline text-primary">Quizzify!</span> 😊
        </h1>
      </div>

      <div className="w-[22%] mb-5 flex flex-row items-center justify-center bg-gradient-to-t from-slate-900 to-slate-800 p-5 rounded-lg text-white">
        <h1 className="text-4xl font-semibold">⚙️ Our Features</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <motion.div whileHover={{ scale: 1.1 }}>
          <Card className="w-[300px] p-4 bg-gradient-to-t from-slate-900 to-slate-800">
            <CardHeader className="justify-center">
              <p className="uppercase font-bold text-primary">
                🚀 Engage Everyone!
              </p>
            </CardHeader>
            <CardBody className="py-2 text-center text-white">
              <p>
                Quizzify is perfect for educators, students, and quiz
                enthusiasts alike. Create quizzes to test knowledge or just for
                fun!
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Card className="w-[300px] p-4 bg-gradient-to-t from-slate-900 to-slate-800">
            <CardHeader className="justify-center">
              <p className="uppercase font-bold text-primary">
                🔎 Find the Perfect Quiz
              </p>
            </CardHeader>
            <CardBody className="py-2 text-center text-white">
              <p>
                Browse our searchable database of quizzes on all kinds of
                topics. There&apos;s something for everyone on Quizzify!
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Card className="w-[300px] p-4 bg-gradient-to-t from-slate-900 to-slate-800">
            <CardHeader className="justify-center">
              <p className="uppercase font-bold text-primary">
                🧐 Educate and Assess
              </p>
            </CardHeader>
            <CardBody className="py-2 text-center text-white">
              <p>
                As an educator, you can create quizzes to deliver lessons,
                assess learning, and make education very fun!
              </p>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Card className="w-[300px] p-2 bg-gradient-to-t from-slate-900 to-slate-800">
            <CardHeader className="justify-center">
              <p className="uppercase font-bold text-primary">
                🤗 Join the Community
              </p>
            </CardHeader>
            <CardBody className="py-2 text-center text-white">
              <p>
                Registration is free for everyone! Sign up to take quizzes and
                test your knowledge on a variety of subjects or join groups with
                quiz buddies.
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <div className="w-[90%] mt-7 flex flex-row items-center justify-center space-y-2 bg-gradient-to-t from-slate-900 to-slate-800 p-5 rounded-lg text-white">
        <h1 className="text-4xl font-semibold mr-2">
          Interested? Try our demo quiz! 👉
        </h1>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Button 
            color="primary" 
            variant="ghost" 
            onClick={() => navigate(`/enroll/${demoQuizId}`)}
          >
            Demo Quiz
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

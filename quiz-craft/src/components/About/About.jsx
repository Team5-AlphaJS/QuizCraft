import logo from '../../assets/logo.svg';

export default function About() {
  return (
    <div className="mt-5 flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-semibold">About the app</h1>
      <h1 className="text-4xl font-semibold"><img className='inline' width={'50px'} src={logo} />Quizzify</h1>
      <p className="text-lg">
        Quizzify is a web application that at the moment allows users to create, take quizzes and see your results. It was created and still being created by Team AMS.
      </p>
      <p className="text-lg">
        The application is being built using a variety of technologies,
        including React, Firebase, Tailwind CSS, Shadcn UI and Next UI. It is designed to be
        user-friendly and accessible to all users.
      </p>
    </div>
  );
}

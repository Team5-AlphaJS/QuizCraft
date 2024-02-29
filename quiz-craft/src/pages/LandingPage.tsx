import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="container mx-auto py-8">
        <Header />
      </div>
      <div>Categories</div>
      <div>Quizzes</div>
      <Footer />
    </>
  );
}

export default LandingPage;
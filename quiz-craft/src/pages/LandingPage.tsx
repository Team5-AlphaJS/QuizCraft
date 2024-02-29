import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoriesNav from '@/components/ui/categories-nav';


const LandingPage: React.FC = () => {

  return (
    <>
      <div className="container mx-auto py-8">
        <Header />
      </div>
      <CategoriesNav />
      <div>Quizzes</div>
      <Footer />
    </>
  );
}

export default LandingPage;
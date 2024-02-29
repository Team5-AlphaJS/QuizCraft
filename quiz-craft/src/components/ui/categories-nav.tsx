import React from 'react';
import { Button } from './button';
const CategoriesNav: React.FC = () => {
  const handleButtonClick = (category: string) => {
    // You can implement different actions based on the category selected
    console.log(`Category selected: ${category}`);
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button onClick={() => handleButtonClick('Trending')} variant="default" size="default">
        Trending
      </Button>
      <Button onClick={() => handleButtonClick('New')} variant="default" size="default">
        New
      </Button>
      <Button onClick={() => handleButtonClick('Top Rated')} variant="default" size="default">
        Top Rated
      </Button>
      <Button onClick={() => handleButtonClick('Random')} variant="default" size="default">
        Random
      </Button>
    </div>
  );
};

export default CategoriesNav;
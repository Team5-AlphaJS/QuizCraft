import { Button } from './ui/button';

export default function CategoriesNav() {
  const handleButtonClick = (category) => {
    console.log(`Category selected: ${category}`);
  };

  return (
    <div className="flex justify-center space-x-4">
      <Button
        onClick={() => handleButtonClick('Trending')}
        variant="default"
        size="default"
      >
        Trending
      </Button>
      <Button
        onClick={() => handleButtonClick('New')}
        variant="default"
        size="default"
      >
        New
      </Button>
      <Button
        onClick={() => handleButtonClick('Top Rated')}
        variant="default"
        size="default"
      >
        Top Rated
      </Button>
      <Button
        onClick={() => handleButtonClick('Random')}
        variant="default"
        size="default"
      >
        Random
      </Button>
    </div>
  );
}

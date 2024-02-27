import './App.css';
import { Button } from './components/ui/button';
import { CardDemo } from './components/demos/CardDemo';
import { ModeToggle } from './components/mode-toggle';

function App() {
  return (
    <>
      <div className="grid justify-items-end">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button className="mb-4">Click me</Button>
        <CardDemo />
      </div>
    </>
  );
}

export default App;

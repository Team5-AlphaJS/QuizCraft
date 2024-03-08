import { Toaster } from '../components/ui/toaster';
import CategoriesNav from '../components/CategoriesNav';
// import { Checkbox } from '@nextui-org/react';
// import { Accordion, AccordionItem } from '@nextui-org/react';
// import { Loader2 } from 'lucide-react';
// import { CircularProgress } from '@nextui-org/react';
// import { Radio, RadioGroup } from '@nextui-org/react';
// import { Image } from '@nextui-org/react';
// import { Card, CardHeader, CardBody } from '@nextui-org/react';

export default function LandingPage() {
  return (
    <div className='mt-2 mb-20 text-center'>
      <Toaster />

      <h1 className="text-4xl font-bold mb-2">Welcome to QuizCraft</h1>
      <CategoriesNav />

      <p className="mt-5">Quizzes</p>

      {/* <Checkbox className="my-2" size="lg">
        Check this
      </Checkbox>

      <Accordion variant="bordered" selectionMode="multiple">
        <AccordionItem title="Accordion 1" subtitle="Press to expand">
          Hello!
        </AccordionItem>
        <AccordionItem title="Accordion 2">How are you?</AccordionItem>
        <AccordionItem title="Accordion 3">Lorem Ipsum :D</AccordionItem>
      </Accordion>

      <div className={'flex justify-around my-5'}>
        <Loader2 className={'animate-spin h-12 w-12'} />
        <CircularProgress size="lg" />
      </div>

      <RadioGroup label="Select your favorite city" className="my-5 w-fit">
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>

      <Card className="py-4 w-fit">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Your Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">FrontEnd Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            isBlurred
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            width={270}
          />
        </CardBody>
      </Card> */}
    </div>
  );
}

import { ReactElement } from 'react';
import { Header } from './components';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router';

function App(): ReactElement {

  return (
    <>
      <div className='h-screen w-full'>
        <Header />
        <div className='flex flex-col items-center justify-center animate-fade-in-up h-full px-4 gap-11 sm:gap-16'>
          <h1 className='text-7xl max-w-full sm:text-8xl'>This is Poké-Inventory.</h1>
          <div>
            <h4 className="text-md font-medium leading-none text-center">Explore</h4>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <Button>
                <Link to={"/trainers"}>Trainers</Link>
              </Button>
              <Separator orientation="vertical" />
              <Button>
                <Link to={"/pokemon"}>Pokemon</Link>
              </Button>
            </div>
          </div>
          <blockquote className='mt-6 border-l-2 pl-6 italic w-max max-w-full text-xl font-extralight text-foreground'>
            <div>
              There's nothing we could ever do that's a waste of time.
            </div>
            <div className='text-right'>— Ash Ketchum</div>
          </blockquote>
        </div>
      </div>
    </>
  )
}

export default App;

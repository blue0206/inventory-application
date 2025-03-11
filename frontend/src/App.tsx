import { ReactElement } from 'react';
import { Header } from './components';

function App(): ReactElement {

  return (
    <>
      <div className='h-screen w-full'>
        <Header />
        <div className='flex flex-col items-center justify-center h-full px-4 gap-3.5'>
          <h1 className='text-8xl max-w-full'>This is Poké-Inventory.</h1>
          <div>Explore</div>
          <blockquote className='mt-6 border-l-2 pl-6 italic w-max max-w-full'>
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

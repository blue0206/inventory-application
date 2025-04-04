import { ReactElement } from 'react';
import Header from './Header/Header';
import NotFound from './NotFound';
import { useAppSelector } from '../app/hooks';
import { getError } from '../features/error/errorSlice';
import { isApiErrorList } from 'shared';

export default function ErrorComponent(): ReactElement {
    const errorState = useAppSelector(getError);
    let errorName = "";

    // Set error name based on status code.
    // Only errors to be displayed via this component are named.
    switch (errorState.code) {
        case 400:
            errorName = 'Bad Request';
            break;
        case 404:
            errorName = 'Not Found';
            break;
        case 500:
            errorName = 'Internal Server Error';
    }

    if (errorState.hasError) {
        return (
            <div className='flex flex-col gap-5 h-full w-full mb-11'>
                <Header />
                <div className='flex flex-col items-center justify-center h-full px-4 gap-11 sm:gap-16'>
                    <h1 className='max-w-full text-5xl'>
                        {
                            errorState.code != 200 ? (
                                <>
                                    {errorState.code}: {errorName}
                                </>
                            ) : (
                                <>
                                    Oops!
                                </>
                            )
                        }
                    </h1>
                    <div className='text-2xl font-extralight text-muted-foreground'>
                        {
                            isApiErrorList(errorState.error) ? (
                                <>
                                    {errorState.error[0].message}
                                </>
                            ) : (
                                <>
                                    {errorState.message}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
    return (
        <NotFound />
    )
}

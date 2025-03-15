import { ReactElement } from "react";
import Header from "./Header/Header";

export default function NotFound(): ReactElement {
    return (
        <div className='flex flex-col gap-5 h-full w-full mb-11'>
            <Header />
            <div className='flex flex-col items-center justify-center h-full px-4 gap-11 sm:gap-16'>
                <h1 className='max-w-full text-5xl'>
                    404: Not Found
                </h1>
                <div className="text-2xl font-extralight text-muted-foreground">
                    This is not the webpage you are looking for.
                </div>
            </div>
        </div>
    );
}
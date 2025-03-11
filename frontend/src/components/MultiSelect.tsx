import { ReactElement } from 'react';
import Select from 'react-select';

type MultiSelectProps = {
    name: string;
    options: Array<string>;
    className?: string;
    defaultValues?: Array<string>;
}

export default function MultiSelect({
    name,
    options = [],
    className,
    defaultValues
}: MultiSelectProps): ReactElement {
    return (
        <>
            <Select 
                defaultValue={defaultValues} 
                isMulti 
                name={name} 
                options={options} 
                className={className} 
            />
        </>
    );
}

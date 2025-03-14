import { ReactElement } from 'react';
import Select, { MultiValue, OnChangeValue } from 'react-select';

// Base Option Type.
type Option = {
    value: string;
    label: string;
};

// Type for multiple selected options.
type MultiSelectOptions = MultiValue<Option>

// Component props with their attribute types.
// This is exported for inferring types for 
// MultiSelect fields/methods in components 
// that use MultiSelect component.
export type MultiSelectProps = {
    id: string;
    options: MultiSelectOptions;
    value: MultiSelectOptions;
    onChange: (value: MultiSelectOptions) => void;
    className?: string;
    defaultValue?: OnChangeValue<Option, true>;
}

export default function MultiSelect({
    id,
    options,
    defaultValue,
    onChange
}: MultiSelectProps): ReactElement {
    return (
        <>
            <Select 
                id={id}
                isMulti 
                options={options} 
                defaultValue={defaultValue} 
                onChange={onChange} 
                required
            />
        </>
    );
}

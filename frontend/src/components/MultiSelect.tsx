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
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "oklch(0.655 0.016 285.938)" : "var(--input)",
                        boxShadow: state.isFocused ? "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-inset), 0 0 0 calc(3px + var(--tw-ring-offset-width)) color-mix(in oklab, var(--ring) 50%, transparent, currentColor), var(--tw-shadow)" : "inherit",
                        borderRadius: "var(--radius)",
                        borderWidth: state.isFocused ? "1px" : "0.5px",
                        borderStyle: "inherit",
                        outlineColor: "oklch(0.21 0.006 285.885)",
                        outline: state.isFocused ? "inherit" : "inherit",
                        ":hover": {
                            borderColor: state.isFocused ? "oklch(0.655 0.016 285.938)" : "var(--input)",
                        }
                    }),
                    container: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "oklch(0.805 0.015 286.067)" : "var(--input)",
                        boxShadow: state.isFocused ? "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-inset), 0 0 0 calc(3px + var(--tw-ring-offset-width)) color-mix(in oklab, var(--ring) 50%, transparent, currentColor), var(--tw-shadow)" : "inherit",
                        borderRadius: "calc(var(--radius) + 2.5px)",
                        borderWidth: state.isFocused ? "3px" : "0.5px",
                        borderStyle: "inherit",
                        outlineColor: "oklch(0.21 0.006 285.885)",
                        outline: state.isFocused ? "3px" : "inherit",
                        ":hover": {
                            borderColor: state.isFocused ? "oklch(0.805 0.015 286.067)" : "var(--input)"
                        }
                    }),
                }} 
                className={
                    `placeholder:text-muted-foreground p-0 rounded-md border bg-transparent 
                    shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring 
                    focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 
                    dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-input`
                }
                required
            />
        </>
    );
}

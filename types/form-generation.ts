import type { TOptionValue } from "./common";

export interface IDropdownProps {
    label?: string;
    options: Array<{ label: string; value: TOptionValue }>;
    defaultValue?: string;
    disabled?: boolean;
    error?: string;
    [key: string]: any; // Index signature to satisfy the constraint
}
import type { OptionsProps } from "../Types";

export default function Option<T = object>({ value, disableStyles, selected, ...rest }: OptionsProps<T>) {

    return <div className="px-3 py-1 min-w-fit hover:bg-indigo-500 hover:text-white" {...rest} />;
}

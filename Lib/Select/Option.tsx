import type { OptionsProps } from "../Types";
import "./Select.css"

export  function Option<T = object>({ value, disableStyles, selected, ...rest }: OptionsProps<T>) {

    return <div className="option" {...rest} />;
}

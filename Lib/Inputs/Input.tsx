import type { InputProps } from "../Types";
import { StyleClass } from "../Utils/Class/StyleClass";
import "./Input.css"
export function Input({ defaultValue, onlyRead, style, className, disableStyles }: InputProps) {

  const classNameDefault = "input";

  const stylesProp = StyleClass.createStylesAndClassName({
    defaultClass: classNameDefault,
    className: className,
    style: style,
    disableStyles: disableStyles
  });

  return <input
    {...stylesProp}
    defaultValue={defaultValue}
    disabled={onlyRead}
  />;
}

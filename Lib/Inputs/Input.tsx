import { createClassName } from "../Functions";
import type { InputProps } from "../Types";

export  function Input({defaultValue,onlyRead,style,className,disableStyles}: InputProps) {

  const classNameDefault = "border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  className = createClassName(classNameDefault,className,disableStyles);

  return <input
          className={`${className}`}
          style={style}
          defaultValue={defaultValue}
          disabled={onlyRead}
          />;
}

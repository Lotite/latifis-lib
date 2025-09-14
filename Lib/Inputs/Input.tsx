import { createClassName } from "../Functions";
import type { InputProp } from "../Types";

export  function Input({defaultValue,inputRef,onChange,valueRef,onlyRead,style,className,disableStyles}: InputProp) {

  const classNameDefault = "border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  className = createClassName(classNameDefault,className,disableStyles);

  return <input
          className={`${className}`}
          style={style}
          defaultValue={defaultValue}
          ref={inputRef}
          onChange={(e) => {
            if(onlyRead) return;
            onChange?.(e);
            if (valueRef) {
              if (typeof valueRef === "function") {
                valueRef(e.target.value);
              } else {
                valueRef.current = e.target.value;
              }
            }
          }}
          disabled={onlyRead}
          />;
}

import React from 'react';
import type { Style } from './Types';



export const extractElements = <T extends object>(
  children: React.ReactNode,
  componentType: React.ComponentType<T>
): React.ReactElement<T>[] => {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement<T> =>
      React.isValidElement(child) && typeof child.type === 'function' && child.type === componentType
  );
};


export const createStyle = (
  styleDefault: Style,
  style: Style,
  disableStyles: boolean
) => {
  if (!disableStyles) {
    return { ...styleDefault, ...style };
  }
  return style;
};

export const unicId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}


export const createClassName = (
  classNameDefault: string,
  className: string | undefined,
  disableStyles: boolean | undefined
) => {
  if (disableStyles !==true) {
    return `${className} ${classNameDefault}`;
  }
  return className;
};

import  { Children as R_Children, isValidElement, type ComponentType, type ReactElement } from 'react';
import type { Children, ClassName, Elements, List, Style } from './Types';



export function extractElements<T>(
  children: Children,
  componentType: ComponentType<T>
): Elements<T>{
  return R_Children.toArray(children).filter(
    (child): child is ReactElement<T> =>
      isValidElement(child) &&
      typeof child.type === "function" &&
      child.type === componentType
  );
};

export function extractPropsElements <T>(
  children: Children,
  componentType: ComponentType<T>
): List<T> {
    return extractElements(children,componentType).map(element => element.props);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractPageContent(List:List<any>,currentPage:number,pageSize:number){
  return List.slice(currentPage,currentPage+pageSize)
}

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



export const createClassName = (
  classNameDefault?: ClassName,
  className?: ClassName,
  disableStyles?: boolean
) => {
  if (disableStyles !== true) {
    return `${classNameDefault} ${className}`;
  }
  return className;
};

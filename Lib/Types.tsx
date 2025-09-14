import type { ReactElement, ReactNode } from "react";

// #region Tipos primarios
export type Style = React.CSSProperties;
export type ClassName = string;
export type Icon = ReactNode;
export type Children = ReactNode;
export type Title = string;
export type DisableStyles = boolean;
export type OnClickHandler = (e: React.MouseEvent<HTMLElement>) => void;
export type Element<T> = ReactElement<T>;
export type Elements<T> = ReactElement<T>[];

// Tipo para los hijos de Grid, que ahora acepta un segundo genérico para el tipo del padre.
export type ChildrenElements<T> = Element<T> | Elements<T>;

export type List<T> = T[];
export type ObjectValuesType<T> = T[keyof T];
// #endregion

// #region basic templates
export type BasicStyleProps = {
  className?: ClassName;
  style?: Style;
  disableStyles?: DisableStyles;
};

export type CommonProps = BasicStyleProps & {
  title: Title;
  children: Children;
  onClick: OnClickHandler;
  icon: Icon;
};

export type Caption = BasicStyleProps & {
  title: Title;
  icon?: Icon;
  onClick?: OnClickHandler;
};

// #endregion

// #region Grid Props
export type GridProps<T extends object> = {
  children: ChildrenElements<T>;
  DataList: List<T>;
};

// GridColumnProps ahora acepta el tipo del objeto padre (T) y el tipo de la clave (K).
// Esto asegura que la propiedad dataField sea una clave válida.
export type GridColumnProps<T extends object> = {
  // Captions props
  CaptionTitle: Title;
  CaptionStyle?: Style;
  CaptionClassName?: ClassName;
  CaptionIcon?: Icon;
  CaptionDisableStyles?: boolean;

  // CellProps
  CellStyle?: Style;
  CellClassName?: ClassName;

  // DataProps
  dataField: keyof T;
};

export type GridCaption = Pick<
  Caption,
  "title" | "className" | "disableStyles" | "icon" | "onClick" | "style"
>;

export type GridRow<T extends object> = T;

export type GridCell<T> = {
  content: T;
};
// #endregion

// #region Tabs Props
export type TabsProps = BasicStyleProps & {
  children: ChildrenElements<TabPageProps>;
};
export type TabPageProps = {
  title: Title;
  children: Children;
  icon?: Icon;
  onOpen?: () => void;
  onClose?: () => void;
  closeable?: boolean;
};

export type TabAddPageProps = TabPageProps & {
  caption?: string;
  onCreate?: () => void;
  onDelete?: () => void;
  id?: string;
};
// #endregion

import type { ReactElement, ReactNode, Ref } from "react";

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
export type OnChange<T> = (e: React.ChangeEvent<T>) => void;
export type ChildrenElements<T> = Element<T> | Elements<T>;

export type List<T> = T[];
export type ObjectValuesType<T> = T[keyof T];
// #endregion

// #region basic templates
export type PageInfo<T> = {
  currentPage: number;
  pageSize: number;
  length: number;
  conentPage: List<T>;
};

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

export type BasicActionsProps<T = HTMLElement> = {
  onClick?: React.MouseEventHandler<T>;
  onDoubleClick?: React.MouseEventHandler<T>;
  onMouseDown?: React.MouseEventHandler<T>;
  onMouseMove?: React.MouseEventHandler<T>;
  onMouseUp?: React.MouseEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
  onMouseOver?: React.MouseEventHandler<T>;
  onMouseOut?: React.MouseEventHandler<T>;
  onContextMenu?: React.MouseEventHandler<T>;

  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;

  onChange?: React.ChangeEventHandler<T>;
  onInput?: React.FormEventHandler<T>;

  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;

  onScroll?: React.UIEventHandler<T>;
  onWheel?: React.WheelEventHandler<T>;

  onDrag?: React.DragEventHandler<T>;
  onDragEnd?: React.DragEventHandler<T>;
  onDragEnter?: React.DragEventHandler<T>;
  onDragExit?: React.DragEventHandler<T>;
  onDragLeave?: React.DragEventHandler<T>;
  onDragOver?: React.DragEventHandler<T>;
  onDragStart?: React.DragEventHandler<T>;
  onDrop?: React.DragEventHandler<T>;

  onTouchCancel?: React.TouchEventHandler<T>;
  onTouchEnd?: React.TouchEventHandler<T>;
  onTouchMove?: React.TouchEventHandler<T>;
  onTouchStart?: React.TouchEventHandler<T>;

  onPointerDown?: React.PointerEventHandler<T>;
  onPointerMove?: React.PointerEventHandler<T>;
  onPointerUp?: React.PointerEventHandler<T>;
  onPointerCancel?: React.PointerEventHandler<T>;
  onPointerEnter?: React.PointerEventHandler<T>;
  onPointerLeave?: React.PointerEventHandler<T>;
  onPointerOver?: React.PointerEventHandler<T>;
  onPointerOut?: React.PointerEventHandler<T>;
  onGotPointerCapture?: React.PointerEventHandler<T>;
  onLostPointerCapture?: React.PointerEventHandler<T>;

  onAnimationStart?: React.AnimationEventHandler<T>;
  onAnimationEnd?: React.AnimationEventHandler<T>;
  onAnimationIteration?: React.AnimationEventHandler<T>;

  onTransitionEnd?: React.TransitionEventHandler<T>;
};


export type Caption = BasicStyleProps & {
  title: Title;
  icon?: Icon;
  onClick?: OnClickHandler;
};

// #endregion

// #region Grid Props
export type GridProps<T extends object> = BasicStyleProps & {
  children: ChildrenElements<T>;
  DataList: List<T>;
  PageSize?: number;

  THeadStyle?: Style;
  THeadClassName?: ClassName;
  THeadDisableStyles?: boolean;

  CaptionStyle?: Style;
  CaptionClassName?: ClassName;
  CaptionDisableStyles?: boolean;

  CellStyle?: Style;
  CellClassName?: ClassName;
  CellDisableStyles?: boolean;

  TBodyStyle?: Style;
  TBodyClassName?: ClassName;
  TBodyDisableStyles?: boolean;
};

export type GridColumnProps<T> = {
  // Captions props
  CaptionTitle: Title;
  CaptionStyle?: Style;
  CaptionClassName?: ClassName;
  CaptionIcon?: Icon;
  CaptionDisableStyles?: boolean;

  // CellProps
  CellStyle?: Style;
  CellClassName?: ClassName;
  CellDisableStyles?: boolean;

  children?:
  | Children
  | ((contex: T) => ObjectValuesType<T>)
  | ((contex: T) => Children);

  // DataProps
  dataField?: keyof T;
};

export type GridCaption = Pick<
  Caption,
  "title" | "className" | "disableStyles" | "icon" | "onClick" | "style"
>;

export type GridRow<T extends object> = T;

export type GridCell<T, K> = BasicStyleProps & {
  content: K | ((contex: T) => K);
  context: T;
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


//#region  Inputs Props
export type InputProps = BasicActionsProps & BasicStyleProps & {
  defaultValue?: string;
  inputRef?: Ref<HTMLInputElement>;
  onChange?: OnChange<HTMLInputElement>;
  value?: string;
  onlyRead?: boolean;
  label?: string
};

export type SelectProps<T = object> = BasicActionsProps & BasicStyleProps & {
  onChangeValue?: (value: T) => any;
  value?: T;
  children?: ChildrenElements<OptionsProps<T>>;
  StyleModal?:Style,
  ClassNameModal?:ClassName
  disableStylesModal?:boolean
};


export type OptionsProps<T = object> = Omit<BasicActionsProps, 'onChange' | 'onInput'> & BasicStyleProps & {
  value: T
  children: Children;
  selected?: boolean
};

export type OptionContainerProps<T = object> = BasicStyleProps & {
  isOpen: boolean
  options: Elements<OptionsProps<T>>
  selectOption: (newOption: Element<OptionsProps<T>> | null) => void
}

//#endregion

import type { ChangeEventHandler, CSSProperties, ReactElement, ReactNode, Ref } from "react";
import type { TabPage } from "./Tabs/TabPage";
import type { TabAddPage } from "./Tabs/TabAddPage";


export type Style = CSSProperties;

export type BasicStyle = {
  className?: string;
  style?: Style;
  disableStyles?: boolean;
}

export type Icon = ReactNode;

export type ElementsType<T> = ReactElement<T> | ReactElement<T>[];

export type TabsProps = {
  children: ElementsType<typeof TabPage | typeof TabAddPage>;
};

export type TabAddPageProps = TabPageProps & {
  caption?: string;
  onCreate?: () => void;
  onDelete?: () => void;
  id?: string;
};

export type TabPageProps = {
  title: string;
  children: ReactNode;
  icon?: Icon;
  onOpen?: () => void;
  onClose?: () => void;
  closeable?: boolean;
};

export type InputProp = BasicStyle & {
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  valueRef?: Ref<string>;
  inputRef?: Ref<HTMLInputElement>;
  onlyRead?: boolean;
  icon?: Icon;
  label?: string;
  value?: string;
};

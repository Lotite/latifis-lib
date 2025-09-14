import { useCallback, useEffect, useState } from "react";
import type {
  BasicStyleProps,
  GridCaption,
  GridCell,
  GridColumnProps,
  GridProps,
  List,
} from "../Types";
import { GridColumn } from "./GridColumn";
import { createClassName, extractPropsElements } from "../Functions"; 

function THead({
  captions,
  style,
  className,
  disableStyles,
}: { captions: List<GridCaption> } & BasicStyleProps) {
  const classNameDefault = "bg-gray-100  border-b-[0.1px] border-b-[#0003] shrink-0";
  return (
    <thead
      className={createClassName(classNameDefault, className, disableStyles)}
      style={style}
    >
      <tr className="flex">
        {captions.map((caption, index) => (
          <Caption key={index} {...caption} />
        ))}
      </tr>
    </thead>
  );
}

function Caption({
  title,
  className,
  style,
  icon,
  disableStyles,
}: GridCaption) {
  const classNameDefault = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 flex-1`;
  return (
    <th
      className={createClassName(classNameDefault, className, disableStyles)}
      style={style}
    >
      {icon} {title}
    </th>
  );
}

function TBody<T extends object>({
  rows,
  columns,
  className,
  style,
  disableStyles
}: BasicStyleProps & {
  rows: List<T>;
  columns: List<GridColumnProps<T>>;
}) {
  const classNameDefault = "divide-y  divide-gray-200 bg-white overflow-y-auto block grow";
  return (
    <tbody style={style} className={createClassName(classNameDefault,className,disableStyles)}>
      {rows.map((row, index) => (
        <Row key={index} data={row} columns={columns} />
      ))}
    </tbody>
  );
}

function Row<T extends object>({
  data,
  columns,
}: {
  data: T;
  columns: List<GridColumnProps<T>>;
}) {
  const rowClassName = `transition duration-150 ease-in-out hover:bg-gray-50 flex`;
  return (
    <tr className={rowClassName}>
      {columns.map((col, index) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Cell<any>
          key={index}
          content={data[col.dataField]}
          className={col.CellClassName}
          style={col.CellStyle}
        />
      ))}
    </tr>
  );
}

function Cell<T extends object>({
  content,
  className,
  style,
}: GridCell<T> & { className?: string; style?: object }) {
  const finalClassName = `px-4 py-4 whitespace-nowrap text-sm text-gray-900 flex-1 ${
    className || ""
  }`;
  return (
    <td className={finalClassName} style={style}>
      {`${content}`}
    </td>
  );
}

export function Grid<T extends object>({
  children,
  DataList,

  className,
  disableStyles,
  style,

  CaptionClassName,
  CaptionDisableStyles,
  CaptionStyle,

  THeadClassName,
  THeadDisableStyles,
  THeadStyle,

  TBodyClassName,
  TBodyDisableStyles,
  TBodyStyle,
}: GridProps<T>) {
  const [columns, setColumns] = useState<List<GridColumnProps<T>>>([]);
  const [captions, setCaptions] = useState<List<GridCaption>>([]);

  const getCaptions = useCallback((): List<GridCaption> => {
    return columns.map((col) => ({
      title: col.CaptionTitle,
      className: col.CaptionClassName ?? CaptionClassName,
      disableStyles: col.CaptionDisableStyles ?? CaptionDisableStyles,
      icon: col.CaptionIcon,
      onClick: undefined,
      style: col.CaptionStyle ?? CaptionStyle,
    }));
  }, [CaptionClassName, CaptionDisableStyles, CaptionStyle, columns]);

  useEffect(() => {
    const cols = extractPropsElements<GridColumnProps<T>>(children, GridColumn);
    setColumns(cols);
  }, [children]);

  useEffect(() => {
    setCaptions(getCaptions());
  }, [columns, getCaptions]);

  const defaultClassName = "h-[500px] w-[95%] border-b mx-auto border-gray-200 shadow sm:rounded-lg flex flex-col";

  return (
    <div
      style={style}
      className={createClassName(defaultClassName, className, disableStyles)}
    >
      <table className="min-w-full h-full flex flex-col">
        <THead
          captions={captions}
          style={THeadStyle}
          className={THeadClassName}
          disableStyles={THeadDisableStyles}
        />
        <TBody
          rows={DataList}
          columns={columns}
          style={TBodyStyle}
          className={TBodyClassName}
          disableStyles={TBodyDisableStyles}
        />
      </table>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import type { GridCaption, GridCell, GridColumnProps, GridProps, List } from "../Types";
import { GridColumn } from "./GridColumn";
import { extractPropsElements } from "../Functions"; // Asegúrate de que esta función exista


function THead({ captions }: { captions: List<GridCaption> }) {
  return (
    <thead className="bg-gray-100">
      <tr>
        {captions.map((caption, index) => (
          <Caption key={index} {...caption} />
        ))}
      </tr>
    </thead>
  );
}

function Caption({ title, className, style, icon }: GridCaption) {
  const finalClassName = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 ${
    className || ""
  }`;
  return (
    <th className={finalClassName} style={style}>
      {icon} {title}
    </th>
  );
}

function TBody<T extends object>({
  rows,
  columns,
}: {
  rows: List<T>;
  columns: List<GridColumnProps<T>>;
}) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
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
  const rowClassName = `transition duration-150 ease-in-out hover:bg-gray-50`;
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
  const finalClassName = `px-4 py-4 whitespace-nowrap text-sm text-gray-900 ${
    className || ""
  }`;
  return (
    <td className={finalClassName} style={style}>
      {`${content}`}
    </td>
  );
}

export function Grid<T extends object>({ children, DataList }: GridProps<T>) {
  const [columns, setColumns] = useState<List<GridColumnProps<T>>>([]);
  const [captions, setCaptions] = useState<List<GridCaption>>([]);

  const getCaptions = useCallback((): List<GridCaption> => {
    return columns.map((col) => ({
      title: col.CaptionTitle,
      className: col.CaptionClassName,
      disableStyles: col.CaptionDisableStyles,
      icon: col.CaptionIcon,
      onClick: undefined,
      style: col.CaptionStyle,
    }));
  }, [columns]);

  useEffect(() => {
    const cols = extractPropsElements<GridColumnProps<T>>(
      children,
      GridColumn
    );
    setColumns(cols);
  }, [children]);

  useEffect(() => {
    setCaptions(getCaptions());
  }, [columns, getCaptions]);

  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <THead captions={captions} />
        <TBody rows={DataList} columns={columns} />
      </table>
    </div>
  );
}

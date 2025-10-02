import React, { useCallback, useEffect, useRef, useState } from "react";
import type {
  BasicStyleProps,
  GridCaption,
  GridCell,
  GridColumnProps,
  GridProps,
  List,
  PageInfo,
} from "../Types";
import { GridColumn } from "./GridColumn";
import { createClassName, extractPageContent, extractPropsElements } from "../Functions";



//TODO: Añadir la capacidad de filtrar y ordenar, tambien con la opcion de añadir un metodo para realizar esos filtros.

function THead({
  captions,
  style,
  className,
  disableStyles,
}: { captions: List<GridCaption> } & BasicStyleProps) {
  // Se añade `block` para que thead se comporte como un div y podamos controlar su layout por separado.
  const classNameDefault = "bg-gray-50 border-b border-gray-200  shrink-0 block";
  return (
    <thead
      className={createClassName(classNameDefault, className, disableStyles)}
      style={style}
    >
      {/* Se añade `flex` a `tr` para que las celdas `th` se alineen como items de flexbox. */}
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
  // `flex-1` es crucial para que las columnas se distribuyan el espacio equitativamente.
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
  // Se añade `block`, una altura fija `h-[300px]` y `overflow-y-auto` para crear el cuerpo desplazable.
  const classNameDefault = "divide-y divide-gray-200 overflow-y-auto h-[300px] block";
  return (
    <tbody style={style} className={createClassName(classNameDefault, className, disableStyles)}>
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
  // Se añade `flex` a la fila para alinear las celdas `td` con las celdas de la cabecera `th`.
  const rowClassName = `transition duration-150 ease-in-out hover:bg-gray-50 flex`;

  const dataFiel = (col: GridColumnProps<T>) => {
    try {
      return data[col.dataField!]
    } catch {
      return ""
    }
  }

  return (
    <tr className={rowClassName}>
      {columns.map((col, index) => (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Cell<T, any>
          key={index}
          content={col.children || dataFiel(col)}
          className={col.CellClassName}
          style={col.CellStyle}
          context={data}
        />
      ))}
    </tr>
  );
}

function Cell<T extends object, K extends React.ReactNode>({
  content,
  className,
  style,
  context
}: GridCell<T, K> & { className?: string; style?: object }) {
  // `flex-1` aquí también es crucial para la alineación.
  const finalClassName = `px-4 py-4 whitespace-nowrap text-sm text-gray-900 flex-1 ${className || ""
    }`;

  if (typeof content === "function") {
    content = content(context)
  }
  return (
    <td className={finalClassName} style={style}>
      {content}
    </td>
  );
}

//TODO: MEJORA la paginacion, hacer que si hay muchos este solo muestre el inicio y el final, con puntos suspensivos en medio
function Footer<T>({ pageInfo, setInfo }: { pageInfo: PageInfo<T>, setInfo: (info: PageInfo<T>) => void }) {
  // Contenedor del pie de página con altura fija y centrado.
  return (
    <div className="flex flex-row items-center justify-center px-4 h-[100px] border-t border-gray-200 shrink-0">
      {Array.from({ length: pageInfo.length }).map((_, i) => (
        <Pagination key={i} index={i} onClick={() => setInfo({ ...pageInfo, currentPage: i })} isActive={pageInfo.currentPage === i} />
      ))}
    </div>
  );
}
function Pagination({ index, onClick, isActive }: { index: number, onClick: () => void, isActive: boolean }) {
  const activeClass = "bg-blue-500 text-white";
  const defaultClass = "bg-gray-200 hover:bg-gray-300 text-gray-800";
  return (
    <button className={`mx-1 px-3 py-1 text-sm rounded-md transition-colors ${isActive ? activeClass : defaultClass}`} onClick={onClick}>
      {index + 1}
    </button>
  );
}




export function Grid<T extends object>({
  children,
  DataList,
  PageSize = 15,

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
  const refDivContainer = useRef<HTMLDivElement | null>(null)

  const [pageInfo, setPageInfo] = useState<PageInfo<T>>({
    conentPage: [],
    currentPage: 0,
    pageSize: PageSize,
    length: Math.ceil((DataList?.length || 0) / PageSize),
  });

  useEffect(() => {

    if (PageSize <= 0) PageSize = 1

    setPageInfo((oldInfo) => {
      const dataListLength = DataList?.length || 0;
      const newLength = Math.ceil(dataListLength / PageSize);
      const newCurrentPage = Math.min(oldInfo.currentPage, newLength - 1);
      return {
        ...oldInfo,
        pageSize: PageSize,
        length: newLength,
        currentPage: newCurrentPage < 0 ? 0 : newCurrentPage
      };
    })
  }, [DataList?.length, PageSize]);



  useEffect(() => {
    setPageInfo((oldInfo) => {
      return { ...oldInfo, conentPage: extractPageContent(DataList, oldInfo.currentPage, oldInfo.pageSize) }
    })
  }, [DataList, pageInfo.currentPage, pageInfo.pageSize])


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

  // Contenedor principal: flex, flex-col y altura máxima de 500px.
  const defaultClassName = "w-full mx-auto border border-gray-200 bg-white  shadow-md sm:rounded-lg flex flex-col  overflow-hidden";
  return (
    <div
      ref={refDivContainer}
      style={style}
      className={createClassName(defaultClassName, className, disableStyles)}
    >
      {/* La tabla ahora ocupa la altura disponible que le da el contenedor flex. */}
      <table
        className={`w-full table-fixed`}
      >
        <THead
          captions={captions}
          style={THeadStyle}
          className={THeadClassName}
          disableStyles={THeadDisableStyles}
        />
        <TBody<T>
          rows={pageInfo.conentPage}
          columns={columns}
          style={TBodyStyle}
          className={TBodyClassName}
          disableStyles={TBodyDisableStyles}
        />
      </table>
      {pageInfo.length > 1 && <Footer<T> pageInfo={pageInfo} setInfo={setPageInfo} />}
    </div>
  );
}

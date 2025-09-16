
import { useCallback, useEffect, useRef, useState } from "react";
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
 const classNameDefault = "divide-y flex-1 divide-gray-200 bg-white overflow-y-auto block grow";
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
        <Cell<T,any>
          key={index}
          content={col.children || data[col.dataField!]}
          className={col.CellClassName}
          style={col.CellStyle}
          context={data}
        />
      ))}
    </tr>
  );
}

function Cell<T extends object,K extends React.ReactNode>({
  content,
  className,
  style,
  context
}: GridCell<T,K> & { className?: string; style?: object }) {
  const finalClassName = `px-4 py-4 whitespace-nowrap text-sm text-gray-900 flex-1 ${
    className || ""
  }`;

  if (typeof content === "function"){
    content = content(context)
  }
    return (
      <td className={finalClassName} style={style}>
        {content}
      </td>
    );
}


function Footer<T>({ pageInfo, setInfo }: { pageInfo: PageInfo<T>, setInfo: (info: PageInfo<T>) => void }) {
  return (
    <tfoot className="flex flex-row">
      {Array.from({ length: pageInfo.length }).map((_, i) => (
        <Pagination index={i} onClick={() => setInfo({ ...pageInfo, currentPage: i })} />
      ))}
    </tfoot>
  );
}
function Pagination({index,onClick}:{index:number,onClick:()=>void}){
  return (
    <button className="mx-5" key={index} onClick={onClick}>
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
  const refDivContainer = useRef<HTMLDivElement|null>(null)
  const [computedMaxHeight, setComputedMaxHeight] = useState<string | null>(null);

  const [pageInfo, setPageInfo] = useState<PageInfo<T>>({
    conentPage: extractPageContent(DataList,0,PageSize),
    currentPage: 0,
    pageSize: PageSize,
    length: Math.ceil(DataList.length / PageSize),
  });



  useEffect(() => {
setPageInfo((oldInfo)=>{
      return {
        ...oldInfo,
        pageSize: PageSize,
        length: Math.ceil(DataList.length / PageSize),
      };
    })


  }, [DataList.length, PageSize, children]);


  useEffect(()=>{
    setPageInfo((oldInfo)=>{
      return {...oldInfo , conentPage:extractPageContent(DataList,oldInfo.currentPage,oldInfo.pageSize)}
    })
  },[DataList, pageInfo.currentPage])

  useEffect(() => {
    if (refDivContainer.current) {
      const computedStyle = getComputedStyle(refDivContainer.current);
      // alert(computedStyle.height);
      setComputedMaxHeight(computedStyle.maxHeight);
    }
  }, [children, refDivContainer,pageInfo]);


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

const defaultClassName = "w-[95%] border-b mx-auto  border-gray-200 shadow sm:rounded-lg flex flex-col max-h-[500px]";
  return (
    <div
      ref={refDivContainer}
      style={style}
      className={createClassName(defaultClassName, className, disableStyles)}
    >
      <table
        className={`min-w-full h-full max-h-[${computedMaxHeight}] flex flex-col`}
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
        <Footer<T> pageInfo={pageInfo} setInfo={setPageInfo} />
      </table>
    </div>
  );
}

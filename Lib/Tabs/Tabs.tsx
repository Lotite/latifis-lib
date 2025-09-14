import {
  useState,
  useEffect,
  useRef,
  type MouseEventHandler,
  useCallback,
} from "react";
import { TabPage } from "./TabPage";
import { extractElements } from "../Functions";
import type { TabsProps, TabPageProps, TabAddPageProps, Element, Elements } from "../Types";
// @ts-expect-error : Archivo CSS
import styles from "../index.module.css";
import { TabAddPage } from "./TabAddPage";

//TODO: Añadir la capacidad de dar estilo al componente

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: MouseEventHandler;
}) => (
  <button
    onClick={onClick}
    className={`p${direction == "left" ? "l" : "r"}-2 p${
      direction == "left" ? "r" : "l"
    }-0  py-1.5   ${direction}-0    text-xl absolute   hover:bg-gray-300  z-10 bg-[#eee]`}
  >
    {direction === "left" ? "‹" : "›"}
  </button>
);

const CaptionButton = ({
  index,
  selectedPageIndex,
  page,
  onOpen,
  onClose,
}: {
  index: number;
  selectedPageIndex: number;
  page: Element<TabPageProps>;
  onOpen: (num: number) => void;
  onClose: (num: number) => void;
}) => {
  return (
    <button
      key={index}
      className={`px-4 relative py-2 rounded-t-md flex-shrink-0 ${
        index === selectedPageIndex
          ? "bg-white font-semibold"
          : "hover:bg-gray-200"
      }`}
      onClick={() => {
        page.props.onOpen?.();
        onOpen(index);
      }}
    >
      {page.props.title}
      {(page.props.closeable === true || page.props.onClose) && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            page.props.onClose?.();
            onClose(index);
          }}
          className=" absolute right-0 top-0 m-1 hover:text-red-600 text-xs"
        >
          x
        </span>
      )}
    </button>
  );
};

const TabHeader = ({
  pages,
  onOpen,
  selectedPageIndex,
  addPage,
  onAddPage,
  onClose,
}: {
  pages: Elements<TabPageProps>;
  onOpen: (num: number) => void;
  selectedPageIndex: number;
  addPage: Element<TabAddPageProps> | null;
  onAddPage: () => void;
  onClose: (num: number) => void;
}) => {
  return (
    <>
      {
        // Renderizar las pestañas existentes
        pages.map((page, index) => (
          <CaptionButton
            key={index}
            index={index}
            selectedPageIndex={selectedPageIndex}
            page={page}
            onOpen={onOpen}
            onClose={onClose}
          />
        ))
      }

      {
        // Botón para añadir una nueva pestaña si se proporciona un TabAddPage
        addPage && (
          <button
            className={`px-4 py-2 flex-shrink-0 hover:bg-gray-200`}
            onClick={onAddPage}
          >
            {addPage.props.caption ?? "+"}
          </button>
        )
      }
    </>
  );
};

function createNewPage(AddPage: Element<TabAddPageProps> | null) {
  if (AddPage === null) return null;

  const newPage = <TabPage {...AddPage.props} />;

  return newPage;
}

export function Tabs({ children }: TabsProps) {
  const [pages, setPages] = useState<Elements<TabPageProps>>(() =>
    extractElements<TabPageProps>(children, TabPage)
  );
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [addPage, setAddPage] = useState<Element<TabAddPageProps> | null>(null);
  //#region  flechas scroll
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const cahePageRef = useRef<Elements<TabPageProps>>([]);
  const checkArrows = useCallback(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Mostrar flecha izquierda si hay desbordamiento y no estamos al principio
    setShowLeftArrow(hasOverflow && container.scrollLeft > 0);

    // Mostrar flecha derecha si hay desbordamiento y no estamos al final
    // Usamos un pequeño margen de 1px por si hay decimales en los cálculos del navegador
    setShowRightArrow(
      hasOverflow &&
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  }, []);
  useEffect(() => {
    const container = tabsContainerRef.current;
    if (!container) return;

    // Comprobación inicial
    checkArrows();

    // Añadir listeners para el scroll del contenedor y el re-dimensionamiento de la ventana
    container.addEventListener("scroll", checkArrows);
    window.addEventListener("resize", checkArrows);

    // Función de limpieza para eliminar los listeners cuando el componente se desmonte
    return () => {
      container.removeEventListener("scroll", checkArrows);
      window.removeEventListener("resize", checkArrows);
    };
  }, [pages, checkArrows]);
  //#endregion

  useEffect(() => {
    const addingPage: Element<TabAddPageProps> =
      extractElements<TabAddPageProps>(children, TabAddPage)?.[0];
    setAddPage(addingPage ?? null);
  }, [children]);


  useEffect(() => {
    if (pages.length > 0 && selectedPageIndex >= pages.length) {
      setSelectedPageIndex(0);
    }
  }, [pages.length, selectedPageIndex]);

  const handleAddPage = () => {
    if (addPage) {
      const newPage = createNewPage(addPage);
      if (newPage) {
        cahePageRef.current = [...cahePageRef.current, newPage];
        setPages((prevPages) => [...prevPages, newPage]);
        setSelectedPageIndex(pages.length);
        addPage.props.onCreate?.();
      }
    }
  };

  const handleClosePage = (index: number) => {
    const pageToClose = pages[index];
    cahePageRef.current = cahePageRef.current.filter(p => p !== pageToClose);
    setPages((prevPages) => prevPages.filter((_, i) => i !== index));
    if (selectedPageIndex >= index && selectedPageIndex > 0) {
      setSelectedPageIndex(selectedPageIndex - 1);
    }
  };

  const handleScroll = (scrollOffset: number) => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const selectedPageContent = pages[selectedPageIndex]?.props.children;

  return (
    <div className="min-h-[300px] relative overflow-hidden   flex flex-col w-[95%] mx-auto my-2 rounded-xl bg-[#eee] border border-[#0005]">
      {showLeftArrow && (
        <ArrowButton direction="left" onClick={() => handleScroll(-200)} />
      )}

      <div className="flex  items-center border-b px-3 mx-1 border-[#0005]">
        <div
          ref={tabsContainerRef}
          className={`flex-grow flex   overflow-x-auto whitespace-nowrap scroll-smooth ${styles["no-scrollbar"]}`}
        >
          <TabHeader
            pages={pages}
            onOpen={setSelectedPageIndex}
            selectedPageIndex={selectedPageIndex}
            addPage={addPage}
            onAddPage={handleAddPage}
            onClose={handleClosePage}
          />
        </div>
      </div>
      {showRightArrow && (
        <ArrowButton direction="right" onClick={() => handleScroll(200)} />
      )}
      <div className="p-4 bg-white m-1.5 rounded flex-1 ">
        {selectedPageContent ?? <h1>Sin Paginas</h1>}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import type { Children, List } from "../../Types";

type options = string | number | Children;

export function InputSelect() {


    const [active, setActive] = useState<boolean>(false);
    const options: List<options> = ["Hola", "que", "tal"];
    const [value, setValue] = useState<string | Children | number>(options[0]);
    const refValue = useRef<any>(options[0]);


    const select = (option: options) => {
        try {
            setValue(option);
            setActive(false);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        refValue.current = value;
    }, [value]);

    return <div className="bg-red-300 m-2 min-h-[30px] min-w-[80px] relative w-fit flex flex-col   rounded">

        {/* Boton que activa y desactiva el desplegable de las opciones */}
        <button className="flex flex-row" onClick={() => setActive(!active)}>
            <div className="flex-1">{value}</div>
            <span className={`mx-2 transition-transform transform rotate-${active ? 0 : 180}`}>A</span>
        </button>

        {/* Desplegable de las opciones */}
        <div className={`transition-all absolute transform translate-y-7 flex flex-col duration-500 ease-in-out bg-blue-300 w-[150%] rounded overflow-hidden ${active ? ' scale-100 max-h-[500px]' : ' scale-95 max-h-0'}`}>
            {options.map((option, index) => (<button onClick={() => { select(option) }} className="transition-all text-left px-2 duration-300 min-h-[30px] ease-in-out hover:bg-[#ccc7]" key={index}>{option}</button>))}
        </div>

    </div>;
}
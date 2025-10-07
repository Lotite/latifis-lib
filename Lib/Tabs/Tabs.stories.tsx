import { useState } from "react";
import type {  TabsProps } from "../Types";
import { TabAddPage } from "./TabAddPage";
import { TabPage } from "./TabPage";
import { Tabs } from "./Tabs";

export default {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};


export const TabsComponent = (arg:TabsProps) => 
<Tabs {...arg}>
    <TabPage title="Pagina 1">
        <h1>Contenido pagina 1</h1>
    </TabPage>
    <TabPage title="Pagina 2">
        <h1>Contenido pagina 2</h1>
    </TabPage>
</Tabs>

export const TabsClosable = (arg: TabsProps) =>
    <Tabs {...arg} >
        <TabPage  title="Pagina 1">
            <h1>Contenido pagina 1</h1>
        </TabPage>
        <TabPage  closeable title="Pagina 2">
            <h1>Contenido pagina 2</h1>
        </TabPage>
        <TabPage closeable title="Pagina 3">
            <h1>Contenido pagina 3</h1>
        </TabPage>
    </Tabs>


export const AddNewPage = (arg: TabsProps) =>{

    const [number,setNumber] = useState<number>(3)

    return (<Tabs {...arg} >
        <TabPage title="Pagina 1">
            <h1>Contenido pagina 1</h1>
        </TabPage>
        <TabPage closeable title="Pagina 2">
            <h1>Contenido pagina 2</h1>
        </TabPage>
        <TabAddPage onCreate={() => setNumber(number + 1)} onDelete={() =>{
            alert("Hola")
        }} closeable title={`Pagina ${number}`}>
            <h1>Contenido pagina {number}</h1>
        </TabAddPage>
    </Tabs>)
}



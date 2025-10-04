import { createClassName, createStyle } from "../../Functions";
import type { BasicStyleProps, Style } from "../../Types";

export class StyleClass {

    defaultClassName: string = "";
    defaultStyle: Style = {}
    disableStyles: boolean = false

    className: string = "";
    style: Style = {}



    constructor(
        { defaultClass = "", defaultStyle = {}, className = "", style = {}, disableStyles = false }:
            { defaultClass?: string, defaultStyle?: Style } & BasicStyleProps
    ){
        this.defaultClassName = defaultClass;
        this.defaultStyle = defaultStyle;
        this.className = className;
        this.style = { ...style };
        this.disableStyles = disableStyles;
    }

    static createStylesAndClassName(
        { defaultClass = "", defaultStyle = {}, className = "", style = {}, disableStyles = false }:
        { defaultClass?: string, defaultStyle?: Style } & BasicStyleProps
    ){
        const styleClass = new StyleClass({defaultClass, defaultStyle, className, style, disableStyles });
        return styleClass.getClassAndStyle();
    }


    getClassAndStyle() {
        return {
            className: createClassName(this.defaultClassName, this.className, this.disableStyles),
            style: createStyle(this.defaultStyle, this.style, this.disableStyles)
        }
    }



}

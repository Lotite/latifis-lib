import { useEffect, useState } from 'react'
import type { Element, Elements, OptionContainerProps, OptionsProps, SelectProps } from '../Types'
import Option from './Option'
import './Select.css'
import { extractElements } from '../Functions'
import { StyleClass } from '../Utils/Class/StyleClass'
import styles from "../../index.module.css";


import React from 'react'; // Asegurarse de que React esté importado

function OptionContainer<T = object>({ isOpen, options, selectOption }: OptionContainerProps<T>) {
	const clonedOptions = options.map(option => {
		const originalOnClick = option.props.onClick;
		const newOnClick = (e: React.MouseEvent<HTMLElement>) => {
			originalOnClick?.(e);
			selectOption(option);
		};
		return React.cloneElement(option, { onClick: newOnClick });
	});

	return <div className={`optionContainer ${styles["no-scrollbar"]} ${styles.animateDisplayNone}  ${isOpen ? "" : styles.hidden}`}>
		{clonedOptions}
	</div>
}





export function Select<T = object>({ children, value, onChangeValue, className, disableStyles, style, onChange, onInput, ...rest }: SelectProps<T>) {
	const [options, setOptions] = useState<Elements<OptionsProps<T>>>([])
	const [selectedOption, setSelectedOption] = useState<Element<OptionsProps<T>> | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		if (value !== undefined && options.length > 0) {
			const optionToSelect = options.find(option => option.props.value === value);
			if (optionToSelect) {
				setSelectedOption(optionToSelect);
			}
		}
	}, [value, options]);



	const defaultClass = "select";

	const styles = StyleClass.createStylesAndClassName({
		defaultClass,
		className,
		style,
		disableStyles
	})

	useEffect(() => {
		setOptions(extractElements<OptionsProps<T>>(children, Option))
	}, [children])


	useEffect(() => {
		if (selectedOption == null && options.length > 0) {

			setSelectedOption(options.find(option => option.props.selected) ?? options[0])
		}
	}, [options, selectedOption]) // Añadir dependencias para evitar bucles infinitos


	return <div
		onClick={() => setIsOpen(!isOpen)}
		onBlur={() => setIsOpen(false)}
		tabIndex={-1} {...rest} {...styles}>
		{selectedOption?.props.children}
		<OptionContainer
			isOpen={isOpen}
			options={options}
			selectOption={(option) => {
				setSelectedOption(option);
				setIsOpen(false);
				if (option?.props.value !== undefined && option.props.value !== null) {
					onChangeValue?.(option.props.value);
				}
			}}
		/>
	</div>
}

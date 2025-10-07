import { useEffect, useState } from 'react'
import type { Element, Elements, OptionContainerProps, OptionsProps, SelectProps } from '../Types'
import { Option } from './Option'
import './Select.css'
import { extractElements } from '../Functions'
import { StyleClass } from '../Utils/Class/StyleClass'
import styles from "../index.module.css";


import React from 'react';

function OptionContainer<T = object>({ isOpen, options, selectOption, className, disableStyles, style }: OptionContainerProps<T>) {


	const [clonedOptions, setClonedOptions] = useState<Elements<OptionsProps<T>>>([]);

	useEffect(() => {
		const temporalOptions = options.map(option => {
			const originalOnClick = option.props.onClick;
			const newOnClick = (e: React.MouseEvent<HTMLElement>) => {
				originalOnClick?.(e);
				selectOption(option);
			};
			const cloneted = React.cloneElement(option, { ...option.props, className: `${"option cloned"}`, onClick: newOnClick });


			return React.cloneElement(cloneted);
		});

		setClonedOptions(temporalOptions)
	}, [options])

	const styleProps = StyleClass.createStylesAndClassName({
		defaultClass: `optionContainer ${styles["no-scrollbar"]} ${styles.animateDisplayNone}  ${isOpen ? "" : styles.hidden}`,
		className,
		style,
		disableStyles
	})


	return <div {...styleProps}>
		{clonedOptions}
	</div>
}





export function Select<T = object>({ children, value, onChangeValue, className, disableStyles, style, onChange, onInput, ClassNameModal, StyleModal, disableStylesModal, ...rest }: SelectProps<T>) {
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
		const newOptions = extractElements<OptionsProps<T>>(children, Option);
		setOptions(newOptions)
		setSelectedOption(old=>newOptions.find(newOption => newOption.props.value === old?.props.value) ?? null)
	}, [children])


	useEffect(() => {
		if (selectedOption == null && options.length > 0) {
			const currentOption = options.find(option => option.props.selected) ?? options[0];
			setSelectedOption(currentOption)
			onChangeValue?.(currentOption.props.value);
		}
	}, [options, selectedOption])


	return <div
		onClick={() => setIsOpen(!isOpen)}
		onBlur={() => setIsOpen(false)}
		tabIndex={-1} {...rest} {...styles}>
		{selectedOption?.props.children}
		<OptionContainer
			className={ClassNameModal}
			style={StyleModal}
			disableStyles={disableStylesModal}
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

import './HR.css'
import type { THR } from "../Types"
import { StyleClass } from '../Utils/Class/StyleClass'



export  function HR(props: THR) {

	const StylesProps = StyleClass.createStylesAndClassName({
		...props,
		defaultClass:"hr"
	})

	
	
	

	return <hr {...StylesProps} />
}

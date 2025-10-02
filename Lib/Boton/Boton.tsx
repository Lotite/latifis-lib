import './Boton.css'

export interface IBotonProps {
	label?: string
}

export default function Boton(props: IBotonProps) {
	return <div className='boton'>
		{props.label}
	</div>
}

import type { Meta, StoryObj } from '@storybook/react';
import Boton from '.';

const meta: Meta<typeof Boton> = {
	title: 'Components/Boton',
	component: Boton,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Etiqueta del botón',
			defaultValue: 'Botón por defecto',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Boton>;

export const Plain: Story = {
	args: {
		label: 'Botón por defecto',
	},
};

export const Primary: Story = {
	args: {
		label: 'Botón primario',
	},
};

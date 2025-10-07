import type { THR } from "../Types";
import { HR } from "./HR";

export default {
	title: 'Components/HR',
	component: HR,
};


export const HRComponent = (args: THR) => {
	return <HR {...args} />;
}

HRComponent.args = {
}

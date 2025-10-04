import type { SelectProps } from "../Types";
import Option from "./Option";
import { Select } from "./Select";
export default {
	title: 'Components/Select',
	component: Select,
};


export const Plain = (args: SelectProps<string>) => {
	return <Select<string> onChangeValue={(value) => { alert(value) }} {...args} >
		<Option value="option1">Option 1</Option>
		<Option value="option2">Option 2</Option>
		<Option selected value="option3">Option 3</Option>
		<Option value="option2">Option 2</Option>
		<Option value="option2">Option 2</Option>
		<Option value="option2">Option 2</Option>
		<Option value="option2">Option 2</Option>
		<Option value="option2">Option 2</Option>
		<Option value="option2">Option 2aaaaaaaaaaaaaa</Option>
	</Select>;
}

Plain.args = {
}

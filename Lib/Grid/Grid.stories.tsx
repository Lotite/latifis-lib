import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { GridColumn } from './GridColumn';
import type { List } from '../Types'


const meta: Meta<typeof Grid> = {
    title: 'Components/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
    },
};

export default meta;

type Story = StoryObj<typeof Grid<MyData>>;

interface MyData {
    id: number;
    name: string;
    age: number;
    city?: string; 
}

const dataList: List<MyData> = [
    { id: 1, name: 'Alice', age: 30, city: 'New York' },
    { id: 2, name: 'Bob', age: 24, city: 'Los Angeles' },
    { id: 3, name: 'Charlie', age: 35, city: 'Chicago' }
]


export const GridSimple: Story = {
    args: {
        DataList: dataList
    },
    render: (args) => (
        <Grid  {...args}>
            <GridColumn key={1} CaptionTitle='Id' dataField={"id"} />
            <GridColumn key={1} CaptionTitle='Name' dataField={"name"} />
            <GridColumn key={1} CaptionTitle='Age' dataField={"age"} />
        </Grid>
    ),
    parameters: {
        docs: {
            source: {
                code: `<Grid  {...args}>
            <GridColumn key={1} CaptionTitle='Id' dataField={"id"} />
            <GridColumn key={1} CaptionTitle='Name' dataField={"name"} />
            <GridColumn key={1} CaptionTitle='Age' dataField={"age"} />
        </Grid>
        `.trim(),
            },
        },
    },
};

export const GridWhitChildren: Story = {
    args: {
        DataList: dataList,
    },
    render: (args) => (
        <Grid<MyData> {...args}>
            <GridColumn key={1} CaptionTitle="Id" dataField="id" />
            <GridColumn key={2} CaptionTitle="Name" dataField="name" />
            <GridColumn key={3} CaptionTitle="Age" dataField="age" />
            <GridColumn<MyData> key={4} CaptionTitle="City">
                {(data) => <span className="text-red-500">{data.city || 'N/A'}</span>}
            </GridColumn>
        </Grid>
    ),
    parameters: {
        docs: {
            source: {
                code: `
<Grid<MyData> {...args}>
  <GridColumn key={1} CaptionTitle="Id" dataField="id" />
  <GridColumn key={2} CaptionTitle="Name" dataField="name" />
  <GridColumn key={3} CaptionTitle="Age" dataField="age" />
  <GridColumn<MyData> key={4} CaptionTitle="City">
    {(data) => <span className="text-red-500">{data.city || 'N/A'}</span>}
  </GridColumn>
</Grid>
        `.trim(),
            },
        },
    },
};


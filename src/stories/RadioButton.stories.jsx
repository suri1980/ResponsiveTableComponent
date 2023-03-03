import React, {useContext} from 'react';
import RadioButton from '../components/input/radiobutton/RadioButton';
import { TableContext } from '../lib/contexts/TableContext'


export default {
    title: 'Example/RadioButton',
    component: RadioButton,
    argTypes: {

    }
}



const Template = (args) => <RadioButton {...args} />

export const StatusChecked = Template.bind({})

StatusChecked.decorators = [
    Story => (<TableContext.Provider value={{selectedRows: [], updatedSelectedRows: () => {} }}><Story /></TableContext.Provider>)
]

StatusChecked.args = {
    name: 'radio',
    value: 1,
    checked: true
}

export const StatusUnChecked = Template.bind({})

StatusUnChecked.decorators = [
    Story => (<TableContext.Provider value={{selectedRows: [], updatedSelectedRows: () => {} }}><Story /></TableContext.Provider>)
]

StatusUnChecked.args = {
    name: 'radio',
    checked: true,
}

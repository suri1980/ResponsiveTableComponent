import React, {useContext} from 'react';
import CheckBox from '../components/input/checkbox/CheckBox'
import { TableContext } from '../lib/contexts/TableContext'
import styles from '../components/input/checkbox/checkbox.css'


export default {
    title: 'Example/CheckBox',
    component: CheckBox,
    argTypes: {

    }
}

const Template = (args) => <CheckBox {...args} />

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
    name: 'checkbox',
    checked: false,
}
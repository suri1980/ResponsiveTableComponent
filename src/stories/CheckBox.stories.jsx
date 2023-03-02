import React from 'react';
import CheckBox from '../components/input/checkbox/CheckBox'

export default {
    title: 'Example/CheckBox',
    component: CheckBox,
    argTypes: {

    }
}

const Template = (args) => <CheckBox {...args} />

export const CheckedCase = Template.bind({})
CheckedCase.args = {
    name: 'checkbox',
    checked: true,
}

export const Uncheckedase = Template.bind({})
Uncheckedase.args = {
    name: 'checkbox',
    checked: false,
}
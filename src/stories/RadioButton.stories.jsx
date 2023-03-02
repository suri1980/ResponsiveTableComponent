import React from 'react';

import RadioButton from '../components/input/radiobutton/RadioButton';

export default {
    title: 'Example/RadioButton',
    component: RadioButton,
    argTypes: {

    }
}

const Template = (args) => <RadioButton {...args} />

export const CheckedCase = Template.bind({})
CheckedCase.args = {
    name: 'radio',
    checked: true,
}

export const Uncheckedase = Template.bind({})
Uncheckedase.args = {
    name: 'radio',
    checked: false,
}
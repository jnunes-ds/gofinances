import React from 'react';
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile';

test('Check if show correctly user input name placeholder', () => {
	const { getByPlaceholderText } = render(<Profile />);

	const inputName = getByPlaceholderText('First Name');

	expect(inputName).toBeTruthy()
});

test('checks if user data has been loaded', () => {
	const { getByTestId } = render(<Profile />);

	const  inputName = getByTestId('input-name');
	const  inputSurName = getByTestId('input-surname');

	expect(inputName.props.value).toEqual('Junior');
	expect(inputSurName.props.value).toEqual('Nunes');
});

test('checks if title render correctly', () => {
	const { getByTestId } = render(<Profile />);

	const textTitle = getByTestId('text-title');

	expect(textTitle.props.children).toContain('Profile');
});

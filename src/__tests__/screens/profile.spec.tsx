import React from 'react';
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile';

describe('Profile',() => {
	it('Must have a correct name in the username input', () => {
		const { getByPlaceholderText } = render(<Profile />);
	
		const inputName = getByPlaceholderText('First Name');
	
		expect(inputName).toBeTruthy()
	});
	
	it('should have the user data loaded', () => {
		const { getByTestId } = render(<Profile />);
	
		const  inputName = getByTestId('input-name');
		const  inputSurName = getByTestId('input-surname');
	
		expect(inputName.props.value).toEqual('Junior');
		expect(inputSurName.props.value).toEqual('Nunes');
	});
	
	it('should exist a correctly title', () => {
		const { getByTestId } = render(<Profile />);
	
		const textTitle = getByTestId('text-title');
	
		expect(textTitle.props.children).toContain('Profile');
	});

});


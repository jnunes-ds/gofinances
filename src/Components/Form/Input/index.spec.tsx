import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from '.';

describe('Input Component', () => {
	it('Must have specific border color when is active', () => {
		const { getByTestId } = render(
			<Input 
				testID='input-email'
				placeholder='E-mail'
				keyboardType='email-address'
				autoCorrect={false}
				active
			/>
		);

		const inputComponent = getByTestId('input-email');

		expect(inputComponent.props.style[0].borderColor)
			.toEqual('#E83F5B');

		expect(inputComponent.props.style[0].borderWidth)
			.toEqual(3);
	});
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../../../RootNavigation';

import { Register } from '.';


const Providers: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme} >
			<NavigationContainer ref={navigationRef} >
				{ children }
			</NavigationContainer>
		</ThemeProvider>
	);
}

describe('Register Screen', () => {
	it('Category Modal should be open when user click`s on the category button', () => {
		const { getByTestId } = render(
			<Register />, {
				wrapper: Providers
			}
		);

		const categoryModal = getByTestId('modal-category');
		const buttonCategory = getByTestId('category-select-button');
		fireEvent.press(buttonCategory);

		expect(categoryModal.props.visible).toBeFalsy();

	})
});
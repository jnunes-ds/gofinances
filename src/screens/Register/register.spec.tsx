import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../../../RootNavigation';

import { Register } from '.';


const Providers: React.FC = ({ children }) => {
	return (
	<NavigationContainer ref={navigationRef} >
		<ThemeProvider theme={theme} >
			{ children }
		</ThemeProvider>
	"</NavigationContainer>
	);
}

describe('Register Screen', () => {
	it('Category Modal should be open when user click`s on the category button', async () => {
		const { getByTestId } = render(
			<Register />, {
				wrapper: Providers
			}
		);

		const categoryModal = getByTestId('modal-category');
		const buttonCategory = getByTestId('category-select-button');
		fireEvent.press(buttonCategory);

		await waitFor(async () => {
			expect(categoryModal.props.visible).toBeTruthy();
		}, { timeout: 5000 });

	})
});
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-google-app-auth', () => {
	return {
		logInAsync: () => {
			return {
				type: 'success',
				user: {
					id: '123-456-789',
					email: 'junior@mail.com',
					name: 'Junior',
					photo: 'photo.png'
				}
			}
		}
	}
});

describe('Auth Hook', () => {
	it('Should be able to sign in with google existing account', async () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).toBeTruthy();
		expect(result.current.user.email).toEqual('junior@mail.com')

	});
});
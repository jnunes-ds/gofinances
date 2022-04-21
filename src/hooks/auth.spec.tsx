import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { logInAsync } from 'expo-google-app-auth';

// jest.mock('expo-google-app-auth', () => {
// 	return {
// 		logInAsync: () => {
// 			return {
// 				type: 'success',
// 				user: {
// 					id: '123-456-789',
// 					email: 'junior@mail.com',
// 					name: 'Junior',
// 					photo: 'photo.png'
// 				}
// 			}
// 		}
// 	}
// });

describe('Auth Hook', () => {
	it('Should be able to sign in with google existing account', async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockReturnValue({
				type: 'success',
				user: {
					id: '123-456-789',
					email: 'junior@mail.com',
					name: 'Junior',
					photo: 'photo.png'
				}
			});


		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).toBeTruthy();
		expect(result.current.user.email).toEqual('junior@mail.com');

	});

	it('user should not connect if cancel authentication with Google', async () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).not.toHaveProperty('id');

	});
});
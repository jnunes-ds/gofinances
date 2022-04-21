import { renderHook, act } from '@testing-library/react-hooks';
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

jest.mock('expo-google-app-auth');

// @ts-ignore
const googleMocked = logInAsync as jest.MockedClass<typeof logInAsync>;

describe('Auth Hook', () => {

	it('Should be able to sign in with google existing account', async () => {
    googleMocked.mockResolvedValueOnce({
      type: 'success',
      user: {
        id: '123-456-789',
        email: 'junior@mail.com',
        name: 'Junior',
        photo: 'photo.png'
      }
    })

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).toBeTruthy();
		expect(result.current.user.email).toEqual('junior@mail.com');

	});

	it('user should not connect if cancel authentication with Google', async () => {
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });
    

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).not.toHaveProperty('id');

	});
});
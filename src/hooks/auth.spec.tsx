import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

describe('Auth Hook', () => {
	it('Should be able to sign in with google existing account', async () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider
		});
		
		await act(() => result.current.singInWithGoogle());

		expect(result.current.user).toBeTruthy();

	});
});
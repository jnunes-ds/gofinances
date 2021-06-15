import React, {
    createContext, 
    ReactNode, 
    useContext,
    useEffect,
    useState,
} from 'react';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps{
    children: ReactNode;
}

interface IUser{
    id: string;
    name: string;
    email: string;
    photo?: string | undefined;
}

interface IAuthContextData{
    user: IUser;
    singInWithGoogle(): Promise<void>
    singInWithApple(): Promise<void>
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [user, setUser] = useState<IUser>({} as IUser);
    const [userStorageLoading, seUserStorageLoading] = useState(true);

    const userStorageKey = '@gofinances:user';

    async function singInWithGoogle(){
        try {
            const result = await Google.logInAsync({
                iosClientId: '',
                androidClientId: '1057683706020-7s62n190ohu12o8ughnmmtvl4e5lrtu0.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            })

            if(result.type === 'success'){
                const userLogged = {
                    id: String(result.user.id),
                    email: result.user.email!,
                    name: result.user.name!,
                    photo: result.user.photoUrl!
                };
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        }catch(error: any){
            throw new Error(error);
        }
    }

    async function singInWithApple(){
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });
            if(credential){
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName?.givenName!,
                    photo: undefined
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }


        } catch (error: any) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function loadUserStorageData(): Promise<void>{
            const userStorage = await AsyncStorage.getItem(userStorageKey);

            if(userStorage){
                const userLogged = JSON.parse(userStorage) as IUser;
                setUser(userLogged);
            }
            seUserStorageLoading(false);
        }

        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            singInWithGoogle,
            singInWithApple
        }}>   
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }
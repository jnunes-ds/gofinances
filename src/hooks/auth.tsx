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
    singInWithGoogle(): Promise<void>;
    singInWithApple(): Promise<void>;
    singOut(): Promise<void>;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);
    
function AuthProvider({ children } : AuthProviderProps){
    const [user, setUser] = useState<IUser>({} as IUser);
    const [userStorageLoading, seUserStorageLoading] = useState(true);

    const userStorageKey = '@gofinances:user';

    async function singInWithGoogle(){
        try {
            const result = await Google.logInAsync({
                iosClientId: '1057683706020-3i7hu719j0ivps93u60qrgt9uddim77b.apps.googleusercontent.com',
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
                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&lingth=1`;

                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName?.givenName!,
                    photo
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }


        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function singOut(){
        setUser({} as IUser);

        await AsyncStorage.removeItem(userStorageKey);
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
            singInWithApple,
            singOut,
            userStorageLoading
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
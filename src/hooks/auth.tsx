import React, {
    createContext, 
    ReactNode, 
    useContext,
    useState
} from 'react';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps{
    children: ReactNode;
}

interface IUser{
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData{
    user: IUser;
    singInWithGoogle(): Promise<void>
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children } : AuthProviderProps){
    const [user, setUser] = useState<IUser>({} as IUser);

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
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))
            }
        }catch(error: any){
            throw new Error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            singInWithGoogle
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
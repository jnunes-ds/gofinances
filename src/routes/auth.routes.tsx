import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SingIn } from '../screens/SingIn';

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator
            headerMode="none"
        >
            <Screen 
                name="SingIn"
                component={SingIn}
            />
        </Navigator>
    );
}
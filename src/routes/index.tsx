import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../../RootNavigation';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/auth';

export function Routes(){
    const { user } = useAuth();

    return(
        <NavigationContainer
            ref={navigationRef}
        >
            { user.id ? <AppRoutes /> : <AuthRoutes /> }
        </NavigationContainer>
    );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import { Add, Save } from '../screens';

const Stack = createStackNavigator()

const HomeNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='main'
                    component={TabNavigation}
                    options={{
                        header:()=>null
                    }}
                />
                <Stack.Screen 
                    name='save'
                    component={Save}
                    options={{
                        
                    }}
                />
                <Stack.Screen 
                    name='add'
                    component={Add}
                    options={{
                
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default HomeNavigation;
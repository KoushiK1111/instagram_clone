import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Signin, Signup } from '../screens';

const Stack = createStackNavigator()

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='signin'
                    component={Signin}
                    options={{
                        header:()=>null
                    }}
                />
                <Stack.Screen 
                    name='signup'
                    component={Signup}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
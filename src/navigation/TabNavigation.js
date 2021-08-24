import React from 'react';
import firebase from 'firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Add, Profile, Reels, Search, EmptyScreen } from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Image, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
    //const [color]
    return (
            <Tab.Navigator>
                <Tab.Screen 
                    name='home'
                    component={Home}
                    options={{
                        title:()=>null,
                        header:()=>null,
                        tabBarIcon:({color})=>{
                            return <Ionicons name="home-outline" color={color}  size={26} />
                        },
                        tabBarActiveTintColor:'red'
                        
                    }}
                />
                <Tab.Screen 
                    name='search'
                    component={Search}
                    options={{
                        title:()=>null,
                        header:()=>null,
                        tabBarIcon:({color})=>{
                            return <Ionicons name="search" color={color}  size={26} />
                        },
                        tabBarActiveTintColor:'red'
                    }}
                />
                {/* <Tab.Screen 
                    name='reels'
                    component={Reels}
                    options={{
                        title:()=>null,
                        header:()=>null,
                        tabBarIcon:({color})=>{
                            return <TouchableOpacity>
                                <Image source={require('../asserts/reel.jpg')} style={{height:35,width:35,backgroundColor:'blue' }} />
                            </TouchableOpacity>
                        },
                        tabBarActiveTintColor:'red'
                    }}
                /> */}
                <Tab.Screen 
                    name='addContainer'
                    component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("add")
                        }
                    })}
                    options={{
                        title:()=>null,
                        header:()=>null,
                        tabBarIcon:({color})=>{
                            return <Ionicons name="add-circle" color={color}  size={30} />
                        },
                        tabBarActiveTintColor:'red'
                    }}
                />
                <Tab.Screen 
                    name='profile'
                    component={Profile}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("profile",{uid:firebase.auth().currentUser.uid})
                        }
                    })}
                    options={{
                        title:()=>null,
                        header:()=>null,
                        tabBarIcon:({color})=>{
                            return <Ionicons name="person" color={color}  size={26} />
                        },
                        tabBarActiveTintColor:'red'
                    }}
                />
                
            </Tab.Navigator>
    );
}

export default TabNavigation;
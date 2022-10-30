import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import CreatePinScreen from '../screens/CreatePinScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeTopTab from './HomeTopTab'
import PinStack from './PinStack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import SearchScreebStackNavigator from './SearchScreenStackNavigator';

const Tab = createBottomTabNavigator();
const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
            }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 30,
                    borderRadius: 50,
                    backgroundColor: '#404040',
                    marginHorizontal: '25%',
                    borderTopWidth: 0,
                },
            }}
        >
            <Tab.Screen
                name="Main"
                component={PinStack}
                // component={LoginScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='home' size={24} color={focused ? 'white' : '#b3b3b3'} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreebStackNavigator}
                // component={SignupScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='search' size={24} color={focused ? 'white' : '#b3b3b3'} />
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Create"
                component={CreatePinScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='plus' size={24} color={focused ? 'white' : '#b3b3b3'} />
                        )
                    },
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon name='user' size={24} color={focused ? 'white' : '#b3b3b3'} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs

const styles = StyleSheet.create({})
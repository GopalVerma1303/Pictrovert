import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { createStackNavigator } from '@react-navigation/stack';
import PinStack from './PinStack';
import Tabs from './Tabs';
import { useAuthenticationStatus } from '@nhost/react';

const Stack = createStackNavigator();
const GlobalStackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    })
    const { isLoading, isAuthenticated } = useAuthenticationStatus();
    if (isLoading) {
        return <ActivityIndicator />
    }
    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: 'red' } }}>
            {
                !isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, cardStyleInterpolator: forFade, headerBackTitleVisible: false }} />
                        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false, cardStyleInterpolator: forFade, headerBackTitleVisible: false }} />
                    </>
                ) : (
                    <Stack.Screen name="ScreenAfterLogin" component={Tabs} options={{ headerShown: false, cardStyleInterpolator: forFade, headerBackTitleVisible: false }} />
                )
            }
        </Stack.Navigator>
    )
}

export default GlobalStackNavigator

const styles = StyleSheet.create({})
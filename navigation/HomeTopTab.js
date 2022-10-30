import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import TrendingScreen from '../screens/TrendingScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PinStack from './PinStack';

const Tab = createMaterialTopTabNavigator();

const HomeTopTab = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: '#b3b3b3',
                }
            }}
            tabBarLabelStyle={{
                color: 'red',
            }}
            screenOptions={{
                tabBarLabelStyle: { color: '#b3b3b3', fontWeight: '900' },
                tabBarStyle: {
                    backgroundColor: "#1a1a1a",
                },

            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Trending" component={TrendingScreen} />
        </Tab.Navigator>
    )
}

export default HomeTopTab

const styles = StyleSheet.create({})
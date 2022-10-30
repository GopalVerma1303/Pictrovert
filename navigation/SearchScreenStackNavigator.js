import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PinScreen from '../screens/PinScreen';
import HomeTopTab from './HomeTopTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchScreen from '../screens/SearchScreen';
import CategorySpecificScreen from '../screens/CategorySpecificScreen';
const Stack = createStackNavigator();

const CategoryPinStack = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="CategorySpecificScreen" component={CategorySpecificScreen}
                options={{ cardStyleInterpolator: forFade, headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default CategoryPinStack

const styles = StyleSheet.create({})
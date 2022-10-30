import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PinScreen from '../screens/PinScreen';
import HomeTopTab from './HomeTopTab';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();

const PinStack = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'red' },
                title: 'Pictrovert',
                headerTitleStyle: {
                    color: '#b3b3b3',
                    fontSize: 30,
                    letterSpacing: -3
                },
                headerRight: () => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Icon style={{ right: 20 }} name='ellipsis-h' size={20} color="#b3b3b3" />
                        </View>
                    )
                },
                headerLeft: () => {
                    return (
                        <View style={{ flexDirection: 'row' }}>
                        </View>
                    )
                },
                headerStyle: {
                    backgroundColor: '#1a1a1a',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }
            }}>
            <Stack.Screen name="HomeTopTab" component={HomeTopTab} />
            <Stack.Screen name="Pin" component={PinScreen}
                options={{ cardStyleInterpolator: forFade, headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default PinStack

const styles = StyleSheet.create({})
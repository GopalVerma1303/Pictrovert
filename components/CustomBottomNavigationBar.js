import { StyleSheet, Text, View, Pressable, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const CustomBottomNavigationBar = ({ screenIndex, setScreenIndex }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 30 }}>{screenIndex}</Text>
                <StatusBar style="auto" />
            </View>
            <View style={styles.navContainer}>
                <View style={styles.navBar}>
                    <View style={{ flexDirection: 'row', padding: 14 }}>
                        <Pressable onPress={() => setScreenIndex(0)}
                            android_ripple={{ borderless: true, radius: 20, color: 'white' }}
                            style={styles.iconBehave}>
                            <MaterialIcons name='home' size={25} color='white' />
                        </Pressable>
                        <Pressable onPress={() => setScreenIndex(1)}
                            android_ripple={{ borderless: true, radius: 20, color: 'white' }}
                            style={styles.iconBehave}>
                            <MaterialIcons name='search' size={25} color='white' />
                        </Pressable>
                        <Pressable onPress={() => setScreenIndex(2)}
                            android_ripple={{ borderless: true, radius: 20, color: 'white' }}
                            style={styles.iconBehave}>
                            <MaterialIcons name='settings' size={25} color='white' />
                        </Pressable>
                        <Pressable onPress={() => setScreenIndex(3)}
                            android_ripple={{ borderless: true, radius: 20, color: 'white' }}
                            style={styles.iconBehave}>
                            <MaterialIcons name='person' size={25} color='white' />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CustomBottomNavigationBar


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 24,
    },
    navBar: {
        flexDirection: 'row',
        width: Platform.OS === 'web' ? '95%' : '80%',
        justifyContent: 'space-evenly',
        borderRadius: 50,
        backgroundColor: 'black',
    },
    iconBehave: {
        paddingHorizontal: 14,
    }
})
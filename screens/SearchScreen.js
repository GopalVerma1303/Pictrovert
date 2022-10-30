import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryTile from '../components/CategoryTile';
import pins from '../assets/pins';
import CategoriesArray from '../assets/CategoriesArray';
import { useNavigation } from '@react-navigation/native'


const SearchScreen = () => {
    const navigator = useNavigation();
    return (
        <SafeAreaView style={{ backgroundColor: '#1a1a1a' }}>
            <View style={{ backgroundColor: '#1a1a1a', height: '100%', top: 20 }}>
                <View style={{ alignItems: 'center', padding: 25 }}>
                    <Text style={{ color: 'white', fontSize: 40, color: '#b3b3b3', fontWeight: '900', padding: 5, letterSpacing: -2 }}>Ideas for you</Text>
                </View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }} >
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '45%' }}>
                            {CategoriesArray
                                .filter((item, index) => index % 2 === 0)
                                .map((pin) => (
                                    <CategoryTile catImgURL={pin.image} catTitle={pin.name} />
                                ))}
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '45%' }}>
                            {CategoriesArray
                                .filter((item, index) => index % 2 === 1)
                                .map((pin) => (
                                    <CategoryTile catImgURL={pin.image} catTitle={pin.name} />
                                ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({})
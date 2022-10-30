import { StyleSheet, Text, View, ScrollView, FlatList, Alert, RefreshControl, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pins from '../components/Pins'
import MasonryList from '../components/MasonryList'
import { useEffect, useState } from 'react'
import { useNhostClient } from '@nhost/react'
import { useRoute, useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';


const CategorySpecificScreen = () => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const nhost = useNhostClient();
    const Route = useRoute();
    const catTitle = Route.params?.catTitle;

    const navigation = useNavigation();

    const fetchPins = async () => {
        setLoading(true)
        const response = await nhost.graphql.request(`
        query MyQuery {
            pins(where: {category: {_eq: "${catTitle}"}}) {
              category
              created_at
              id
              image
              title
              user_id
            }
          }
        `);
        if (response.error) {
            Alert.alert("Error while looding pins", response.error[0].message);
        } else {
            setPins(response.data.pins);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchPins();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#1a1a1a', height: '100%' }}>
            <Pressable
                style={styles.backbtn} onPress={() => { navigation.goBack() }}>
                <Icon name='chevron-left' color='white' size={20} style={{ top: 5, left: 5 }} />
            </Pressable>
            <Pressable
                style={styles.morebtn} onPress={() => { navigation.goBack() }}>
                <Icon name='ellipsis-h' color='white' size={20} style={{ top: 5, left: 7 }} />
            </Pressable>
            <View style={{ marginTop: 50 }}>
                <View style={{ paddingVertical: 50, paddingHorizontal: 20 }}>
                    <Text style={{ color: '#b3b3b3', fontSize: 40, fontWeight: '800', letterSpacing: -3 }}>{catTitle}</Text>
                </View>
                <MasonryList pins={pins} refreshing={false} onRefresh={fetchPins} />
            </View>
        </SafeAreaView>
    )
}

export default CategorySpecificScreen
const styles = StyleSheet.create({
    backbtn: {
        zIndex: 100,
        position: 'absolute',
        top: 60,
        left: 20,
        height: 40,
        width: 40,
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 50,
    },
    morebtn: {
        position: 'absolute',
        top: 60,
        right: 20,
        height: 40,
        width: 40,
        backgroundColor: 'gray',
        padding: 5,
        borderRadius: 50,
    },
})
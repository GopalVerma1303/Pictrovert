import { StyleSheet, Text, View, ScrollView, FlatList, Alert, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Pins from '../components/Pins'
import MasonryList from '../components/MasonryList'
import { useEffect, useState } from 'react'
import { useNhostClient } from '@nhost/react'

const HomeScreen = () => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);
    const nhost = useNhostClient();

    const fetchPins = async () => {
        setLoading(true)
        const response = await nhost.graphql.request(`
        query MyQuery {
            pins {
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
            Alert.alert("Error while looding pins");
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
            <MasonryList pins={pins} refreshing={false} onRefresh={fetchPins} />
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
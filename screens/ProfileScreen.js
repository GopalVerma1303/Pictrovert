import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useNhostClient, useSignOut, useUserId } from '@nhost/react';
import MasonryList from '../components/MasonryList';

const GET_USER_QUERY =
    `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    email
  }
}
`;

const ProfileScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [user, setUser] = useState({});
    const navigation = useNavigation();
    const { signOut } = useSignOut();
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(false);

    const nhost = useNhostClient();
    const userId = useUserId();

    const fetchPins = async () => {
        setLoading(true);
        const response = await nhost.graphql.request(`
        query MyQuery {
            pins(where: {user_id: {_eq: "${userId}"}}) {
              id
              image
              link
              title
              category
              created_at
              description
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

    const fetchUserData = async () => {
        const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
        console.log(result);
        if (result.error) {
            Alert.alert("Error fetching the user", result.error[0].message);
        } else {
            setUser(result.data.user);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (!user) {
        return <ActivityIndicator />;
    }

    return (
        <ScrollView style={{ backgroundColor: '#1a1a1a' }} contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={fetchPins}
                />}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginTop: 40, width: '90%' }}>
                <TouchableOpacity onPress={signOut} style={{ padding: 5 }}>
                    <Icon name='sign-out' color='white' size={24} />
                </TouchableOpacity>
            </View>
            <Image source={{ uri: (user.avatarUrl == "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank") ? "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank" : "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" }} style={styles.image} />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Text style={styles.title}>{user.displayName}</Text>
                <Text style={styles.subTitle}>{user.email}</Text>
                <Text style={styles.subTitle}>ID : {user.id}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.title}>Your Posts</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 11 }}>
                <MasonryList pins={pins} refreshing={false} onRefresh={fetchPins} />
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        color: '#fff'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    image: {
        aspectRatio: 1,
        width: 150,
        borderRadius: 150,
        marginTop: 50
    },
    subTitle: {
        color: '#b3b3b3',
        fontWeight: '600',
    }
})
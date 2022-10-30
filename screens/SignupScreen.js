import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useNhostClient } from '@nhost/react';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("");

    const nhost = useNhostClient();
    const onSignUpPressed = async () => {
        const result = await nhost.auth.signUp({
            email: email,
            password: password,
            avatarUrl: avatarUrl,
            options: {
                displayName: name,
            },
        });
        if (result.error) {
            Alert.alert("Error signing up", result.error.message)
        } else {
            navigation.navigate("ScreenAfterLogin")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/pop2.png")} style={styles.images} />
            <Text style={styles.title}>Pictrovert</Text>
            <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setName(text)} backgroundColor={'white'} width='80%' placeholder="Enter Name here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View>
            <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setEmail(text)} backgroundColor={'white'} width='80%' placeholder="Enter Email here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View>
            <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setPassword(text)} backgroundColor={'white'} width='80%' placeholder="Enter Password here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View>
            {/* <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setAvatarUrl(text)} backgroundColor={'white'} width='80%' placeholder="Enter Avatar URL here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View> */}

            <TouchableOpacity onPress={() => onSignUpPressed()}>
                {/* onPress={() => navigation.navigate('ScreenAfterLogin')} */}
                <View style={{ height: 50, width: '80%', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 50, padding: 15, margin: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Sign up</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Already have an account? </Text><TouchableOpacity onPress={() => navigation.navigate("Login")}><View><Text style={{ color: 'red', fontWeight: '600' }}>Login</Text></View></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    loginBtn: {
        backgroundColor: 'red'
    },
    images: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        opacity: 0.7
    },
    title: {
        color: 'white',
        fontSize: 30,
        letterSpacing: -10,
        fontSize: 80,
        padding: 5,
        fontWeight: '400'
    }
})
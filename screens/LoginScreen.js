import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useNhostClient } from '@nhost/react';


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const nhost = useNhostClient();

    const onSignInPressed = async () => {
        // const result = await nhost.auth.signIn({
        //     email: email,
        //     password: password,
        // });
        // if (result.error) {
        //     Alert.alert("Error Logging in", result.error.message)
        // }
        // else {
        //     navigation.navigate("ScreenAfterLogin")
        // }
        console.log(email, password);
        const result = await nhost.auth.signIn({
            email: email,
            password: password,
        })
        if (result.error) {
            Alert.alert("Error while Logging in", result.error.message);
        } else {
            navigation.navigate("ScreenAfterLogin");
        }
        console.log(result);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../assets/pop1.png")} style={styles.images} />
            <Text style={styles.title}>Pictrovert</Text>
            <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setEmail(text)} backgroundColor={'white'} width='80%' placeholder="Enter Email here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View>
            <View style={{ height: 50, width: '80%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                <TextInput onChangeText={(text) => setPassword(text)} backgroundColor={'white'} width='80%' placeholder="Enter Password here..." placeholderTextColor="#a1a1a1" color='gray' />
            </View>
            <TouchableOpacity onPress={() => onSignInPressed()}>
                <View style={{ height: 50, width: '80%', backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 50, padding: 15, margin: 10 }}>
                    <Text style={{ color: 'white', fontWeight: '700' }}>Login</Text>
                </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Don't have an account? </Text><TouchableOpacity onPress={() => navigation.navigate("Signup")}><View><Text style={{ color: 'red', fontWeight: '600' }}>Sign up</Text></View></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

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
        opacity: 0.6
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
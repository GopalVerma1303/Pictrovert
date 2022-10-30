import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from '@expo/vector-icons/build/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import PinScreen from '../screens/PinScreen'
import { useNhostClient } from '@nhost/react'
import RemoteImage from './RemoteImage'

const Pins = (props) => {
    const { id, image, title } = props.pins;
    const [imageUri, setImageUri] = useState("");
    const [ratio, setRatio] = useState(1);
    const navigation = useNavigation();
    const nhost = useNhostClient();

    const fetchImage = async () => {
        const result = await nhost.storage.getPresignedUrl({
            fileId: image,
        })
        if (result.presignedUrl?.url) {
            setImageUri(result.presignedUrl.url);
        }
    }
    useEffect(() => {
        fetchImage();
    }, [image])

    useEffect(() => {
        if (imageUri) {
            Image.getSize(imageUri, (width, hight) => setRatio(width / hight));
        }
    }, [imageUri]);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate("Pin", { id }) }}>
            <View style={styles.pin}>
                <View >
                    {/* <Image source={{ uri: imageUri }} style={[styles.image, { aspectRatio: ratio }]} /> */}
                    <RemoteImage fileId={image} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Pins

const styles = StyleSheet.create({
    pin: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        borderRadius: 25,
    },
    title: {
        margin: 10,
        fontWeight: 'bold',
        color: 'white',
        flexWrap: 'wrap',
        flex: 1,
    },
    heartBtn: {
        backgroundColor: '#d3cfd4',
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 5,
        borderRadius: 50,
    }
})
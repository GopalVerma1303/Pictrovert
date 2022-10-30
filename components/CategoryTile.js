import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import pins from '../assets/pins'
import { useNavigation } from '@react-navigation/native'
import CategorySpecificScreen from '../screens/CategorySpecificScreen'



const CategoryTile = (props) => {
    const navigator = useNavigation();
    const catImgURL = props.catImgURL;
    const catTitle = props.catTitle;
    return (
        <TouchableOpacity onPress={() => { navigator.navigate("CategorySpecificScreen", { catTitle }) }}>
            <View style={styles.container}>
                <Text style={styles.CategoryTileTitle}>{catTitle}</Text>
                <Image source={{ uri: catImgURL }} style={styles.CategoryTileBackImage} />
            </View>
        </TouchableOpacity>
    )
}

export default CategoryTile

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 80,
        padding: 5,
    },
    CategoryTileBackImage: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        opacity: 0.5,
        backgroundColor: 'black'
    },
    CategoryTileTitle: {
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        top: 30,
        fontWeight: '500',
        fontSize: 20
    }
})
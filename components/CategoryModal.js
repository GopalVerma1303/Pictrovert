import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OPTIONS = ['Clothes', 'Development', 'Electronics', 'Room Ideas', 'Cars', 'Motivational', 'Black', 'Old', 'Bikes', 'Digital Art'];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const CategoryModal = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.changeModalVisibility(false)}
            style={styles.container}
        >
            <View style={styles.modal}>

            </View>
        </TouchableOpacity>
    )
}

export default CategoryModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#1a1a1a',
    }
})
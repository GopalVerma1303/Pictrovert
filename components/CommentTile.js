import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const CommentTile = (props) => {
    return (
        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ justifyContent: 'center' }}>
                <Image source={{ uri: props.avatar == "https://s.gravatar.com/avatar/7a5149e0466e5b47f0380c0a1ba7875e?r=g&default=blank" ? "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" : props.avatar }} style={styles.avatar} />
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> {props.name} </Text>
                <Text style={{ color: 'white', marginHorizontal: 10 }}> {props.comment} </Text>
            </View>
        </View>
    )
}

export default CommentTile

const styles = StyleSheet.create({
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
})
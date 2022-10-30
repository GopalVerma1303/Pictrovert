import { StyleSheet, Text, View, KeyboardAwareScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const CommentTextInput = (props) => {
    return (
        <View style={{ flexDirection: 'row', paddingVertical: 20, marginHorizontal: 35, alignItems: 'center' }}>
            <Image source={{ uri: (props.avatar == "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank") ? "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank" : "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" }} style={{ height: 40, width: 40, borderRadius: 50 }} />
            <TextInput placeholder={`Comment as ${props.name}`} placeholderTextColor={'gray'} marginHorizontal={5} width={'70%'} color='white' style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', paddingHorizontal: 5, fontWeight: '500' }} />
            <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name='send' color='white' size={17} />
            </TouchableOpacity>
        </View>
    )
}

export default CommentTextInput

const styles = StyleSheet.create({});
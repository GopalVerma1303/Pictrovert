import { StyleSheet, Text, View, KeyboardAwareScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const CommentBox = () => {
    return (
        <View style={styles.commentBox} >
            <Text style={styles.title}> Comments</Text>
            <View style={{ flexDirection: 'row', paddingVertical: 20, marginHorizontal: 35, alignItems: 'center' }}>
                <Icon name='user' color='white' size={24} />
                <KeyboardAwareScrollView>
                    <TextInput placeholder="Add a comment" placeholderTextColor={'#b3b3b3'} marginHorizontal={5} width={'90%'} color='white' />
                </KeyboardAwareScrollView>
                <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='send' color='white' size={15} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro VERY GOOD! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 35, paddingVertical: 10 }}>
                <View style={{ justifyContent: 'center' }}>
                    <Icon name='circle' color='white' size={24} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: '900', fontSize: 15 }}> Gopal Verma </Text>
                    <Text style={{ color: 'white', marginHorizontal: 10 }}> Awesome Picture Bro! </Text>
                </View>
            </View>
        </View>
    )
}

export default CommentBox

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#303030",
        marginTop: 40,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: '80%',
        alignSelf: 'center'
    },
    commentBox: {
        backgroundColor: "#303030",
        marginTop: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        width: '100%',
        height: 800,
        alignSelf: 'center',
        marginBottom: 0
    },
    description: {
        backgroundColor: "#303030",
        marginTop: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: '80%',
        alignSelf: 'center',
    },
    descriptionText: {
        color: "white",
        textAlign: "center",
        fontSize: 17,

    },
    moreLikeThisBox: {
        backgroundColor: "#303030",
        marginTop: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: '100%',
    },
    afterRoot: {
        backgroundColor: "#303030",
        marginTop: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    image: {
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignSelf: 'center',
    },
    title: {
        margin: 10,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 35,
        color: 'white',
        padding: 10
    },
    backbtn: {
        zIndex: 100,
        position: 'absolute',
        top: 60,
        left: 20,
        height: 40,
        width: 40,
        backgroundColor: '#1a1a1a',
        padding: 5,
        borderRadius: 50,
    },
    morebtn: {
        position: 'absolute',
        top: 60,
        right: 20,
        height: 40,
        width: 40,
        backgroundColor: '#1a1a1a',
        padding: 5,
        borderRadius: 50,
    },
    btnVisit: {
        backgroundColor: '#b3b3b3',
        borderColor: 'white',
        borderRadius: 50,
        padding: 20,
        marginHorizontal: 2,
    },
    btnSave: {
        backgroundColor: 'red',
        borderRadius: 50,
        padding: 20,
        marginHorizontal: 2,
    }
})
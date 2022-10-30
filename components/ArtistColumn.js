import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ArtistColumn = (props) => {
    return (
        <View style={styles.description}>
            <Text style={styles.title}>Artist</Text>
            <View style={{ paddingHorizontal: 40, paddingBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: (props.artistAvatar == "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank") ? "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank" : "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" }} style={styles.artistAvatar} />
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
                    <Text style={styles.displayName}>{props.displayName}</Text>
                    <Text style={styles.email}>{props.email}</Text>
                    <Text style={styles.id}>ID : {props.id}</Text>
                </View>
            </View>
        </View>
    )
}

export default ArtistColumn

const styles = StyleSheet.create({
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
    displayName: {
        color: "white",
        textAlign: "center",
        fontSize: 17,
    },
    id: {
        color: "gray",
        textAlign: "center",
        fontSize: 10,
        fontWeight: '500',
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
    artistAvatar: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    email: {
        color: "gray",
        textAlign: "center",
        fontSize: 15,
        fontWeight: '500',
    }
})
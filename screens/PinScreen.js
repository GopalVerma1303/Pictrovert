import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator, FlatList, TouchableWithoutFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import pins from '../assets/pins'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link, useNavigation, useRoute } from '@react-navigation/native';
import Pins from '../components/Pins';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNhostClient, useUserId } from '@nhost/react';
import MasonryList from '../components/MasonryList';
import { useScrollToTop } from '@react-navigation/native';
import RemoteImage from '../components/RemoteImage';
import ArtistColumn from '../components/ArtistColumn';
import CommentTile from '../components/CommentTile';
import CommentTextInput from '../components/CommentTextInput';

const GET_PIN_QUERY = `
query MyQuery ($id: uuid!) {
    pins_by_pk(id: $id) {
      category
      created_at
      id
      image
      link
      title
      description
      user_id
    }
  }     
`;

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

const GET_COMMENTS_QUERY =
    `
query MyQuery($pin_id: uuid!) {
    comments(where: {pin_id: {_eq: $pin_id}}) {
      comment
      user {
        avatarUrl
        displayName
      }
    }
  }  
`

const POST_COMMENT_QUERY =
    `
    mutation MyMutation($comment: String, $user_id: uuid, $pin_id: uuid) {
        insert_comments(objects: {comment: $comment, user_id: $user_id, pin_id: $pin_id}) {
          returning {
            comment
            pin_id
            user {
              avatarUrl
              displayName
            }
          }
        }
      }      
`

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const PinScreen = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [artist, setArtist] = useState({});
    const [comments, setComments] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [saving, setSaving] = useState("");
    const userId = useUserId();

    const ref = useRef(null)
    useScrollToTop(ref);

    const [pin, setPin] = useState({});
    const Route = useRoute();
    const pinId = Route.params?.id;

    const fetchPin = async (pinId) => {
        const response = await nhost.graphql.request(GET_PIN_QUERY, { id: pinId });
        if (response.error) {
            Alert.alert("Error fetching the pin", response.error.message);
        } else {
            setPin(response.data.pins_by_pk);
        }
    };

    useEffect(() => {
        fetchPin(pinId);
    }, [pinId]);

    if (!pin) {
        return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Pin not found</Text></SafeAreaView>;
    }

    const nhost = useNhostClient();

    const listRef = useRef(null);


    const fetchArtistData = async () => {
        const result = await nhost.graphql.request(GET_USER_QUERY, { id: pin.user_id });
        if (result.error) {
            <ActivityIndicator />
        } else {
            setArtist(result.data.user);
        }
    };

    useEffect(() => {
        fetchArtistData();
    }, [pin]);

    const fetchUserData = async () => {
        const result = await nhost.graphql.request(GET_USER_QUERY, { id: userId });
        if (result.error) {
            <ActivityIndicator />
        } else {
            setUser(result.data.user);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [pin]);


    const fetchComments = async () => {
        const result = await nhost.graphql.request(GET_COMMENTS_QUERY, { pin_id: pinId })
        if (result.error) {
            Alert.alert("Error fetching comments", result.error[0].message);
        } else {
            setComments(result.data.comments);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [pin]);

    if (!user) {
        return <ActivityIndicator />;
    }

    const postComment = async () => {
        if (userComment == "") {
            Alert.alert("Comment can't be null.");
        } else {
            const result = await nhost.graphql.request(POST_COMMENT_QUERY, {
                comment: userComment,
                pin_id: pinId,
                user_id: userId
            })
            setUserComment("");
            console.log(result);
            fetchComments();
        }
    }

    return (
        <View style={{ backgroundColor: '#1a1a1a' }}>
            <ScrollView ref={listRef} height={'100%'}>
                <View style={styles.root}>
                    <RemoteImage fileId={pin.image} />
                    <Text style={styles.title}> {pin.title} </Text>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 15 }}>
                        <TouchableOpacity style={styles.btnVisit} onPress={() => { Linking.openURL(pin.link) }}>
                            <Text style={{ color: 'white', fontWeight: '800' }}> Visit </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSave} >
                            <Text style={{ color: 'white', fontWeight: '800' }}> Save </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.title}>Description</Text>
                    <View style={{ paddingHorizontal: 40, paddingBottom: 20 }}>
                        <Text style={styles.descriptionText}>{pin.description}</Text>
                    </View>
                </View>
                <ArtistColumn displayName={artist.displayName} id={artist.id} artistAvatar={artist.avatarUrl} email={artist.email} />
                <View style={styles.commentBox} >
                    <Text style={styles.title}> Comments</Text>
                    <View style={{ flexDirection: 'row', paddingVertical: 20, marginHorizontal: 35, alignItems: 'center', alignSelf: 'center' }}>
                        <Image source={{ uri: (user.avatarUrl == "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank") ? "https://s.gravatar.com/avatar/a7708ba62c3ebb67c1638d69a7d9fea2?r=g&default=blank" : "https://pfpmaker.com/_nuxt/img/profile-3-1.3e702c5.png" }} style={{ height: 40, width: 40, borderRadius: 50 }} />
                        <TextInput placeholder={`Comment as ${user.displayName}`} placeholderTextColor={'gray'} marginHorizontal={5} width={'90%'} color='white' style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray', paddingHorizontal: 5, fontWeight: '500', alignSelf: 'center' }} onChangeText={(e) => setUserComment(e)} value={userComment} />
                        <TouchableOpacity style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => postComment()}>
                            <Icon name='send' color='white' size={17} />
                        </TouchableOpacity>
                    </View>
                    {
                        comments.map(e => {
                            return (
                                <CommentTile avatar={e.user.avatarUrl} name={e.user.displayName} comment={e.comment} />
                            )
                        })
                    }
                </View>
            </ScrollView>
            <Pressable
                style={styles.backbtn} onPress={() => { navigation.goBack() }}>
                <Icon name='chevron-left' color='white' size={20} style={{ top: 5, left: 5 }} />
            </Pressable>
            <Pressable
                style={styles.morebtn} onPress={() => { navigation.goBack() }}>
                <Icon name='ellipsis-h' color='white' size={20} style={{ top: 5, left: 7 }} />
            </Pressable>
            <MasonryList pins={pins} />
        </View >

    )
}

export default PinScreen

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
        height: '100%',
        alignSelf: 'center',
        marginBottom: 180,
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
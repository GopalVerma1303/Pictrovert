import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoriesArray from '../assets/CategoriesArray';
import Checkbox from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';
import { useNhostClient } from '@nhost/react';
import { useNavigation } from '@react-navigation/native';
import CropRatioArray from '../assets/CropRatioArray';

const CREATE_PIN_MUTATION =
    `
mutation MyMutation ($category: String, $description:String, $image:String, $link:String, $title: String) {
    insert_pins(objects: {category: $category, description: $description, image: $image, link: $link, title: $title}) {
      returning {
        category
        created_at
        description
        id
        image
        link
        title
        user_id
      }
    }
  }   
`

export default function ImagePickerExample() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [discription, setDiscription] = useState("");
    const [link, setLink] = useState("");
    const [category, setCategory] = useState("");
    const [checked, setChecked] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [cropRatio, setCropRatio] = useState("");
    const [cropRatioCheck, setCropRatioCheck] = useState("");
    const [cropRatioX, setCropRatioX] = useState(1);
    const [cropRatioY, setCropRatioY] = useState(1);

    const nhost = useNhostClient();
    const Navigation = useNavigation();

    const radioCheck = (categoryValue) => {
        setChecked(categoryValue);
        setCategory(categoryValue);
    }

    const cropRatioRadioCheck = (cropRatio) => {
        setCropRatioCheck(cropRatio.tag);
        setCropRatio(cropRatio);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [cropRatio.x, cropRatio.y],
            quality: 0.5,
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUri(result.uri);
            setImage(result.uri);
        }
    };

    const afterSubmit = () => {
        setImage(null);
        setTitle("");
        setDiscription("");
        setLink("");
        setCategory("");
        setImageUri("");
        setChecked("");
    }

    const onsubmit = async () => {
        const uploadResult = await uploadFile();
        if (uploadResult.error) {
            Alert.alert("Error uploading the imag", uploadResult.error.message);
            return;
        }
        const result = await nhost.graphql.request(CREATE_PIN_MUTATION, {
            title: title,
            link: link,
            category: category,
            description: discription,
            image: uploadResult.fileMetadata.id,
        })
        afterSubmit();
        if (result.error) {
            Alert.alert("Error creating the post", result.error.message)
        } else {
            Navigation.goBack();
        }
    }

    const onCancel = () => {
        setImage(null);
    }

    const uploadFile = async () => {
        if (!imageUri) {
            return {
                error: {
                    message: "No image selected",
                },
            };
        }

        const parts = imageUri.split("/");
        const name = parts[parts.length - 1];
        const nameParts = name.split(".");
        const extension = nameParts[nameParts.length - 1];

        const uri =
            Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri;

        const result = await nhost.storage.upload({
            file: {
                name: name,
                type: `image/${extension}`,
                uri: uri,
            },
        });
        if (result.error) {
            Alert.alert(result.error.message);
        } else {
            console.log(result);
        }
        return result;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 40, marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={onCancel}>
                        <View style={styles.cancelBtn}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onsubmit}>
                        <View style={styles.nextBtn}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Post</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '80%', backgroundColor: '#303030', borderRadius: 50, paddingVertical: 30, alignSelf: 'center', marginTop: 70 }}>
                    <Text style={{ color: '#a1a1a1', alignSelf: 'center', padding: 20, fontSize: 20, fontWeight: '600' }}>Select Crop Ratio</Text>
                    {
                        CropRatioArray.map((e) => {
                            return (
                                <View style={styles.section}>
                                    <RadioButton
                                        uncheckedColor="#a1a1a1"
                                        color="red"
                                        value={e.tag}
                                        status={cropRatioCheck === e.tag ? 'checked' : 'unchecked'}
                                        onPress={() => cropRatioRadioCheck(e)}
                                    />
                                    <Text style={styles.paragraph}>{e.tag}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {cropRatio && (
                    <TouchableOpacity style={[styles.imgContainer, { width: cropRatio.containerWidth, height: cropRatio.containerHeight }]} onPress={pickImage} activeOpacity={0.8} >
                        <Icon name='plus' color='grey' size={50} style={{ position: 'absolute', zIndex: 100 }} />
                        {image && (
                            <>
                                <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                            </>
                        )}
                    </TouchableOpacity>
                )}
                <KeyboardAvoidingView style={{ marginBottom: 100 }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ height: 50, width: '80%', backgroundColor: '#303030', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                            <TextInput value={title} onChangeText={(text) => setTitle(text)} backgroundColor={'#303030'} width='80%' placeholder="Enter Title of your post here..." placeholderTextColor="#a1a1a1" color='white' />
                        </View>
                        <View style={{ height: 50, width: '80%', backgroundColor: '#303030', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                            <TextInput value={discription} onChangeText={(text) => setDiscription(text)} backgroundColor={'#303030'} width='80%' placeholder="Enter Description of your post here..." placeholderTextColor="#a1a1a1" color='white' />
                        </View>
                        <View style={{ height: 50, width: '80%', backgroundColor: '#303030', alignItems: 'center', justifyContent: 'center', borderRadius: 50, flexDirection: 'row', marginVertical: 10 }}>
                            <TextInput value={link} onChangeText={(text) => setLink(text)} backgroundColor={'#303030'} width='80%' placeholder="Enter Link to your post here..." placeholderTextColor="#a1a1a1" color='white' />
                        </View>
                        <View style={{ width: '80%', backgroundColor: '#303030', alignItems: 'flex-start', justifyContent: 'flex-start', borderRadius: 50, marginVertical: 10, flexDirection: 'column', paddingVertical: 30 }}>
                            <Text style={{ color: '#a1a1a1', alignSelf: 'center', padding: 20, fontSize: 20, fontWeight: '600' }}>Select Category for your post</Text>
                            {
                                CategoriesArray.map((e) => {
                                    return (
                                        <View style={styles.section}>
                                            <RadioButton
                                                uncheckedColor="#a1a1a1"
                                                color="red"
                                                value={e.name}
                                                status={checked === e.name ? 'checked' : 'unchecked'}
                                                onPress={() => radioCheck(e.name)}
                                            />
                                            <Text style={styles.paragraph}>{e.name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1a1a1a',
        height: '100%',
    },
    image: {
        height: 300,
        width: 300,
    },
    uploadBtn: {
        backgroundColor: '#404040',
        padding: 10,
        borderRadius: 50
    },
    nextBtn: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 50,
        width: 70,
        alignItems: 'center'
    },
    cancelBtn: {
        backgroundColor: '#b3b3b3',
        padding: 15,
        borderRadius: 50,
        width: 80,
        alignItems: 'center'
    },
    imgContainer: {
        backgroundColor: "#303030",
        marginTop: 17,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: 300,
        height: 300,
        alignSelf: 'center',
        borderWidth: 5,
        borderColor: '#303030',
        borderStyle: 'dotted',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 45,
        marginVertical: 5
    },
    cropSection: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 45,
        marginVertical: 5
    },
    paragraph: {
        fontSize: 15,
        color: '#a1a1a1'
    },
    checkbox: {
        margin: 8,
    },
})
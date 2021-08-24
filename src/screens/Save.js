import React, { useState } from 'react';
import { View,Text,StyleSheet, Image, TextInput, Button, ScrollView } from 'react-native';
import firebase from 'firebase'
require('firebase/firestore');
require('firebase/firebase-storage')

const Save = (props) => {
    const [caption,setCaption] = useState()

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData =async(downloadURL) => {

        await firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            })
                
        await props.navigation.navigate('home')
    }

    //console.log(props.route.params)
    return (
        <ScrollView>
            <Image source={{uri:props.route.params.image}} style={{height:400,width:400}} />
            <TextInput 
                placeholder="Add Caption To Image"
                onChangeText={text=>setCaption(text)}
                multiline
            />
            <Button title="save" onPress={uploadImage} />
        </ScrollView>
    );
}

export default Save;
import React, { useState } from 'react';
import firebase from 'firebase';
import {View,Text,StyleSheet, TextInput, Button} from 'react-native'

const Signup = (props) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSignup = async() => (
       await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async(res)=>{
            const id = firebase.auth().currentUser.uid
            await firebase.firestore().collection("users").doc(id).set({name,email})
            console.log(res)
            //props.navigation.navigate('signin')
        })
        .catch(err=>{
            console.log(err)
        })
    );
    return (
        <View>
            <TextInput 
                placeholder="Enter your name"
                onChangeText={setName}
                autoCapitalize='none'
            />
            <TextInput 
                placeholder="Enter your Email"
                onChangeText={setEmail}
                autoCapitalize='none'
            />
            <TextInput 
                placeholder="Enter your password"
                onChangeText={setPassword}
                autoCapitalize='none'
            />
            <Button title="sign up" onPress={onSignup}/>
        </View>
    );
}

const styles = StyleSheet.create({});

export default Signup;
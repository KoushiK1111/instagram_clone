import React, { useState } from 'react';
import firebase from 'firebase';
import {View,Text,StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'

const Signin = (props) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const onSignin = () => (
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res=>{
            console.log(res)
            console.warn('logged')
        })
        .catch(err=>{
            console.log(err)
        })
    );
    return (
        <View>
            <TextInput 
                placeholder="Enter your email"
                onChangeText={setEmail}
                autoCapitalize='none'
            />
            <TextInput 
                placeholder="Enter your Password"
                onChangeText={setPassword}
                autoCapitalize='none'
            />
            <Button title="sign in" onPress={onSignin}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate('signup')}>
                <Text>click Here to Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});

export default Signin;
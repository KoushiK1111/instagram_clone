import React, { useEffect, useState } from 'react';
import { View, Text, styleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

require('firebase/firestore')

const search = (props) => {
    const [users, setUsers] = useState([])

    const fetchUsers = (txt) => {
        firebase.firestore().collection('users')
            .where('name', '>=', txt)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setUsers(users)
            })
    }
    //console.log(users)
    return (
        <View>
            <TextInput placeholder="Type user Name" autoCapitalize="none" onChangeText={fetchUsers} />
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>props.navigation.navigate('profile',{uid:item.id})}>
                        <Text style={{fontSize:24}}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default search;
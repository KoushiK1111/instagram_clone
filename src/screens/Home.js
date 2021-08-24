import React, { useEffect,useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import {connect} from 'react-redux';
import { FetchUser, FetchUserPost,fetchUserFollowing } from '../redux/Actions';
import firebase from 'firebase'
require('firebase/firestore')

const Home = (props) => {
    const [posts, setPosts] = useState([]);

    const signOut = ()=>{
        firebase.auth().signOut()
        .then(() => {
            console.log('signout succeful')
          })
          .catch((error) => {
            console.log(error)
          });
    }
    console.log(props.user,props.following,props.feed,)

    useEffect(()=>{
        props.fetchtUser();
        props.FetchUserPost();
        props.fetchUserFollowing();
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed);
        }
        console.log(posts)
    },[props.usersFollowingLoaded, props.feed])


    // console.log(props.user)
    if(props.user===null){
        return(
            <View></View>
        )
    }else{
        return (
            <View>
                <Text>{props.user.email}</Text>
                <Text>{props.user.name}</Text>
                <Button title="sign out" onPress={signOut} />
                <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            {/* { item.currentUserLike ?
                                (
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)} />
                                )
                                :
                                (
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)} />
                                )
                            }
                            <Text
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                </Text> */}
                        </View>

                    )}

                />
            </View>
        </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = state =>{
    return {
        user : state.Reducer.currentuser,
        following:state.Reducer.following,
        feed: state.users.feed,
        usersFollowingLoaded: state.users.usersFollowingLoaded,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchtUser:()=>dispatch(FetchUser()),
        FetchUserPost:()=>dispatch(FetchUserPost()),
        fetchUserFollowing:()=>dispatch(fetchUserFollowing())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);



    // const onLikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .set({})
    // }
    // const onDislikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .delete()
    // }
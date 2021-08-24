import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, FlatList, Image,Button } from 'react-native';
import { connect } from 'react-redux'

const Profile = (props) => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, userPosts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(userPosts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    if (user === null) {
        return <View />
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.containerInfo}>
                    <Text>{user.name}</Text>
                    <Text>{user.email}</Text>
                    {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                        <View>
                            {following ? (
                                <Button
                                    title="Following"
                                    color="grey"
                                    onPress={() => onUnfollow()}
                                />
                            ) :
                                (
                                    <Button
                                        title="Follow"
                                        onPress={() => onFollow()}
                                    />
                                )}
                        </View>
                    ) :
                        <Button
                            title="Logout"
                            onPress={() => onLogout()}
                        />}
                </View>

                <View style={styles.containerGallery}>
                    <FlatList
                        numColumns={3}
                        horizontal={false}
                        data={userPosts}
                        renderItem={({ item }) => (
                            <View
                                style={styles.containerImage}>

                                <Image
                                    style={styles.image}
                                    source={{ uri: item.downloadURL }}
                                />
                            </View>

                        )}

                    />
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
        //flex: 1
    },
    containerImage: {
        flex: 1 / 3

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = state => {
    return {
        currentUser: state.Reducer.currentuser,
        userPosts: state.Reducer.posts,
        following: state.Reducer.following,
    }
}

export default connect(mapStateToProps, null)(Profile);
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Posteos from '../components/Posteos';


class Home extends Component {
    constructor() {
        super()
        this.state = {
            post: [],
            loaded: false


        }
    }

    componentDidMount() {
        db.collection("posteos").onSnapshot((docs) => {
            let posteos = []
            docs.forEach(doc => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            this.setState({
                post: posteos,
                loaded: true
            })
        })
    }

    render() {
        console.log(this.state.post)
        return (
            <>
                {this.state.cargado == false ? <ActivityIndicator size="large" color="black" /> :
                    <View style={styles.container}>

                        <Text style={styles.title}> Home</Text>
                        <Text> Estos son los posteos:</Text>
                        <FlatList data={this.state.post}
                            keyExtractor={(data) => data.id}
                            renderItem={({ item }) => <Posteos data={item}{...this.props} />}
                        >

                        </FlatList>

                    </View>
                } </>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(007,134,255)',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        spaceAround: 4,
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
        alignItems: 'center',


    },
})




export default Home;
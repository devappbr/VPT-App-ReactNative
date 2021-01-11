import React, { Component } from 'react'
import axios from 'axios'
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class AuthOrApp extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@dataUser')
        const dataUser = JSON.parse(json) || {}

        if (dataUser.token) {
            axios.defaults.headers.common['Authorization']
                = `bearer ${dataUser.token}`
            this.props.navigation.navigate('MainStack', dataUser)
        } else {
            this.props.navigation.navigate('Signin')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

export default AuthOrApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})
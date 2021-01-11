import React, { Component } from 'react';
import { FlatList, Alert, StyleSheet, View, Text } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation'

import { baseLocal } from '../../services/apiRest/conn'
import { getCategories } from '../../services/apiRest/categories'
import ItemHorizontal from '../../ui/itemHorizontal';
import { metrics, fonts, size, colors } from '../../themes'


class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            user: {}
        }
    }

    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@dataUser')
        const dataUser = JSON.parse(json) || {}
        if (dataUser.token) {
            axios.defaults.headers.common['Authorization']
                = `bearer ${dataUser.token}`
            this.setState({ user: dataUser })
        } else {
            this.props.navigation.navigate('Login')
        }
        this._getData()
    }

    _getData = async () => {
        const authPassed = { headers: { "Authorization": `Bearer ${this.state.user.token}` } }
        try {
            axios.all([
                await axios.get(`${baseLocal}${getCategories}`, authPassed),
            ]).then(axios.spread((categoriesRes, otherRes) => {
                this.setState({ categories: categoriesRes.data });
                console.log(categoriesRes.data)
            }))
        } catch (err) {
            Alert.alert('Erro ao buscar categorias', err.response.data.error);
        }
    }
    _handlerStoresCategory = async (id) => {
        // this.props.navigation.navigate('StoresPerCategories', id)
        this.props.navigation.navigate('ProductsPerCategories', id)
        
    }

    _keyExtractor(item, index) {
        return index.toString();
    }

    _renderItem({ item, index }) {
        return (
            <ItemHorizontal
                icon={item.icon}
                name={item.name}
                id={item.id}
                // onPress={() => this.props.navigation.navigate('StoresPerCategories', {id:item.id})}
                onPress={() => this._handlerStoresCategory({id:item.id})}
                
            />
        )
    }

    render() {
        const { categories } = this.state
        return (
            <View>
               
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    horizontal={true}
                    label={'Tipos de produtos'}
                />
            </View>
        )
    }
}

export default withNavigation(Categories)

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.default,
        color: colors.gray,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10

    }
})
import React, { Component } from 'react';
import { FlatList, Alert, StyleSheet, View, Text } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation'

import { baseLocal } from '../../services/apiRest/conn'
import { metrics, fonts, size, colors } from '../../themes'
import { getProductsPerCategories, getProducts } from '../../services/apiRest/products';
import ItemVertical2Column from '../../ui/itemVertical2Column';

class ProductsPerCategories extends Component {
    constructor(props) {
        super(props)

        const { navigation } = this.props;
        const id = navigation.getParam('id');

        this.state = {
            stores: [],
            user: {},
            id: id
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
            this.props.navigation.navigate('AuthOrApp')
        }
        this._getData()
    }

    _getData = async () => {
        const authPassed = { headers: { "Authorization": `Bearer ${this.state.user.token}` } }
        try {
            // const res = await axios.get(`${baseLocal}${getStores}`, authPassed);
            axios.all([
                await axios.get(`${baseLocal}${getProducts}${getProductsPerCategories}${this.state.id}`, authPassed),
            ]).then(axios.spread((storeRes, otherRes) => {
                this.setState({ stores: storeRes.data });
                console.log(storeRes.data)
            }))
        } catch (err) {
            Alert.alert('Erro ao buscar estabelecimentos', err.response.data.error);
        }
    }

    _handlerMenu = async (id) => {

        this.props.navigation.navigate('ProductsMenu', id)
    }


    _keyExtractor(item, index) {
        return index.toString();
    }

    _renderItem({ item, index }) {

        const currency = 'R$ ' + item.price.toFixed(2)
        return (
            <ItemVertical2Column
                icon={item.logo}
                name={item.name}
                description={item.description}
                price={currency}
                onPress={() => this._handlerMenu({ id: item.idStores })}
                // segment={item.segmentName}
                categories={item.categoriesName}
            />
        )
    }

    render() {
        const { stores } = this.state
        return (
            <View style={styles.container}>
                {this.props.label ?
                    <Text style={styles.title}>{this.props.label}</Text>
                    : null}
                <FlatList
                    data={stores}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    // horizontal={true}
                    numColumns={2}
                />
            </View>
        )
    }
}

export default withNavigation(ProductsPerCategories)

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.default,
        color: colors.gray,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10
    },
    container: {
        flex: 1,

        // marginTop:10
    }
})
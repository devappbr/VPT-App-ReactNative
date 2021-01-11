import React, { Component } from 'react';
import { FlatList, Alert, StyleSheet, View, Text } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation'

import { baseLocal } from '../../services/apiRest/conn'
import { getStores } from '../../services/apiRest/stores'
import ItemVertical from '../../ui/itemVertical';
import { metrics, fonts, size, colors } from '../../themes'

class Stores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stores: {},
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
            // const res = await axios.get(`${baseLocal}${getStores}`, authPassed);
            axios.all([
                await axios.get(`${baseLocal}${getStores}`, authPassed),
            ]).then(axios.spread((storesRes, categoriesRes) => {
                this.setState({ stores: storesRes.data });
                console.log(storesRes.data)
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
        return (
            <ItemVertical
                icon={item.logo}
                name={item.name}
                onPress={() => this._handlerMenu({ id: item.id })}
                // segment={item.segmentName}
                categories={item.categoriesName}
            />
        )
    }

    render() {
        const { stores } = this.state
        return (
            <View>
                <Text style={styles.title}>{this.props.label}</Text>
                <FlatList
                    data={stores}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={this._keyExtractor.bind(this)}
                    renderItem={this._renderItem.bind(this)}
                    horizontal={false}
                    ListHeaderComponent={this.props.ListHeader}
                    ListFooterComponent={this.props.ListFooter}
                />
            </View>
        )
    }
}

export default withNavigation(Stores)

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
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Alert, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import { baseLocal } from '../services/apiRest/conn'
import { getStores, } from '../services/apiRest/stores'
import ItemVerticalMenu from '../ui/itemVerticalMenu';
import { getProducts } from '../services/apiRest/products';


import { colors, fonts, size } from '../themes';

class Footer extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        this.state = {
            visible:false
        }

    }

    _handlerMenu = async (id) => {
        this.props.navigation.navigate(id)
    }

    render() {

        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ marginRight: 10 }}>
                            <Icon name={'md-cart'} size={15} color={colors.white} />
                        </View>
                        <View>
                            <Text style={[styles.description]}>{this.props.qty} produto(s) na cesta</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(Footer)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: height * 0.06,
        // height: isIphoneX() ? 80 : 60,
        width: width * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.primary,
        borderWidth: 0.1,
        borderColor: colors.placeholder,
        // backgroundColor: colors.background,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // shadowOffset: { width: 5, height: 3 },
        // shadowColor: '#000000',
        // shadowOpacity: 0.1,
        // elevation: 10,
    },
    description: {
        fontFamily: fonts.medium,
        fontSize: size.smaller,
        color: colors.white,
        textAlign: 'left',
    },
    order: {
        fontFamily: fonts.semiBold,
        fontSize: size.smaller,
        color: colors.white,
        textAlign: 'left',
    },

});

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { metrics, fonts, size, colors } from '../themes'

class ItemOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qty: 0,
            lists: [{ id: null, qty: 0 }]
        }
    }

    _increment() {
        this.setState(prevState => ({ qty: prevState.qty + 1 }));
    }

    _decrement() {
        this.setState(prevState => ({ qty: prevState.qty - 1 }));
    }

    
    render() {
       
        return (
            <View >
                <View style={styles.itemProduct} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, }}>
                        <View style={{ flex: 2, marginHorizontal: 0, marginVertical:5, alignItems: 'center' }}>
                            <View>
                                <Text style={styles.descriptionProduct} numberOfLines={1}>{this.props.qty}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 8, marginHorizontal: 0, marginVertical:5, alignItems: 'flex-start' }}>

                            <View>
                                <Text style={styles.descriptionProduct} >{this.props.name}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, marginHorizontal: 0, marginVertical:5, alignItems: 'flex-end' }}>

                            <View>
                                <Text style={styles.descriptionProduct} numberOfLines={1}>{this.props.price.toFixed(2).replace('.',',')}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, marginHorizontal: 0, marginVertical:5, alignItems: 'flex-end' }}>

                            <View>
                                <Text style={styles.descriptionProduct} numberOfLines={1}>{this.props.multiplicator.toFixed(2).replace('.',',')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ItemOrders

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

    itemProduct: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center',
        // borderBottomWidth:1,
        borderColor:colors.border,
        marginVertical: 5,
        paddingHorizontal:10,

    },
    nameProduct: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'left',
        

    },
    descriptionProduct: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'left',
        marginBottom: 0,
    },
    priceProduct: {
        fontFamily: fonts.medium,
        fontSize: size.regular,
        color: colors.primary,
        textAlign: 'left',
        marginVertical: 10,
        paddingVertical: 5,

        borderRadius: 3
    },
    addProduct: {
        backgroundColor: colors.background,
        paddingVertical: 10,
        marginRight: 15,
        paddingHorizontal: 10,
        borderRadius: 3,

    },
    txtAddProduct: {
        fontFamily: fonts.bold,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'center',
    },

    delProduct: {
        fontFamily: fonts.medium,
        fontSize: size.smaller,
        color: colors.white,
        textAlign: 'left',
        backgroundColor: colors.primary,
        paddingVertical: 10,
        marginRight: 15,
        paddingHorizontal: 10,
        borderRadius: 3
    },

    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.gray,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10

    },
    qty: {
        width: '100%',
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 10,
        textAlign: 'center',
        elevation: 5,
    }
})

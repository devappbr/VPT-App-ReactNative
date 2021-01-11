import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { metrics, fonts, size, colors } from '../themes'

class ItemVerticalMenu extends Component {
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

    AddList(id) {
        this.setState({ lists: [{ id: id, qty: this.state.qty }] })
    }

    render() {
        return (
            <View >
                <View style={styles.container}>

                    <View style={styles.itemProduct} >
                        <Text style={styles.nameProduct} numberOfLines={2}>{this.props.name}</Text>
                        <Text style={styles.descriptionProduct} numberOfLines={3}>{this.props.description}</Text>

                        <View style={{ justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 10, flex: 1, borderWidth: 1, borderColor: colors.background, borderRadius: 50, height: 32, paddingHorizontal: 15 }}>
                            <Text style={styles.priceProduct}>{this.props.price} | </Text>
                            <TouchableOpacity onPress={this.props.showModal}>
                                <View >
                                    <Text style={[styles.priceProduct]}>Adicionar</Text>
                                </View>
                                {/* </TouchableOpacity>
                            <View >
                                <TextInput
                                    editable={true}
                                    maxLength={2}
                                    keyboardType='number-pad'
                                    selectTextOnFocus
                                    onChangeText={this.props.onChangeText}
                                    style={styles.qty}>

                                </TextInput>
                            </View>
                            <TouchableOpacity onPress={this.props.onPressIncr}>
                                <View>
                                    <Icon name='md-add' color={colors.primary} size={25} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View >
                                    <Icon name='md-add' color={colors.primary} size={25} />
                                </View> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.itemImage}>
                        <Image resizeMode='cover'
                            style={styles.image}
                            source={{ uri: this.props.icon }}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default ItemVerticalMenu

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        width: width * 1,
        // height: 90,
        // backgroundColor:colors.primary,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        // marginHorizontal: 10,
        borderRadius: 8,
        flex: 1,
        // elevation: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
        shadowOffset: { height: 1 },
        borderBottomWidth: 0.5,
        borderColor: colors.border,

    },
    itemImage: {
        // backgroundColor:'red',
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        alignSelf: 'flex-start'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemProduct: {
        flex: 5,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    nameProduct: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.gray,
        textAlign: 'left',
    },
    descriptionProduct: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.secondary,
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

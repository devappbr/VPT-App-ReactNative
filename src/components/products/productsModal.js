import React, { Component } from 'react';

import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import { colors, size, fonts } from '../../themes';

// import { Container } from './styles';

class ProductsModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { price, name, description, id } = this.props

        return (

            <View >
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.itemImage}>
                            <Text style={styles.nameProduct} numberOfLines={2}>{name}</Text>

                            <View>
                                <Text style={styles.descriptionProduct} >{description}</Text>
                            </View>
                            <View>
                                <Text style={styles.priceProduct}>R$ {price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', alignContent: 'center' }}>
                                <TouchableOpacity onPress={this.props.onPressDecr}>
                                    <View>
                                        <Icon name='md-remove' color={colors.primary} size={25} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginHorizontal: 20 }} >
                                    <TextInput
                                        editable={true}
                                        // pattern={[
                                        //     '^.{1,}$', // min 8 chars
                                        //     '(?=.*\\d)', // number required
                                        //     '(?=.*[A-Z])', // uppercase letter
                                        //   ]}
                                        maxLength={2}
                                        keyboardType='number-pad'
                                        selectTextOnFocus
                                        onChangeText={this.props.qty}
                                        style={styles.qty}
                                        value={this.props.value}
                                    >
                                    </TextInput>
                                </View>
                                <TouchableOpacity onPress={this.props.onPressIncr}>
                                    <View >
                                        <Icon name='md-add' color={colors.primary} size={25} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                alignSelf: 'center',
                                marginVertical: 15,
                                borderColor: colors.border,
                                borderTopWidth: 1,
                                paddingTop: 12
                            }}>
                                <Text style={styles.textObs}>Alguma observação?</Text>
                                <TextInput style={styles.obs}
                                    placeholder={"Ex: Tirar cebola, ponto da carne etc"}
                                />
                            </View>
                            <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', flex: 1, width: '100%' }}>
                                <TouchableOpacity onPress={this.props.cancel}>
                                    <View style={{ alignSelf: 'center', marginVertical: 30, backgroundColor: colors.primary, paddingHorizontal: 10, borderRadius: 5 }}>
                                        <Text style={styles.textAdd}>Cancelar</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.ok}>
                                    <View style={{ alignSelf: 'center', marginVertical: 30, backgroundColor: colors.white, borderColor: colors.primary, borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 }}>
                                        <Text style={[styles.textAdd, {color: colors.primary}]}>Adicionar</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default withNavigation(ProductsModal)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

    textContent: {
        fontSize: size.regular,
        color: colors.primary,
        fontFamily: fonts.semiBold,
        alignSelf: 'center'
    },
    textTitle: {
        fontSize: size.regular,
        color: colors.white,
        fontFamily: fonts.semiBold,
        alignSelf: 'center',
        justifyContent: 'center',

    },
    titleBar: {
        width: '100%',
        height: 45,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent: 'center'

    },
    container: {
        width: width * 0.8,
        // height: height * 0.6,
        // backgroundColor:colors.primary,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        // marginHorizontal: 10,
        borderRadius: 8,
        // flex: 1,
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
        width: 65,
        height: 65,
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
        fontSize: size.default,
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

    textAdd: {
        fontFamily: fonts.medium,
        fontSize: size.regular,
        color: colors.white,
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
        marginVertical: 15,

    },
    obs: {
        width: '100%',
        height: 40,
        backgroundColor: colors.white,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'left',
        elevation: 5,
    },
    textObs: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'left',

        marginVertical: 10
    }
})

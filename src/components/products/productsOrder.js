import React, { Component } from 'react';

import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ScrollView, TextInput, FlatList, SectionList } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import { colors, size, fonts } from '../../themes';
import ItemVerticalMenu from '../../ui/itemVerticalMenu'

// import { Container } from './styles';

class ProductsOrder extends Component {
    constructor(props) {
        super(props)
    }

    FlatListHeader = () => {
        return (
            <View>
                <View style={styles.titleBar}>
                    <Text style={styles.textTitle}>Confira o seu pedido</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, paddingHorizontal: 10, marginTop: 15, }}>
                    <View style={{ flex: 2, marginHorizontal: 0, alignItems: 'center' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.nameProduct, { fontSize: size.small, fontFamily: fonts.semiBold, color: colors.primary }]}>Qtd</Text>
                        </View>
                    </View>
                    <View style={{ flex: 8, marginHorizontal: 0, alignItems: 'flex-start' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.nameProduct, { fontSize: size.small, fontFamily: fonts.semiBold, color: colors.primary }]}>Produto</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, marginHorizontal: 0, alignItems: 'flex-end' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.nameProduct, { fontSize: size.small, fontFamily: fonts.semiBold, color: colors.primary }]}>Valor</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, marginHorizontal: 0, alignItems: 'flex-end' }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.nameProduct, { fontSize: size.small, fontFamily: fonts.semiBold, color: colors.primary }]}>Total</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    FlatListFooter = () => {


        return (
            <View>
                <View style={{ flex: 3, marginHorizontal: 0, marginTop: 30, alignItems: 'flex-end', borderBottomWidth: 1, borderTopWidth: 1, borderColor: colors.border, paddingTop: 10, paddingBottom: 10, marginHorizontal: 10 }}>
                    <View>
                        <Text style={[styles.priceProduct, {}]} numberOfLines={1}>Subtotal</Text>
                        <Text style={[styles.priceProduct, { color: colors.gray }]} numberOfLines={1}>R$ {this.props.valueOrder.toFixed(2).replace('.', ',')}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', width: '100%', marginTop: 30 }}>
                    <TouchableOpacity onPress={this.props.cancel}>
                        <View style={{ backgroundColor: colors.primary, width: 70, height: 30, borderRadius: 4, paddingVertical: 3, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.textAdd}>Retornar</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.props.ok}>
                        <View style={{ backgroundColor: colors.white, width: 70, height: 30, borderRadius: 4, paddingVertical: 3, borderColor: colors.primary, borderWidth: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.textAdd, { color: colors.primary }]}>Enviar</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }

    render() {
        const { price, name, description, id } = this.props

        return (

            <View >
                <View style={styles.container}>
                    <FlatList
                        data={this.props.data}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={this.props.keyExtractor}
                        renderItem={this.props.renderItem}
                        horizontal={false}
                        ListHeaderComponent={this.FlatListHeader}
                        ListFooterComponent={this.FlatListFooter}
                    />
                    {/* <SectionList
                        sections={this.props.data}
                        keyExtractor={this.props.keyExtractor}
                        renderItem={this.props.renderItem}
                        renderSectionHeader={({ section: { name } }) => (
                            <Text style={styles.header}>{name}</Text>
                        )}
                    /> */}
                </View>
            </View>
        )
    }
}

export default withNavigation(ProductsOrder)

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
        textAlign: 'left'

    },
    titleBar: {
        width: '100%',
        height: 35,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,

    },
    container: {

        minWidth: width * 0.6,
        maxWidth: width * 0.9,
        maxHeight: height * 0.8,
        // backgroundColor:colors.primary,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        // alignItems: 'center',
        // paddingHorizontal: 15,
        // paddingVertical: 15,
        paddingBottom: 25,
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
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'center'

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
        textAlign: 'right',
    },

    textAdd: {
        fontFamily: fonts.medium,
        fontSize: size.regular,
        color: colors.white,
        textAlign: 'center',
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

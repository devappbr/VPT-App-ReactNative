import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'

class ItemVertical2Column extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.itemProduct}>
                        <View style={styles.itemImage}>
                            <Image resizeMode='cover'
                                style={styles.image}
                                source={{ uri: this.props.icon }}
                            />
                            <Text style={styles.nameProduct} numberOfLines={2}>{this.props.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.descriptionProduct} numberOfLines={2}>{this.props.description}</Text>
                            <Text style={styles.priceProduct}>{this.props.price}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ItemVertical2Column

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // borderBottomWidth: 0.5,
        // borderColor: colors.border,
        // backgroundColor:'red',
        
        // flex:1,
        width: width*0.5
        // alignItems: 'center',




    },
    itemProduct: {
        // backgroundColor:'gray',
        // alignContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 10,
        height: height * 0.347,
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 5, 
        marginHorizontal: 5,
        flexBasis: 0,

    },

    itemImage: {
        // justifyContent: 'space-between',
        // alignContent: 'center',
        flexBasis: 0,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom:20,
        alignSelf: 'center',
    },

    nameProduct: {
        fontFamily: fonts.semiBold,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'center',
    },
    descriptionProduct: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.secondary,
        textAlign: 'center',
        marginBottom: 30,
    },
    priceProduct: {
        fontFamily: fonts.medium,
        fontSize: size.regular,
        color: colors.white,
        textAlign: 'center',
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 3
    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.gray,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10

    }
})

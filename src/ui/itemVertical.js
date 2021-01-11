import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'

class ItemVertical extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.container}>
                        <View style={styles.itemImage}>
                            <Image resizeMode='cover'
                                style={styles.image}
                                source={{ uri: this.props.icon }}
                            />
                        </View>
                        <View style={styles.itemStore}>
                            <Text style={styles.nameStore}>{this.props.name}</Text>
                            <Text style={styles.distanceStore}>{this.props.distance}</Text>
                            <Text style={styles.categorieStore}>{this.props.categories}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default ItemVertical

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        // height: 90,
        // backgroundColor:colors.primary,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        // marginHorizontal: 10,
        borderRadius: 8,
        flex: 1,
        // elevation: 0.5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 0.1,
        shadowOffset: { height: 1 },
        borderBottomWidth: 0.5,
        borderColor: colors.border
    },
    itemImage: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 10,
    },
    itemStore: {
        flex: 5,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    nameStore: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.gray,
        textAlign: 'left',
    },
    distanceStore: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.secondary,
        textAlign: 'left',
    },
    categorieStore: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.primary,
        textAlign: 'left',
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

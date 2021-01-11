import React, { Component } from 'react';
import { Text, View, Dimensions, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'

class ItemHorizontal extends Component {

    render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={styles.itemImage}>
                        <Image resizeMode='cover'
                            style={styles.image}
                            source={{ uri: this.props.icon }}
                        />
                    </View>
                    <View style={[styles.itemDescription], { marginTop: 5 }}>
                        <Text style={styles.description}>{this.props.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(ItemHorizontal)

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        // backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 0,
        // marginBottom: 20,
        // borderRadius: 10,
        height: 100,

    },
    itemImage: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 60,
        aspectRatio: 1,
        borderRadius: 10,
    },
    itemDescription: {
        flex: 2,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontFamily: fonts.medium,
        fontSize: size.small,
        color: colors.gray,
        textAlign: 'center',
    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.secondary,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10

    }
})
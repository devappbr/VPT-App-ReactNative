import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'

const sizeWidth = {
    LG: 0.9,
    MD: 0.6,
    SM: 0.3
}

const Logo = ({ label, color, fontSize, fontFamily, onPress, disabled = false, size = sizeWidth.SM }) => {
    return (
        <View>
            <Image style={[styles.imageContainer, { width: metrics.fullWidth * size }]}
                source={require('../assets/images/logo.png')}
                resizeMode='contain'
                size={size}
            />
            <Text style={[styles.imageLabel, { color: color, fontSize: fontSize, fontFamily: fontFamily }]}>
                {label}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        // backgroundColor:'red'

    },
    imageLabel: {
        alignSelf: 'center',
        fontFamily: fonts.semiBold,
        fontSize: size.default,
        color: colors.white,
    }
})

export { Logo, sizeWidth }

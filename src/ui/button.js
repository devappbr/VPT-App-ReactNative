import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'

const sizeWidth = {
    LG: 0.9,
    MD: 0.6,
    SM: 0.3
}

const Button = ({ label, onPress, disabled = false, backgroundColor = colors.primary, size = sizeWidth.LG }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { width: metrics.fullWidth * size, backgroundColor:backgroundColor }]}
            onPress={onPress}
            disabled={disabled}
            size={size}
        >
            <Text style={styles.buttonLabel}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        backgroundColor: colors.primary,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'green'
    },
    buttonLabel: {
        fontFamily: fonts.semiBold,
        fontSize: size.regular,
        color: colors.white,
    }
})

export { Button, sizeWidth }

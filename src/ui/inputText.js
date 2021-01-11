import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { metrics, fonts, size, colors } from '../themes'
// import TextInputMask from './node_modules/react-native-text-input-mask';

const sizeWidth = {
    LG: 0.9,
    MD: 0.6,
    SM: 0.3
}

const InputText = ({ onChangeText, label, helper, onPress, secureTextEntry = false, disabled = false, size = sizeWidth.LG, placeholder }) => {
    return (
        <View style={[styles.container, { width: metrics.fullWidth * size }]} >
            {label ?
                <Text style={styles.inputLabel}>{label}</Text>
                : null}
            <KeyboardAvoidingView >
                <TextInput
                    refInput={ref => { this.input = ref }}
                    onChangeText={onChangeText}
                    style={[styles.inputContainer, { width: metrics.fullWidth * size }]}
                    onPress={onPress}
                    disabled={disabled}
                    secureTextEntry={secureTextEntry}
                    size={size}
                    placeholder={placeholder}
                    placeholderTextColor={colors.placeholder}
                    
                />
            </KeyboardAvoidingView>
            {helper ?
                <Text style={styles.inputHelper}>{helper}</Text>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'center',
        // backgroundColor:'blue',
        marginBottom: 20,
    },
    inputContainer: {
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 30,
    },
    inputLabel: {
        fontFamily: fonts.medium,
        fontSize: size.regular,
        color: colors.subtitle,
        marginHorizontal: 5,
        marginBottom: 3,
    },
    inputHelper: {
        fontFamily: fonts.medium,
        fontSize: size.smaller,
        color: colors.subtitle,
        alignSelf: 'flex-end',
        marginVertical: 5,
        paddingHorizontal: 10,

    }
})

export { InputText, sizeWidth }

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../themes';
import { withNavigation } from 'react-navigation';

class BottomTab extends Component {

    _handlerMenu = async (id) => {

        this.props.navigation.navigate(id)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.shareButton}>
                    <Icon name="md-home" color={colors.secondary} size={20} />
                    {/* <Text style={styles.txtIcons}>Indique</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }} style={styles.shareButton}>
                    <Icon name="md-contacts" color={colors.secondary} size={20} />
                    {/* <Text style={styles.txtIcons}>Indique</Text> */}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this._handlerMenu('QrCode')}
                    //   hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    style={styles.qrCodeButton}>
                    <View style={styles.qrCodeLinearGradient}>
                        <Icon name='md-add' size={30} color={colors.white} />
                    </View>
                    {/* <Text style={styles.txtIcons}>Check-In</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this._handlerMenu('Signin')}
                    style={styles.shareButton}>
                    <Icon name="md-home" color={colors.secondary} size={20} />
                    {/* <Text style={styles.txtIcons}>Indique</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }} style={styles.helpButton}>
                    <Icon name="md-help" color={colors.secondary} size={20} />
                    {/* <Text style={styles.txtIcons}>Ajuda</Text> */}
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(BottomTab)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: 50,
        // height: isIphoneX() ? 80 : 60,
        width: width * 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderTopWidth: 0.3,
        borderTopColor: '#DDDDDD',
        // shadowOffset: { width: 5, height: 3 },
        // shadowColor: '#000000',
        // shadowOpacity: 0.1,
        // elevation: 10,
    },
    shareButton: {
        height: '100%',
        marginLeft: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helpButton: {
        height: '100%',
        marginRight: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtIcons: {
        fontSize: 13,
        fontFamily: 'MontSerrat-Light',
        color: colors.secondaryText,
    },
    qrCodeText: {
        fontSize: 13,
        fontFamily: 'MontSerrat-Light',
        color: colors.primary,
    },
    qrCodeLinearGradient: {
        width: 55,
        height: 55,
        borderRadius: 60,
        overflow: 'hidden',
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    qrCodeButton: {
        marginTop: -25,
        height: 85,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    qrCodeIcon: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
});

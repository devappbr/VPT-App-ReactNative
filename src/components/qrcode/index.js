/* eslint-disable no-console */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import axios from 'axios'
import { getTables, getTablesPerStores } from '../../services/apiRest/tables';
import { baseLocal } from '../../services/apiRest/conn';
import AsyncStorage from '@react-native-community/async-storage'
import { colors } from '../../themes';


const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});
const landmarkSize = 2;

class QrCode extends Component {
    static navigationOptions = {
        headerTransparent: {},
        headerTintColor: '#fff',
    };

    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        canDetectBarcode: true,
        barcodes: [],
        stage: 1,
        User: {},
        chave: []
    }

    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@dataUser')
        const dataUser = JSON.parse(json) || {}

        if (dataUser.token) {
            axios.defaults.headers.common['Authorization']
                = `bearer ${dataUser.token}`
            this.setState({ User: dataUser })

        } else {
            this.props.navigation.navigate('Signin')
        }
        this.renderCamera();
    }


    touchToFocus(event) {
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
        });
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            alert(data.uri);
        }
    };

    renderTextBlocks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.textBlocks.map(this.renderTextBlock)}
        </View>
    );

    renderTextBlock = ({ bounds, value }) => (
        <React.Fragment key={value + bounds.origin.x}>
            <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>{value}</Text>
            <View
                style={[
                    styles.text,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            />
        </React.Fragment>
    );

    barcodeRecognized = async ({ barcodes }) => {
        this.setState({ barcodes: barcodes });
        {
            this.state.barcodes.map(dados => {
                const { data } = dados;
                const dataJSON = JSON.parse(data) || {}
                this.setState({ chave: dataJSON });
                if (this.state.chave != '') {
                    this.setState({ canDetectBarcode: false });
                    this._checkQrCode()
                }
            });
        }
    };

    _checkQrCode = async () => {
        const authPassed = { headers: { "Authorization": `Bearer ${this.state.User.token}` } }
        const { storesID, numberTable } = this.state.chave
        try {
            // const res = await axios.get(`${baseLocal}${getStores}`, authPassed);
            axios.all([
                await axios.get(`${baseLocal}${getTablesPerStores}${storesID}/${numberTable}`, authPassed),
            ]).then(axios.spread((storeRes, otherRes) => {
                {
                    !storeRes.data.erro ?
                    Alert.alert(
                        'Confirmação de Mesa',
                        `${storeRes.data[0].msg}`,
                        [
                            {
                                text: 'Não, a mesa é diferente',
                                onPress: () => this.props.navigation.goBack(),
                                style: 'cancel',
                            },
                            { text: 'Sim, estou na mesa', onPress: () => this.props.navigation.navigate('ProductsMenu', { id:storeRes.data[0].idStores }) },
                        ],
                        { cancelable: false },
                    )             
                    :
                    Alert.alert('Erro', `${storeRes.data.erro}`)
                    this.props.navigation.goBack()
                }



            }))
        } catch (err) {
            Alert.alert('Erro ao abrir mesa', err.response.data.error)
        }
    }

    renderCamera() {
        const { canDetectBarcode } = this.state;
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    height: height * 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
                googleVisionBarcodeMode={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
                googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}>

                <BarcodeMask 
                    width={width * 0.8} 
                    height={height * 0.5} 
                    showAnimatedLine={true} 
                    edgeColor={colors.white} 
                    transparency={0.5}
                    backgroundColor= {'rgba(202, 78, 78, 0.9)'}
                />
                <View
                    style={{
                        flexDirection: 'column',
                        flex: 1,
                        width: width * 0.8,
                        height: 100,
                        alignContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}>
                    <View>
                        <Text style={styles.InstructionsTitle}>Abrir uma nova Mesa - {this.state.chave.storeID}</Text>
                    </View>
                    <View>
                        <Text style={styles.Instructions}>Mire no QR Code no display da sua mesa</Text>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        alignSelf: 'center',
                        alignContent: 'center',
                        marginBottom: height * 0.1,
                    }}>
                    {/* <Text style={styles.Instructions}>Escaneie sua Nota Fiscal e garanta seu dinheiro na conta!</Text>
          <Text style={styles.Instructions}>A nota precisa ter sido emitida em menos de 24hs</Text> */}
                </View>
            </RNCamera>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container1}>{this.renderCamera()}</View>
            </View>
        );
    }
}

export default withNavigation(QrCode)
export const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Instructions: {
        fontSize: 13,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        paddingTop: 20,
    },

    InstructionsTitle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        paddingTop: 20,
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: 'cyan',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    container1: {
        flex: 1,
    },
    header: {
        borderWidth: 0.3,
        borderColor: 'gray',
        height: 45,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 10,
    },
    Button: {
        width: width * 0.5,
        height: 40,
        borderRadius: 40,
        marginTop: 40,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});

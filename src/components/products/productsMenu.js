import React, { Component } from 'react';
import { FlatList, Alert, StyleSheet, View, Text, ScrollView, Modal, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigation } from 'react-navigation'

import { baseLocal } from '../../services/apiRest/conn'
import { getStores, } from '../../services/apiRest/stores'
import ItemVerticalMenu from '../../ui/itemVerticalMenu';
import { metrics, fonts, size, colors } from '../../themes'
import { getProducts } from '../../services/apiRest/products';
import ProductsFooter from './productsFooter';
import ProductsHeader from './productsHeader';
import ProductsModal from './productsModal'
import ProductsOrder from './productsOrder'
import ItemOrders from '../../ui/itemOrders'

class ProductsMenu extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        this.state = {
            stores: {},
            user: {},
            id: id,
            qty: 0,
            idProduct: null,
            lists: [],
            modalVisible: false,
            modalOrder: false,
            nameProduct: null,
            priceProduct: 0,
            descProduct: null,
        }
    }

    componentDidMount = async () => {
        const json = await AsyncStorage.getItem('@dataUser')
        const dataUser = JSON.parse(json) || {}
        if (dataUser.token) {
            axios.defaults.headers.common['Authorization']
                = `bearer ${dataUser.token}`
            this.setState({ user: dataUser })
        } else {
            this.props.navigation.navigate('Login')
        }
        this._getData()
    }

    _increment() {
        this.setState(prevState => ({ qty: prevState.qty + 1 }));
    }

    _decrement() {
        this.setState(prevState => ({ qty: prevState.qty - 1 }));
    }

    _addProductList(id, qty, name, price, desc) {
        // Create a new array based on current state:
        let lists = [...this.state.lists]
        let multiplicator = Number(qty) * Number(price)
        multiplicator = multiplicator
        // let onlyNumber = '/^[a-z]+$/i'
        if (qty <= 0 || null) {
            Alert.alert('Qual a quantidade?', 'Você não preencheu a quantidade')
        } else {
            lists.push({ id: id, qty: qty, name: name, price: price, desc: desc, multiplicator: multiplicator })
            this.setState({ lists, qty: 0 });
            this.setModalVisible(!this.state.modalVisible)
        }
    }

    _orderModal(visible) {

        let valores = this.state.lists.map(m => m.multiplicator)
        var total = valores.reduce((total, numero) => total + numero, 0);

        this.setState({ modalOrder: visible, valueOrder: total});

    }

    onChangeText(text) {
        this.setState({ qty: text })
    }

    setModalVisible(visible, id, name, price, desc) {
        this.setState({ modalVisible: visible, idProduct: id, nameProduct: name, priceProduct: price, descProduct: desc });
    }

    _getData = async () => {
        const authPassed = { headers: { "Authorization": `Bearer ${this.state.user.token}` } }
        try {
            // const res = await axios.get(`${baseLocal}${getStores}`, authPassed);
            axios.all([
                await axios.get(`${baseLocal}${getStores}${this.state.id}/${getProducts}`, authPassed),
            ]).then(axios.spread((storesRes, categoriesRes) => {
                this.setState({ stores: storesRes.data });
                console.log(storesRes.data)
            }))
        } catch (err) {
            Alert.alert('Erro ao buscar estabelecimentos', err.response.data.error);
        }
    }

    _keyExtractor(item, index) {
        return index.toString();
    }

    _renderItem({ item, index }) {
        const currency = 'R$ ' + item.price.toFixed(2)
        return (
            <View>
                <ItemVerticalMenu
                    key={item.id}
                    icon={item.logo}
                    name={item.name}
                    description={item.description}
                    price={currency}
                    showModal={() => this.setModalVisible(true, item.id, item.name, item.price, item.description)}
                    id={item.id}
                    // segment={item.segmentName}
                    categories={item.categoriesName}
                    modal={this.state.modal} // subir um modal em arquivo diferente
                />
            </View>
        )
    }

    _renderOrders({ item, index }) {
        const currency = 'R$ ' + item.price.toFixed(2)
        let valores = this.state.lists.map(m => m.multiplicator)
        var total = valores.reduce((total, numero) => total + numero, 0);
        

        return (
            <View>
                <View>
                    <ItemOrders
                        key={item.id}
                        icon={item.logo}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        qty={item.qty}
                        showModal={() => this.setModalVisible(true, item.id, item.name, item.price, item.description)}
                        id={item.id}
                        // segment={item.segmentName}
                        categories={item.categoriesName}
                        modal={this.state.modal} // subir um modal em arquivo diferente
                        multiplicator = {item.multiplicator}
                        valueOrder = {() =>{}}

                    />
                </View>
            </View>
        )
    }

    render() {
        const { stores } = this.state
        return (
            <View style={styles.container}>
                <ProductsHeader />
                <ScrollView >
                    <View style={{ marginTop: 10 }}>
                        <View>
                            <Text style={styles.title} numberOfLines={2}>{'Cardápio'}</Text>
                        </View>

                        <FlatList
                            data={stores}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={this._keyExtractor.bind(this)}
                            renderItem={this._renderItem.bind(this)}
                            horizontal={false}
                        />
                    </View >
                </ScrollView >
                <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        hardwareAccelerated={true}
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.8)'
                        }}>
                            <ProductsModal
                                cancel={() => this.setModalVisible(!this.state.modalVisible)}
                                ok={() => this._addProductList(this.state.idProduct, this.state.qty, this.state.nameProduct, this.state.priceProduct, this.state.descProduct)}
                                id={this.state.idProduct}
                                name={this.state.nameProduct}
                                price={this.state.priceProduct}
                                description={this.state.descProduct}
                                onPressDecr={() => this._increment()}
                                onPressIncr={() => this._decrement()}
                                qty={text => this.onChangeText(text)}
                                numeric value
                                value={this.state.qty}
                                
                            />
                        </View>
                    </Modal>
                </View>

                <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalOrder}
                        hardwareAccelerated={true}
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                            alignSelf: 'flex-start'
                        }}
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'flex-start',
                            backgroundColor: 'rgba(0,0,0,0.8)'
                        }}>
                            <View>
                                <ProductsOrder
                                    data={this.state.lists}
                                    keyExtractor={this._keyExtractor.bind(this)}
                                    renderItem={this._renderOrders.bind(this)}
                                    cancel={() => this._orderModal(!this.state.modalOrder)}
                                    valueOrder={this.state.valueOrder}
                                    ok={()=> console.warn(this.state.lists)}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* <View style={{ width: 300, height: 40, backgroundColor: colors.primary, alignSelf: 'center' }}>
                    {this.state.lists.map(l => <Text>ID: {l.id} / Qty: {l.qty} / name: {l.name} / price:{l.price}</Text>)}

                </View> */}
                <ProductsFooter visible={true}
                    qty={this.state.lists.length}
                    onPress={() => this._orderModal(!this.state.modalOrder)}
                />
            </View >

        )
    }
}

export default withNavigation(ProductsMenu)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontFamily: fonts.semiBold,
        fontSize: size.default,
        color: colors.primary,
        textAlign: 'left',
        marginHorizontal: 10,
        marginVertical: 10
    },
    modal: {
        height: height * 0.4,
        width: width * 0.6,
        backgroundColor: 'transparent'
    }
})
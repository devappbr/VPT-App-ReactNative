import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { View, ScrollView, StyleSheet, Dimensions, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import ProductsFooter from '../../components/products/productsFooter'
import ProductsMenu from '../../components/products/productsMenu'
import { colors, fonts } from '../../themes'


// import { Container } from './styles';

class Products extends Component {
    constructor(props){
      super(props)
    }
  
    static navigationOptions = {
      headerTransparent: {},
    //   headerStyle: {
    //     height: 80,
    //     backgroundColor: colors.white,
    //   },
  
    }
  
    render() {
      return (
        <View style={styles.container}>
          <ScrollView >
            <View >
              <ProductsMenu label={'Categorias'} />
              
            </View >
          </ScrollView >
          <ProductsFooter />
        </View >
      )
    }
  }
  
  export default withNavigation(Products)
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 5,
    },
    search: {
      width:'100%',
      height: 40,
      backgroundColor: colors.white,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: 10,
      
      elevation:1,
  },
  })
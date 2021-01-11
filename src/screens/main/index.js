import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import Categories from '../../components/categories/categories'
import { withNavigation } from 'react-navigation';
import Stores from '../../components/stores/stores';
import BottomTab from '../../components/tabs'
import { colors, fonts } from '../../themes'
import { InputText } from '../../ui/inputText'

const { width, height } = Dimensions.get('window')

class Main extends Component {
  constructor(props){
    super(props)
  }

  static navigationOptions = {
    // headerTransparent: {},
    headerStyle: {
      height: 80,
      backgroundColor: colors.white,
    },

    headerLeft: () => (

      <View style={{ marginLeft: 15 }}>
        <Icon name='md-menu' size={24} color={colors.primary} />
      </View>

    ),
    headerTitle: () => (

      <TextInput 
        placeholder='Fale comigo! O que você procura?'
        placeholderTextColor={colors.secondary}
        style={styles.search}
      />
      // <InputText
      //   placeholder='Experimente "Comida japonesa"'
      //   placeholderTextColor={colors.secondary}
      //   width={width * 0.1}
      // />
    ),
    headerRight: () => (
      // <View style={[styles.micIcon]}  >
      //   <Icon name='md-mic' size={20} color={'white'} />
      // </View>

      <View style={{ marginRight: 15 }}>
        <Icon name='md-mic' size={24} color={colors.primary} />
      </View>

    ),
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <View >
            <Categories label={'Categorias'} />
            <Stores label={'Estabelecimentos'}/>
          </View >
        </ScrollView >
        <BottomTab />
      </View >
    )
  }
}

export default withNavigation(Main)

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

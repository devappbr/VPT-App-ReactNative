import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Button, sizeWidth } from '../../ui/button'
import { Logo } from '../../ui/logo'
import { InputText } from '../../ui/inputText'
import { colors, fonts, size } from "../../themes";
import { baseLocal, baseURL } from '../../services/apiRest/conn'
import { signin } from '../../services/apiRest/users'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigator} from 'react-navigation' 

 class Signin extends Component {

//   static navigationOptions = {
//     headerTransparent: {},
//     // title: 'Home',
//     headerStyle: {
//       backgroundColor: 'transparent',

//     },
//     headerTintColor: '#ffffff',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//     },
//   };


  constructor(props) {
    super(props)
    const {navigation} = this.props

    this.state = {
      cpf: 34457618845,
      password: 'kdelnx99',
      User: {},
    }
  }

  _clearItem = async () => {
    await AsyncStorage.removeItem('@dataUser');
    this.setState({ User: {} })
  };

  _signinUser = async () => {
    try {
      const res = await axios.post(`${baseLocal}${signin}`, {
        cpf: this.state.cpf,
        password: this.state.password
      })
      axios.defaults.headers.common['Authorization'] 
        = `bearer ${res.data.token}`
        AsyncStorage.setItem('@dataUser', JSON.stringify(res.data))
        this.setState({User: res.data})

        this.props.navigation.navigate('AuthOrApp')
        Alert.alert('Sucesso', res.data.token)

    } catch (err) {
      Alert.alert('Erro ao entrar', JSON.stringify(err.response.data.error))
      console.log(err.response.error)
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View>
          <Logo size={sizeWidth.MD} />
        </View>
        <View>
          <InputText placeholder={'Digite seu CPF'}
            onChangeText={(formatted, extracted) => {
              this.setState({ cpf: extracted })
            }}
          />
          <InputText placeholder={'Digite sua senha'} helper={'Esqueceu sua senha?'}
            onChangeText={(text) => {
              this.setState({ password: text })
            }}
            secureTextEntry={true} />
        </View>
        <Button label={'Entrar'} size={sizeWidth.MD} onPress={() => this._signinUser()} />
        <TouchableOpacity onPress={() => this._clearItem()}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.signup}>Ainda não tenho cadastro.</Text>
          </View>
          <Text>{this.state.User.token}</Text>
          <Text>{this.state.cpf}</Text>
          <Text>{this.state.password}</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

export default Signin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-evenly'

  },
  signup: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: size.small
  }
})
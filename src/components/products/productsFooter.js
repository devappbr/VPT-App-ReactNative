import React, { Component } from 'react';

import { View, Text } from 'react-native';
import Footer from '../../ui/Footer';

// import { Container } from './styles';

export default class ProductsFooter extends Component {
  render() {
    return (
      <Footer qty={this.props.qty} visible={this.props.visible} onPress={this.props.onPress}/>
    )
  }
}

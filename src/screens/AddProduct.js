import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
  StyleProvider
} from 'native-base';
import prompt from 'react-native-prompt-android';




class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [
        { id: 1, name: 'bread' },
        { id: 2, name: 'eggs' },
        { id: 3, name: 'paper towels' },
        { id: 4, name: 'milk' }
      ],
      productsInList: [],
    };

  }

  _handleAddProductPress() {
    prompt(
      'Enter product name',
      '',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: this.addNewProduct.bind(this) }
      ],
      { type: 'plain-text' }
    );
  }

  _handleProductPress(product) {
    const productIndex = this.state.productsInList.findIndex(
      p => p.id === product.id
    );
    if (productIndex > -1) {
      this.setState({
        productsInList: this.state.productsInList.filter(
          p => p.id !== product.id
        )
      });
      this.props.navigation.state.params.deleteProduct(product);
    } else {
      this.setState({
        productsInList: this.state.productsInList.concat(product)
      });
      this.props.navigation.state.params.addProduct(product);
    }
  }

  async _handleRemovePress(product) {
    this.setState({
      allProducts: this.state.allProducts.filter(p => p.id !== product.id)
    });
    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(
        this.state.allProducts.filter(p => p.id !== product.id)
      )
    );
  }

  async addNewProduct(name) {
    const newProductsList = this.state.allProducts.concat({
      name: name,
      id: Math.floor(Math.random() * 100000)
    });

    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(newProductsList)
    );

    this.setState({
      allProducts: newProductsList
    });
  }

  async componentWillMount() {
    const savedProducts = await AsyncStorage.getItem('@allProducts');
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts)
      })
    }
    this.setState({
      productsInList: this.props.navigation.state.params.productsInList
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map(product => {
              const productIsInList = this.state.productsInList.
                find(p => p.id === product.id);
              return (
                <ListItem
                  key={product.id}
                  onPress={this._handleProductPress.bind(this, product)}
                >
                  <Body>
                    <Text
                      style={{ color: productIsInList ? '#bbb' : '#000' }}
                    >
                      {product.name}
                    </Text>
                    {
                      productIsInList &&
                      <Text note>
                        {'Already	in	shopping	list'}
                      </Text>
                    }
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: 'red' }}
                      onPress={this._handleRemovePress.bind(this, product)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={this._handleAddProductPress.bind(this)}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
export default AddProduct;
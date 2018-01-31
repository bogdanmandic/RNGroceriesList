import React from 'react';
import { StackNavigator } from 'react-navigation';
import ShoppingList from './src/screens/ShoppingList';
import AddProduct from './src/screens/AddProduct';
const Navigator = StackNavigator({
  ShoppingList: { screen: ShoppingList },
  AddProduct: { screen: AddProduct }
});
export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Navigator />;
  }
}
console.disableYellowBox = true;
console.ignoredYellowBox = ['Remote debugger'];
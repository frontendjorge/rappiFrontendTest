import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Header from './components/dumb/header'
import Shelving from './components/smart/shelving'
import ShoppingCart from './components/containers/shopping-cart'

import dbCategories from './services/categories'
import db from './services'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faTimes, faFilter, faListUl, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

import './App.css'


library.add(faShoppingCart, faTimes, faFilter, faListUl, faPlus, faMinus, faTrash)

class App extends Component {
  state = {
    isShoppingCartVisible: false,
    cart: []
  }

  toggleIsShoppingCartVisible= () => {
    this.setState({isShoppingCartVisible: !this.state.isShoppingCartVisible})
  }

  clearProducts = () => {
    this.toggleIsShoppingCartVisible()
    const cart = []

    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({cart})
  }

  addProduct = (product) => {
    let cart = []
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push(product)
    
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({cart})
  }

  removeProduct = (product) => {
    let newCart = this.state.cart
    newCart.splice(this.state.cart.indexOf(product), 1)

    localStorage.setItem('cart', JSON.stringify(newCart))
    this.setState({newCart})

    // console.log(newCart)
    // list.splice( list.indexOf('foo'), 1 );

    // console.log(this.state.cart.indexOf(product))
  }

  componentDidMount = () => {
    if (localStorage.getItem('cart')) {
			this.setState({cart: JSON.parse(localStorage.getItem('cart'))})
    }
  }

  render() {
    return (
      <div className="container">
        <Header 
          itemsCount={this.state.cart.length} 
          isOpen={this.state.isShoppingCartVisible} 
          onClickBtnShoppingCart={this.toggleIsShoppingCartVisible} />
        <Container>
          
          <Shelving
            category={dbCategories.categories[0]} 
            products={db.products} 
            onAddProduct={this.addProduct} />
          <br />
          <ShoppingCart 
            visible={this.state.isShoppingCartVisible}
            productsList={this.state.cart}
            onRemoveProduct={this.removeProduct}
            onClearProducts={this.clearProducts} />
          
         
  
        </Container>
      </div>
    )
  }
}

export default App

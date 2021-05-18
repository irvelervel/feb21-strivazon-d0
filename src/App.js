import { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import CartIndicator from './components/CartIndicator'
import BookStore from './components/BookStore'
import Cart from './components/Cart'
import { Route, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.addToCart = this.addToCart.bind(this)
  // }

  state = {
    cart: [],
  }

  addToCart = (book) => {
    let newCart = [...this.state.cart, book]
    this.setState({
      cart: newCart,
    })
  }

  removeFromCart = (index) => {
    // let newCart = this.state.cart.filter((book) => book.id !== id)
    // let newCart = [...this.state.cart.slice(0, index), ...this.state.cart.slice(index + 1)]
    // the first slice returns the cart array from the START until we reach the index we want
    // the second slice returns the cart array from the element AFTER index (I'm skipping index)
    // until I reach the end of the cart
    let newCart = this.state.cart.filter((book, i) => index !== i)
    // another approach with filter
    this.setState({
      cart: newCart,
    })
  }

  render() {
    return (
      // we need to store my cart array into App
      <Router>
        <Container>
          <Row>
            <Col sm={12} className="text-center background-div">
              <Link to="/">
                <h1>Strivazon Book Store</h1>
              </Link>
            </Col>
            <CartIndicator cartLength={this.state.cart.length} />
          </Row>
          <hr />
          <Route path="/" exact render={(routerProps) => <BookStore {...routerProps} addToCart={this.addToCart} />} />
          <Route
            path="/cart"
            exact
            render={(routerProps) => (
              <Cart {...routerProps} cart={this.state.cart} removeFromCart={this.removeFromCart} />
            )}
          />
        </Container>
      </Router>
    )
  }
}

export default App

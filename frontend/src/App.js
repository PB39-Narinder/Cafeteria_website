import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import BlogScreen from './screens/BlogScreen';
import SingleBlogScreen from './screens/SingleBlogScreen';
import CustomCoffee from './screens/CustomCoffee';  // Import the service screen
import FreshBakes from './screens/FreshBakes';  // Import the service screen
import WifiCoworking from './screens/WifiCoworking';  // Import the service screen
import ErrorBoundary from './components/ErrorBoundary';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Router>
          <Header />
          <main className="py-3">
            <Switch>
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrderScreen} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/blog" exact component={BlogScreen} />
              <Route path="/blog/:slug" exact component={SingleBlogScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/admin/userlist" component={UserListScreen} />
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route path="/admin/productlist" component={ProductListScreen} exact />
              <Route
                path="/admin/productlist/:pageNumber"
                component={ProductListScreen}
                exact
              />
              <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
              <Route path="/admin/orderlist" component={OrderListScreen} />
              <Route path="/search/:keyword" component={HomeScreen} exact />
              <Route path="/page/:pageNumber" component={HomeScreen} exact />
              <Route
                path="/search/:keyword/page/:pageNumber"
                component={HomeScreen}
                exact
              />
              <Route path="/" component={HomeScreen} exact />

              {/* Service Routes */}
              <Route path="/services/custom-coffee" component={CustomCoffee} />
              <Route path="/services/fresh-bakes" component={FreshBakes} />
              <Route path="/services/wifi-coworking" component={WifiCoworking} />
            </Switch>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App;

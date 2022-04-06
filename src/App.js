import './App.css';
import React, {Component, Fragment} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Card from '@mui/material/Card';
import { connect } from 'react-redux';
import PropType from 'prop-types'




class App extends Component{

  state = {
    right: false,
    drawerState: 'cart',
    error: null,
    deliveryMethod: 'Pickup'
}


render(){
  return (
    <Router>
      <div>
        <Route exact path="/ll" component={Home}/>
        </div>
    </Router>
  );
}
}

App.propTypes = {
  api: PropType.object.isRequired
}

const mapStateToProps = state => ({
  api: state.api, 
});

export default connect(mapStateToProps)(App);
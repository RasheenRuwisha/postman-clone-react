import './App.css';
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Card from '@mui/material/Card';
import { connect } from 'react-redux';
import PropType from 'prop-types'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

class App extends Component{

  state = {
    right: false,
    drawerState: 'cart',
    error: null,
    deliveryMethod: 'Pickup'
}


render(){
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Router>
      <div style={{overflow:'hidden'}}>
        <Route exact path="/" component={Home}/>
        </div>
    </Router>
    </ThemeProvider>
  );
}
}

App.propTypes = {
  api: PropType.object.isRequired,
  java: PropType.string.isRequired
}

const mapStateToProps = state => ({
  api: state.api, 
  java: state.java,
});

export default connect(mapStateToProps)(App);

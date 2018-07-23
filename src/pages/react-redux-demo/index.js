import Header from './header';
import Main from './main';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import store from '@/redux/store';

export default class Home extends Component {
    // static childContextTypes = {
    //   store :PropTypes.object
    // }
    constructor () {
      super()
    }
    // getChildContext () {
    //   return { 
    //     store 
    //   }
    // }
    render () {
      return (
        <div>
          <Header />
          <Main />
        </div>
      )
    }
  }
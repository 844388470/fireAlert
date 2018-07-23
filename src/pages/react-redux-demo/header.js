import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Title extends Component {
    // static contextTypes = {
    //   colorReducer: PropTypes.string
    // }
    // constructor () {
    //   super()
    //   this.state = { themeColor: '' }
    // }
    // componentWillMount () {
    //   this._updateThemeColor()
    //   store.subscribe(() => this._updateThemeColor())
    // }
    // _updateThemeColor () {
    //   const { store } = this.context
    //   const state = store.getState()
    //   this.setState({ themeColor: state.colorReducer })
    // }
    render () {
      return (
        <h1 style={{ color: this.props.colorReducer }}>React.js 小书标题</h1>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log(state)
    return {
      colorReducer: state.colorReducer
    }
  }
  Title = connect(mapStateToProps)(Title)


export default Title;
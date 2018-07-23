import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import action from '@/redux/actions';
// import store from '@/redux/store';


class Content extends Component {
    // static contextTypes = {
    //     colorReducer: PropTypes.object
    // }

    // constructor () {
    //     super()
    //     this.state = { themeColor: '' }

    // }

    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }

    // componentWillMount () {
    //     this._updateThemeColor()
    //     store.subscribe(() => this._updateThemeColor())
    // }
    
    // _updateThemeColor () {
    //     const { store } = this.context
    //     const state = store.getState()
    //     this.setState({ themeColor: state.colorReducer })
    // }

    render () {
        return (
        <div>
            <h2 style={{ color: this.props.colorReducer }}>this is 内容</h2>
            <button 
            style={{ color: this.props.colorReducer }}
            onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
            <button
            style={{ color: this.props.colorReducer }}
            onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        colorReducer: state.colorReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch(action.changeColor(color))
        }
    }
}
Content = connect(mapStateToProps,mapDispatchToProps)(Content)


export default Content;
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from '@/router/router';
import store from '@/redux/store';
require('./style/index.css');
import { addToCart }  from './redux/actions/a_x';

// let unsubscribe = store.subscribe(() =>                    //监听dispatch的调用
//   console.log(store.getState())
// );

// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));

// unsubscribe();

ReactDOM.render(
    (<Provider store={store}>
      <Routes />
    </Provider>),
    document.getElementById('app'),
)
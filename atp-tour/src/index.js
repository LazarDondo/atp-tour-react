import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const store = createStore(reducers, applyMiddleware(thunk))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import wrapper from '../store/configureStore';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';


const FutChall = ({ Component, store }) => {
    return (
        <Provider store={store} >
            <Head>
                <title>FutChall</title>
                <meta charSet="utf-8"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.5/antd.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.1.5/antd.min.js"></script>
                <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=60712c2e792d545d1241f9c9bc3a1f28&libraries=clusterer,services"></script>
            </Head>
            <Component />
        </Provider>
    );
}
FutChall.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
};
const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        );
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};
export default withRedux(configureStore)(FutChall);
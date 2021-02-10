/* eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader/root';
import {Route, Switch} from 'react-router-dom';

import Search from './search/Search';
import Checkout from './checkout/Checkout';
import Confirmation from './confirmation/Confirmation';

import 'tailwindcss/tailwind.css';
import '../sass/main.scss';

const App = ({spots}) => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return <Search spots={spots} />;
                }}
            />
            <Route
                path="/checkout"
                component={Checkout}
            />
            <Route
                path="/confirmation"
                component={Confirmation}
            />
        </Switch>
    );
};

App.propTypes = {
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default hot(App);

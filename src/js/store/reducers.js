import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import spot from '../spot/spot-reducer';
import checkout from '../confirmation/confirmation-reducer';

export default history => combineReducers({
    spot,
    checkout,
    router: connectRouter(history),
});

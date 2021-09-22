import {SPOT_PURCHASE} from '../spot/spot-actions';

const initialState = {
    email: null,
};

export default function checkout(state = initialState, {type, payload}) {
    switch (type) {
        case SPOT_PURCHASE: {
            console.log(payload);

            return {
                ...state,
                email: payload || null
            };
        }

        default:
            return state;
    }
}

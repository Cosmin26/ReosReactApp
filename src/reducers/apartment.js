import {
    APARTMENT_UPDATE,
    APARTMENT_CREATE,
    APARTMENT_SAVE_SUCCESS,
    APARTMENT_DELETE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {
    uid: '',
    title: '',
    imageUrl: '',
    cost: 0
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case APARTMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case APARTMENT_CREATE:
            return INITIAL_STATE;
        case APARTMENT_SAVE_SUCCESS:
            return INITIAL_STATE;
        case APARTMENT_DELETE_SUCCESS:
            return { ...state, visible: false };
        default:
            return state;
    }
};
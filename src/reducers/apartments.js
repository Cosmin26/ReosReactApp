// import * as types from "../actions/types";
//
// export const apartments = (state = {}, action) => {
//     switch (action.type) {
//         case types.ADD_APARTMENT:
//             var apartments =  cloneObject(state.apartments) //clone the current state
//             apartments.unshift(action.apartment); //add the new quote to the top
//             state = Object.assign({}, state, { apartments: apartments});
//             return state;
//         case types.AVAILABLE_APARTMENTS:
//             state = Object.assign({}, state, { apartments: action.apartments, loading:false });
//             return state;
//         case types.UPDATE_APARTMENT:
//             var apartment = action.apartment;
//             var apartments =  cloneObject(state.apartments) //clone the current state
//             var index = getIndex(apartments, apartment.id); //find the index of the apartment with the apartment id passed
//             if (index !== -1) {
//                 apartments[index]['title'] = apartment.title;
//                 apartments[index]['image'] = apartment.image;
//                 apartments[index]['cost'] = apartment.cost;
//             }
//             state = Object.assign({}, state, { apartments: apartments});
//             return state;
//         case types.EDIT_APARTMENT_SUCCESS:
//             return {
//                 ...state,
//                 fetching: action.fetching,
//                 items: updatedApartments(state.items, action.item)
//             };
//         case types.EDIT_APARTMENT_FAIL:
//             return {
//                 ...state,
//                 fetching: action.fetching,
//             };
//         default:
//             return state;
//     }
// }
//
// function updatedApartments(state = [], action) {
//     return state.map((apartment) => {
//         if (apartment.id === action.id) {
//             return Object.assign({}, apartment, {
//                 title: action.title,
//                 image: action.image,
//                 cost: action.cost
//             })
//         }
//         return apartment;
//     });
// }

import {
    APARTMENT_FETCH_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case APARTMENT_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
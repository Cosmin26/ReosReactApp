// import { apartments as apartmentsReducer } from './apartments';
// import { users as usersReducer } from './users';
// import {combineReducers} from "redux";
// const initialState = {
//     apartments: [
//         // {
//         //     id: 1,
//         //     title: "Apartment 1",
//         //     img: require("../../images/1.jpg")
//         // },
//         // {
//         //     id: 2,
//         //     title: "Apartment 2",
//         //     img: require("../../images/2.jpg")
//         // },
//         // {
//         //     id: 3,
//         //     title: "Apartment 3",
//         //     img: require("../../images/3.jpg")
//         // },
//     ]
// };
//
//
// // export const reducer = (state = initialState, action) => {
// //     return {
// //         apartments: apartmentsReducer(state.apartments, action),
// //         user: usersReducer(state.user, action)
// //     }
// // };
//
// const rootReducer = combineReducers({
//     apartmentsReducer,
//     usersReducer
// });
//
// export default rootReducer;

import { combineReducers } from 'redux';
import AuthReducer from './users';
import ApartmentFormReducer from './apartment';
import ApartmentReducer from './apartments';

export default combineReducers({
    auth: AuthReducer,
    apartmentForm: ApartmentFormReducer,
    apartmentData: ApartmentReducer,
});
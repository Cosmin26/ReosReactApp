// import * as types from "./types";
//
// export const fetchApartmentsStarted = (uid) => {
//     return {
//         type: types.FETCH_APARTMENTS_STARTED,
//         fetching: true,
//         uid: uid
//     }
// };
//
// export const fetchApartmentsSuccess = (items) => {
//     return {
//         type: types.FETCH_APARTMENTS_SUCCESS,
//         fetching: false,
//         items: items
//     }
// };
//
//
// export const fetchApartmentsFail = () => {
//     return {
//         type: types.FETCH_APARTMENTS_FAIL,
//         fetching: false,
//     }
// };
//
// export const fetchApartments = (uid) => {
//     return (dispatch) => {
//         dispatch(fetchApartmentsStarted(uid))
//         return firebase.database()
//             .ref('accounts/' + uid + '/Apartments')
//             .once('value')
//             .then((Apartments) => {
//                 const items = Apartments.val();
//                 const normalizedItems = normalizeApartmentsObject(items)
//                 console.log("fetched Apartments: ", normalizedItems);
//                 dispatch(
//                     fetchApartmentsSuccess(
//                         normalizedItems
//                     )
//                 )
//                 return normalizedItems;
//             })
//             .catch((error) => {
//                 console.log("Cannot fetch Apartments: ", error);
//                 dispatch(fetchApartmentsFail());
//             })
//     }
// }
//
// const normalizeApartmentsObject = (Apartments) =>{
//     Apartments = (Apartments === null || Apartments === undefined)? [] : Apartments;
//     return Object.keys(Apartments).map(
//         (key) => {
//             return {
//                 id: key,
//                 title: Apartments[key].title,
//                 image: Apartments[key].image,
//                 cost: Apartments[key].cost
//             }
//         }
//     )
// }
//
// export const editApartmentStarted = () => {
//     return {
//         type: types.EDIT_APARTMENT_STARTED,
//         fetching: true,
//     }
// };
//
// export const editApartmentSuccess = (item) => {
//     return {
//         type: types.EDIT_APARTMENT_SUCCESS,
//         fetching: false,
//         item: item
//     }
// };
//
//
// export const editApartmentFail = () => {
//     return {
//         type: types.EDIT_APARTMENT_FAIL,
//         fetching: false,
//     }
// };
//
// export const editApartment = (uid, Apartment) => {
//     //not waiting for async to finish
//     //does not save to store the new edited APARTMENT
//     //TODO: fix this
//     return (dispatch) => {
//         dispatch(editApartmentStarted());
//         return firebase.database()
//             .ref('/accounts/' + uid + '/Apartments/' + Apartment.id)
//             .set({
//                 title: Apartment.title,
//                 startDate: Apartment.startDate,
//                 endDate: Apartment.endDate
//             })
//             .then((item) => {
//                 // console.log("Edit success: ", item);
//                 dispatch(editApartmentSuccess({}))
//             })
//             .catch((error => {
//                 console.log("Could not edit Apartment: ", error);
//             }))
//     }
// }

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as types from "./types";
// import { NavigationActions } from 'react-navigation';

export const apartmentUpdate = ({ prop, value }) => {
    return {
        type: types.APARTMENT_UPDATE,
        payload: { prop, value }
    }
};

export const apartmentCreate = ({ title, imageUrl, cost}) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/apartments`)
            .push({ title, imageUrl, cost })
            .then(() => {
                dispatch({
                    type: types.APARTMENT_CREATE
                });
                Actions.viewApartments();

            });
    }
};

export const apartmentsFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/apartments`)
            .on('value', snapshot => {
                dispatch({
                    type: types.APARTMENT_FETCH_SUCCESS,
                    payload: snapshot.val(),
                })
            });
    };
};

export const apartmentSave = ({ title, imageUrl, cost, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: types.APARTMENT_SAVE_SUCCESS
        });
        firebase.database().ref(`/users/${currentUser.uid}/apartments/${uid}`)
            .set({ title, imageUrl, cost})
            .then(() => {
                Actions.viewApartments();
            });
    }
};

export const apartmentDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/apartments/${uid}`)
            .remove()
            .then(() => {
                Actions.viewApartments();
            });
    }
};
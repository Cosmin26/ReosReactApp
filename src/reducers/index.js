import {EDIT_APARTMENT} from "../actions/index";

const initialState = {
    apartments: [
        {
            id: 1,
            title: "Apartment 1",
            img: require("../../images/1.jpg")
        },
        {
            id: 2,
            title: "Apartment 2",
            img: require("../../images/2.jpg")
        },
        {
            id: 3,
            title: "Apartment 3",
            img: require("../../images/3.jpg")
        },
    ]
};


function apartments(state = [], action) {
    switch(action.type) {
        case EDIT_APARTMENT:
            return  updatedApartments(state.apartments, action);
            break;
        default:
            return state.apartments;
    }
}

function updatedApartments(state = [], action) {
    return state.map((apartment) => {
        if (apartment.id === action.id) {
            return Object.assign({}, apartment, {
                title: action.title
            })
        }
        return apartment;
    });
}

export const Reducer = (state = initialState, action) => {
    return {
        apartments: apartments(state, action)
    }
};
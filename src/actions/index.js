export const EDIT_APARTMENT = 'EDIT_APARTMENT';

export function editApartment(id, title) {
    return {
        type: EDIT_APARTMENT,
        id,
        title,
    }
}

export const ActionCreators = Object.assign({},
    editApartment
);
const defaultState = {
    position: {
        latitude: null,
        longitude: null
    }
}

const Reducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'SET_POSITION:
            return {...state, position: action.payload}
            break;
    
        default:
            return state
            break;
    }
}

export default Reducer

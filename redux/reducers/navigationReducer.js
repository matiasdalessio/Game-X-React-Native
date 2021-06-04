const initialState = {
    navigationRedux: null
}

const navigationReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_NAVIGATION':
            console.log("entre al reducer")
            return {
                ...state, 
                navigationRedux: {...action.payload},
            }
        default:
            return state
    }
}

export default navigationReducer
const initialState = {
    allHardwares: [],
    filteredHardware: [],
    preLoader: true
}

const hardwareReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_HARDWARES':
            return {
                ...state, 
                allHardwares: action.payload,
                preLoader: false
            }
        case 'GET_INPUT_VALUE':
            return{
                ...state,
                filteredHardware: state.allHardwares.filter(hardware => hardware.productName.toLowerCase().indexOf(action.payload.toLowerCase().trim())===0)
            }
        default:
            return state
    }
}

export default hardwareReducer
const initialState = {
    allGames: [],
    gamesFiltered: [],
    preLoader: true
}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_GAMES':
            return {
                ...state,
                allGames: action.payload,
                preLoader: false
            }
        case 'FILTER_GAMES':
            let filterGamesComplete;

            return {
                ...state,
                gamesFiltered: filterGamesComplete
            }
        default:
            return state
    }
}

export default gamesReducer
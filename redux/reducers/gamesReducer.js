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
            console.log(state.gamesFiltered.length);
            let valueInput = action.payload.trim().toLowerCase()
            if (valueInput === 'add') {
                filterGamesComplete = state.allGames.slice(0,state.gamesFiltered.length * 2)
            } else {
                if (valueInput === '') {
                    filterGamesComplete = state.allGames.slice(0,20)
                } else {
                    filterGamesComplete = state.allGames.filter(game => game.title.toLowerCase().trim().includes(valueInput))
                }
            }
            return {
                ...state,
                gamesFiltered: filterGamesComplete
            }
        default:
            return state
    }
}

export default gamesReducer
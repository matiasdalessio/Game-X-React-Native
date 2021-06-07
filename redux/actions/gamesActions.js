import axios from 'axios'

const gamesActions = {
    loadGames: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://game-x-arg.herokuapp.com/api/games')
                dispatch({type: 'LOAD_GAMES', payload: response.data.response})
            } catch (error) {             
                console.log(error);
                alert('error en games action')
            }        
        }
    },
    filterGames: (value)=>{
        return (dispatch, getState)=>{
            dispatch({ type: 'FILTER_GAMES', payload: value})
        }
    }
}
export default gamesActions
import axios from 'axios'

const hardwareActions = {
    loadHardwares: () => {
        return async (dispatch, getState) => {
            try {
                console.log("estoy en action")
                const response = await axios.get('https://game-x-arg.herokuapp.com/api/hardware')
                if(response.data.success){
                    dispatch({type: 'LOAD_HARDWARES', payload: response.data.response})
                }else{
                    console.log(response.data.response)
                }
            } catch (error) {             
                console.log(error);
                alert('error en hardware action')
            }        
        }
    },
    getfilteredHardware: (input)=>{
        return(dispatch , getState) =>{
            dispatch({
                type: 'GET_INPUT_VALUE',
                payload: input
            })
        }
    }
}
export default hardwareActions
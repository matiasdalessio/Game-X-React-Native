import axios from 'axios'
// import swal from 'sweetalert'

const host= 'https://game-x-arg.herokuapp.com/'
// const host= 'http://localhost:4000/'

const buyActions = {
    createOrder : (product, token) => {
        return async () => {
            try {
                const respuesta = await axios.post(host+`api/buy`,product, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
                if(!respuesta.data.success){
                    return respuesta.data                   
                }else{
                    return respuesta.data
                }
            } catch(error) {
                console.log(error)
                return console.log("Failed to try to connect with server", "Please try again in a few minutes", "error")
            }           
        }
    },
    loadBuys: (userId, token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(host+`api/buy/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                dispatch({type: 'LOAD_BUYS', payload: response.data.respuesta})
            } catch (error) {             
                console.log(error);
                console.log('error en obtener buys')
            }        
        }
    },
}

export default buyActions
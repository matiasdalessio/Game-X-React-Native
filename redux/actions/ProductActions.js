import axios from "axios"
// import swal from 'sweetalert'

const productActions = {

    addGame: (infoGame, token) => {
        return async () => {
            try {
                const respuesta = await axios.post(`http://localhost:4000/api/games`,infoGame, {
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
                return console.log("Failed to try to connect with server", "Please try again in a few minutes", "error")
            }           
        }
    },
    addHardware: (infoHardware, token) => {
        return async () => {
            try {
                const respuesta = await axios.post(`http://localhost:4000/api/hardware`,infoHardware, {
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
                return console.log("Failed to try to connect with server", "Please try again in a few minutes", "error")
            }           
        }
    },
    
}

export default productActions
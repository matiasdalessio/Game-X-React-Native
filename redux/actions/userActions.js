import axios from "axios"
import Toast from 'react-native-toast-message'
const toastF = (type,title,text,visibilityTime,autoHide,onShow,onHide,onPress)=>{
    return Toast.show({
        type,
        text1:title,
        text2:text,
        visibilityTime,
        autoHide,
        onShow,
        onHide,
        onPress
    })
}
const userActions = {
    logUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post('https://game-x-arg.herokuapp.com/api/user/login', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome back, ${respuesta.data.respuesta.userName}!`
            }catch(error) {
                return toastF('error',"Failed to try to connect with server", "Please try again in a few minutes",2500,true)
            } 
        }
    },
    newUser: (userInfo) => {
        return async (dispatch, getState) => {
           try {
                const respuesta = await axios.post('https://game-x-arg.herokuapp.com/api/user/signup', userInfo)
                if (!respuesta.data.success) {
                    return respuesta.data.error
                }
                dispatch({
                    type: "LOG_USER",
                    payload: respuesta.data.respuesta
                    
                })
                return `Welcome ${respuesta.data.respuesta.userName}!`               
            }catch(error) {
                return toastF('error',"Failed to try to connect with server", "Please try again in a few minutes",2500,true)
            } 
        }
    },
    forcedLoginByLS: (userLS) => {
        return async (dispatch, getState) => {
            try {
                const respuesta = await axios.get('https://game-x-arg.herokuapp.com/api/user/loginLS', {
                headers: {
                    'Authorization': 'Bearer '+userLS.token
                }
            })
                dispatch({type: 'LOG_USER', payload: {
                    ...respuesta.data.respuesta,
                    token: userLS.token
                }})
            } catch(error) {
                if (!error.response) {
                    return toastF('error',"Failed to try to connect with server", "Please try again in a few minutes",2500,true)
                } else if (error.response.status && error.response.status > 399 && error.response.status < 499) {
                    console.log("Invalid Token", "Please Log in again", "error")
                    dispatch({type: 'LOG_OUT', payload: null})
                } 
            }           
        }
    },
    changeRol: (userName, token) => {
        return async () => {
            try {
                const respuesta = await axios.put(`https://game-x-arg.herokuapp.com/api/user/changeRol`,userName, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
                if(!respuesta.data.success){
                    return respuesta.data                   
                }else{
                    return respuesta.data.respuesta.userName
                }
            } catch(error) {
                return toastF('error',"Failed to try to connect with server", "Please try again in a few minutes",2500,true)
            }           
        }
    },
    removeUserInfo: () => {
        return (dispatch, getState) => {
            dispatch({type: 'LOG_OUT'})
        }
    },
    searchUsers: (userName)=>{
        return async(dispatch, getState) => {
            try{
                const token = localStorage.getItem('token')
                const users = await axios.put('https://game-x-arg.herokuapp.com/api/user',{userName},{
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                if(users.data.success){
                    let usersFiltered = []
                    if(users.data.response.length > 0){
                        users.data.response.map(user =>{
                            const {avatar,chats,country,friends,userName,_id, email} = user
                            const userFiltered = {avatar,chats,country,friends,userName,_id, email}
                            usersFiltered.push(userFiltered)
                            return null
                        })
                    }
                        
                    return usersFiltered 
                }else{
                    return ["There are no results for this search"]
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    addToMyList: (sendedData, token, id) => {
        return async (dispatch, getstate) => {
            try {
                const response = await axios.put(`https://game-x-arg.herokuapp.com/api/user/addToList/${id}`, {sendedData}, {
                    headers: {
                    'Authorization': 'Bearer '+token
                    }
                })            
                dispatch({
                    type: "RELOAD_FAVORITES_LIST",
                    payload: response.data.response
                    
                })
                return response.data.response               
            }catch(error) {
                return toastF('error',"Failed to try to connect with server", "Please try again in a few minutes",2500,true)
            } 
        }
    }, 
    getProductsOnList: (id, props) => {
        return async () => {
           try {
            const response = await axios.get(`https://game-x-arg.herokuapp.com/api/user/mylist/${id}`,)   
            return  response.data.response
            } catch {
               return props.push('/serverdown') 
            }
        }
    }, 
    loadNavigation: (navigation)=>{
        return (dispatch,getState)=>{
            dispatch({type:'LOAD_NAVIGATION', payload:navigation})
        }
    }
}

export default userActions
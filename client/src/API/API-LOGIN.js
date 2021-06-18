const axios = require('axios')


const login = async (username, password)=>{
   try {
       const response = await axios.post('/api/login', {username, password})
    if(response.statusText==='OK')
        return response.data     
   } catch (error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx   
       throw (error.response.data.message);
    }
   }            
}

const logout = async ()=>{
    await axios.delete("/api/sessions/current")
}

const getUserName = async (username, password)=>{
    try {
        const response = await axios.get('/api/sessions/current', )
         return response.data     
    } catch (error) {
         if (error.response) {
           // The request was made and the server responded with a status code
           // that falls out of the range of 2xx
           throw(error.response);
         } 
    }
             
 }

const API = {login, logout, getUserName, }
export default API
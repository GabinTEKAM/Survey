const axios = require('axios')


const login = async (username, password)=>{
   try {
       const response = await axios.post('/api/login', {username, password})
    if(response.statusText==='OK')
        return response.data     
   } catch (error) {
    if (error.response) {
       throw (error.response.data.message);
    }
   }            
}

const logout = async ()=>{
    await axios.delete("/api/sessions/current")
}


const API = {login, logout }
export default API
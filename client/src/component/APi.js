import Axios from 'axios'

const Survey = (label)=>{
    Axios.post('/api/survey', {
    }).then(id => id).catch(err=>{ throw (err)})
}

const  API = {Survey}

export default API
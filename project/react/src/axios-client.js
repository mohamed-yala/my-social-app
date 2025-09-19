import axios from 'axios'


const axiosClient =  axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config)=>{
<<<<<<< HEAD
    const token=sessionStorage.getItem('ACCESS_TOKEN')
=======
    const token=localStorage.getItem('ACCESS_TOKEN')
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
    config.headers.Authorization=`Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    return response
},(error)=>{ 
       const {response}=error
   if (response) {
      if (response.status === 401) {
<<<<<<< HEAD
        sessionStorage.removeItem('ACCESS_TOKEN');
=======
        localStorage.removeItem('ACESS_TOKEN');
>>>>>>> 58ab41b7b00d7cfeea4259355541f12053622f46
       
      }
    }
    throw error;
})


export default axiosClient;
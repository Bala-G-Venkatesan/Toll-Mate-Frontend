import axios from "axios";


let AxiosInstance = axios.create({
  baseURL: "https://toll-mate-backend.onrender.com",
});


export default AxiosInstance
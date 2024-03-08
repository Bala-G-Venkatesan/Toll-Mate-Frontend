import axios from "axios";


let AxiosInstance = axios.create({
  baseURL: "https://toll-mate-backend-4.onrender.com/",
});


export default AxiosInstance
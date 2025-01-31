import axios from "axios";
const local = "http://localhost:5000/"
const global = "https://table-sprint-backend.vercel.app/";
export default axios.create({
    baseURL: `${global}api/`
});

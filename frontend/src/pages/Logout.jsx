import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"
const Logout=()=>{
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    const navigate=useNavigate();
    navigate('/login')
    return <></>
}
export default Logout;
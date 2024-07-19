import Forms from "../components/Forms"

function Login({setUser}){
    return <Forms route="getToken/" setUser={setUser} method="login"/>
}

export default Login;
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import apis from '../utils/apis';
import httpAction from '../utils/httpAction';


const Super =()=>{
const [loading,setLoading] = useState(true)
const [isAuth,setIsAuth] = useState(false)
useEffect(()=>{
    const getUserAcess = async()=>{
        const data ={
            url:apis().getAccess
        }
        setLoading(true);
        const result = await httpAction(data);
        setLoading(false);
        console.log(result);
        if(result.status){
            setIsAuth(true);
    }
};
getUserAcess()
},[])
if(loading){
    return <div><p>Loading...</p></div>
};
if(!isAuth){
    return <Navigate to="/login" />
}else{
    return <div>
        <h1>Super Component</h1>
        <Outlet />
    </div>
}
}
export default Super;


import { useEffect,useState } from 'react'
import { Avatar,Button } from '@mui/material'
import { Logout } from '@mui/icons-material'
import useGeneral from '../hooks/useGeneral'
import httpAction from '../utils/httpAction.js'
import apis from '../utils/apis.js'
// import { Navigate } from 'react-router-dom'




const Profile = () => {
  const [user,setUser] = useState("")
  useEffect(()=>{
    const getUser =async()=>{
      const data={
      url:apis().userProfile,
    }
    
    const result = await httpAction(data)
  if (result?.status){
    setUser(result?.user);
  }

    }
    getUser();
  },[]
  )
    const {navigate} = useGeneral();
    const logoutHander = async()=>{
      const data={
        url:apis().logout
      }
      const result = await httpAction(data);
      if (result?.status){
        navigate('/login');
      }
    }
  return (
    <div className='auth_card'>
        <div className='profile_container'>
            <span className='name'>
              <Avatar sx={{backgroundColor: 'orangered', textTransform:'capitalize'}}>
                {/* {user?.substring(0,1)} */}
                </Avatar></span> 
          <div>  <span className='full_name'>{user?.name}</span></div>
<span className='email'>{user?.email}</span>
</div>
<div className='action'>
<Button variant='contained' 
type='submit'
 endIcon={<Logout/>}
 fullWidth
  onClick={logoutHander}>
                        Logout
      </Button>
</div>
      
    </div>
  )
}

export default Profile

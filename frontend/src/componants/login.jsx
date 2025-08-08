import React, { useState } from 'react'
import { IoIosLogIn } from "react-icons/io";
import * as Yup from 'yup'
import { Formik,Form} from 'formik'
import { Visibility,VisibilityOff,ArrowBack} from '@mui/icons-material'
import { TextField,Button,InputAdornment,IconButton } from '@mui/material'
import useGeneral from '../hooks/useGeneral'
import apis from '../utils/apis.js'
import httpAction from '../utils/httpAction.js'


const Login = () => {
    const [visible,setVisible] = useState(false)
    const {navigate} = useGeneral()

    const visibleHandler = () => {
        setVisible(!visible)
    }
    const initialState = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })
    const submitHandler = async(values) => {
// console.log(values)
const data={
    url:apis().loginUser,
    method: "POST",
    body: values
}
    const result = await httpAction(data);
    console.log(result);
    navigate("/")
    };
    

  return (
    <div className='auth_card'>
        <Formik onSubmit={submitHandler} validationSchema={validationSchema} initialValues={initialState}>
            {({handleBlur,handleChange,values,errors,touched})=>{
                return (
                <Form>
              <div className='container_fluid'>
            <div className='row g-3'>
                <div className='col-12 auth_header'>
                    <IoIosLogIn  />
                    <p>WelcomeBack</p>
                    <span>Login TO Continue</span>
                </div>
                <div className='col-12'>
                    <TextField
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    
                     name='email'
                      label='Your Email'
                     fullWidth size='small' />
                </div>
                <div className='col-12'>
                    <TextField
                         InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                              <IconButton edge="end" onClick={visibleHandler}>
                                  {visible ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                              </InputAdornment>
                          )
                      }}
                     onChange={handleChange}
                      onBlur={handleBlur}
                     error={touched.password && Boolean(errors.password)}
                     helperText={touched.password && errors.password}
                      name='password'
                       label='Your Password'
                       type={visible ? 'text' : 'password'}
                     fullWidth size='small' />
                </div>
                <div className='col-12'>
                    <Button variant='contained' type='submit' fullWidth>
                        Login
                    </Button>
                </div>
                
                     <div className='col-12'>
                        <Button variant='outlined' fullWidth startIcon={<ArrowBack/>} 
                        onClick={()=>navigate('/register')}>
                         create new account
                        </Button>
                        </div>
                        
            </div>
        </div>
                </Form>
                )
            }}
        </Formik>
        

      
    </div>
  )
}

export default Login

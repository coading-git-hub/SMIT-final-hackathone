import React, { useState } from 'react'
import {TextField,Button,InputAdornment,IconButton} from '@mui/material'
import { Formik,Form } from 'formik'
import * as Yup from 'yup'
import { IoPersonAddSharp } from "react-icons/io5";
import { Visibility,VisibilityOff, ArrowBack } from '@mui/icons-material'
import useGeneral from '../hooks/useGeneral'
import apis from '../utils/apis.js'
import httpAction from '../utils/httpAction.js'
import toast from 'react-hot-toast';


const Register = () => {
    const [visible,setVisible] = useState(false)
    const visibleHandler = () => {
        setVisible(!visible)
    }
    const initialState ={
        name: "",
        email:"",
        password:""
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    })
    const {navigate} = useGeneral()
    const submitHandler = async(values) => {
        // console.log(values)
        const data={
            url:apis().registerUser,
            method: "POST",
            body: values
        }

        const result = await httpAction(data);
        if (result?.status){
            toast.success(result?.message);
            navigate('/login');
        }

    }
  return (
    <div className='auth_card'>
        <Formik onSubmit={submitHandler} 
        validationSchema={validationSchema} 
        initialValues={initialState}>
            {({handleBlur,handleChange,values,errors,touched}) => {
                return (
                <Form>
                <div className='container_fluid'>
                    <div className='row g-3'>
                        <div className='col-12 auth_header'>
                        <IoPersonAddSharp />
                        <p>Create New Account</p>
                        <span>signup to continue</span>
                        </div>
                        <div className='col-12'>
                            <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            name='name'
                            label='Your Name'
                            fullWidth size='small'
                            />
                        </div>
                        <div className='col-12'>
                            <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            name='email'
                            label='Your Email'
                            fullWidth size='small'
                            />
                        </div>
                        <div className='col-12'>
                            <TextField
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            name='password'
                            type={visible ? 'text' : 'password'}
                            label='Your Password'
                            fullWidth size='small'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={visibleHandler}>
                                            {visible ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </div>
                        <div className='col-12'>
                            <Button variant='contained' type='submit' fullWidth>
                                Register
                            </Button>
                        </div>
                        
                             <div className='col-12'>
                                <Button startIcon={<ArrowBack />} variant='outlined' fullWidth onClick={()=>navigate('/login')}>
                                back to login
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

export default Register

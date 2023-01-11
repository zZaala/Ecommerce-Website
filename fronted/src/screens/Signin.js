import { Alert, Button, Grid, TextField } from "@mui/material"
import { Box } from "@mui/material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useContext, useEffect, useState } from "react"
import { Store } from '../store';
import { Helmet } from "react-helmet-async"


function Signin() {
    const [error,setError]=useState({
      status:false,
      msg:"",
      type:""
    })
    const {search}=useLocation()
    const redirectInUrl=new URLSearchParams(search).get('redirect')
    const redirect =redirectInUrl?redirectInUrl:'/'
    const [email,setEmail]=useState("")    
    const [password,setPassword]=useState("")    
    const {state,dispatch}=useContext(Store)
    const {UserInfo}=state
    const navigate=useNavigate()

    const submitHandler=async(e)=>{
    e.preventDefault()
    const Formdata=new FormData(e.currentTarget)
    const actualData={
      email:Formdata.get("email"),
      password:Formdata.get("password"),
    }
    try {
      const {data}=await axios.post("/userLogin",actualData)
      dispatch({
        type:"USER_SIGIN",payload:data
      })
      localStorage.setItem("UserInfo",JSON.stringify(data))
      navigate(redirect || "/")
    } catch (error) {
      setError({status:true,msg:"Password and Email is Invalid",type:'error'})
    }
   }
   useEffect(()=>{
    if(UserInfo){
      navigate(redirect)
    }
   },[navigate,redirect,UserInfo])

  return (
    <>
     <Helmet>
       <title>SignInp</title>
      </Helmet>
      <Grid  container spacing={4} justifyContent="center" sx={{width:"100",mt:8}}>
          <Box onSubmit={submitHandler}  border={1} borderColor='divider' sx={{p:3}} textAlign='center' component='form' id='signin_form'>
            <h1>Sign-in</h1>
            <TextField margin="normal" label="Email" required id="email" onChange={(e)=> setEmail(e.current.value)} name="email" fullWidth />
            <TextField margin="normal" label="password" required id="password" name="password" onChange={(e)=> setPassword(e.current.value)} type="password" fullWidth />
          <Box sx={{m:3}} textAlign='center'>
            <Button type="submit" variant="contained" color='warning'>Sign In</Button>
          </Box>
           New User ?<Link to={`/signup?redirect=${redirect}`}> Create Your Account</Link>
           { error.status?<Alert severity={error.type}>{error.msg}</Alert>:" "}
          </Box>
      </Grid>

    </>
  )
}

export default Signin

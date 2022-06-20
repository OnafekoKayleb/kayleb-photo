import React, { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {update2} from '../Redux/authSlice'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const {name, email, password, password2} = formData

  const handleSubmit = async(e) => {
    e.preventDefault()
      if(password!==password2){
        toast.error('password does not match')
      }
      if(!email && !password && !name){
        toast.error('pls input all fields')
      }
      try {
        const res = await axios.post('https://kayleb-photo.herokuapp.com/api/users/register', formData )
        console.log(res)
        if (res.data){
          localStorage.setItem('user', JSON.stringify(res.data))
          dispatch(update2(JSON.parse(localStorage.getItem('user'))))
          navigate('/')
        }
      } catch (error) {
        console.log(error);
        if(error.message === 'Network Error'){
          toast.error('pls check your internet connection')
        }
        if(error.response.data.message && error.response.data.message === "Email already exist"){
          toast.error('Email already exist')
        }
      }
  
  }


  return (
    <>
      <div className="login">
          <h1>please login to start using our service</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" 
              placeholder='pls input username'
              name='name'
              value={name}
              onChange= {onChange}
              />
              <input type="email" 
              placeholder='pls input email'
              name='email'
              value={email}
              onChange= {onChange}
              />
              <input type="password" 
              placeholder='pls input password'
              name='password'
              value={password}
              onChange= {onChange}
              />
              <input type="password" 
              placeholder='pls confirm password'
              name='password2'
              value={password2}
              onChange= {onChange}
              />
              

              <button
              type='submit'
              style={{cursor: "pointer"}}
              >Register</button>
          </form>
      </div>
    </>
  )
}

export default Register
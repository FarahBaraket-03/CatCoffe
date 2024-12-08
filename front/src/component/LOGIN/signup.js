import React, { useState } from 'react';
import user from './img/person.png';
import email from './img/email.png';
import password from './img/password.png';
import "./loginsign.css"
import { useNavigate} from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {FaEyeSlash , FaEye} from 'react-icons/fa'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";



export default function Signup (props){

const navigate=useNavigate()
const [Clair,setClair]=useState(false)
const handleclair=()=>{setClair(!Clair)}

const schema=yup.object().shape({
    name:yup.string().required('name is required').min(3).max(45),
    email:yup.string('is not email right form').required('email is required').email("is not right form "),
    password:yup.string().required('password is required').min(4).max(20)
});
const {handleSubmit,register,formState:{errors}}=useForm({resolver:yupResolver(schema)});

  const handleForm = (data) => {
    Axios.post("http://localhost:6001/auth/register/"+data.name+"/"+data.email+"/"+data.password)
    .then(res=>{
        if(res.data.status){Swal.fire(res.data.message," ","success");
            props.setbtn(false);
            window.localStorage.setItem("UserId", res.data.idUser);
            window.localStorage.setItem("UserEmail", data.email);
            window.localStorage.setItem("UserName", data.name);
            navigate('/')}
            else {if (!res.data.status){Swal.fire(res.data.message,"", "error");}
        }
    }).catch((error)=>alert(error))      
        }

    return (<div >
    <form  onSubmit={handleSubmit(handleForm)}>
    <div className="all" >    
    <div className={'contain1'}>
            <div className='header1'>
            <div className='text1'> Sign Up</div>
            <div className='underline1'></div>
            </div>
 

            <div className='inputs1'> 
                <div className='input1'>
                <img src={user} alt=""></img>
                <input  type="text" placeholder='Enter your full name *'  name="name" {...register("name")} style={{color:' #121312'}}/>
                </div>
                <span style={{color:'rgb(255, 0, 0)' ,marginLeft:'111px',marginTop:'-23px'}}>{errors.name?.message}</span>

                <div className='input1'>
                <img src={email} alt=""></img>
                <input  type="email"  required placeholder=' Enter email *' name="email" {...register("email")} style={{color:' #121312'}}/>
                </div>
                <span style={{color:'rgb(255, 0, 0)' ,marginLeft:'111px',marginTop:'-23px'}}>{errors.email?.message}</span>

          

                <div className='input1'>
                <img  src={password} alt="" ></img>
                 <input  type={Clair?"text":"password"}  placeholder='Enter password *'  name='password' {...register("password")} style={{color:' #121312'}}/>
                {Clair?<FaEye  style={{marginRight:'20px'}} size={25} onClick={handleclair}/>:<FaEyeSlash  size={25} style={{marginRight:'20px'}} onClick={handleclair}/>}

                 </div>
                 <span style={{color:'rgb(255, 0, 0)' ,marginLeft:'111px',marginTop:'-23px'}}>{errors.password?.message}</span>
                 </div>
 

          <div  className='submit-container1'>
          <button className="submit1"  >Sign Up</button>
          <button className="submit1 gray1" onClick={()=>props.setbtn(true)}>Sign in</button>
        </div>
       </div></div>
        </form>
        </div>
)
}


import {useState } from 'react';
 import email from './img/email.png';
import password from './img/password.png';
import "./loginsign.css"
import { useNavigate ,Link} from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {FaEyeSlash , FaEye} from 'react-icons/fa'
import cat from "../../assets/cat.png"


export default function Signin (props){

const [isAdmin, setIsAdmin] = useState(false);
const handleAdmin = () => {
    // Use a prompt to ask for the admin password
    const usercode =  prompt("Enter Code Name :");
    const userpasw = prompt("Enter Admin Password:");
    Axios.get("http://localhost:6001/auth/admin/"+usercode+"/"+userpasw).then((res)=>{
        if(res.data.status){
            Swal.fire(res.data.message);
            setIsAdmin(true);
            navigate('/admin/menu');
        }
        else{
            Swal.fire({
                imageUrl:cat,
                title:"Can't enter"
            })
            navigate('/auth')
        };
    })
  };
const [Clair,setClair]=useState(false);
const navigate=useNavigate();
const schema = yup.object().shape({
    email: yup.string().required('Email is required').email("Invalid email format"),
    password: yup.string().required('Password is required').min(4, "Password should be at least 4 characters").max(20, "Password cannot exceed 20 characters")
});
const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
const handleclair=()=>{setClair(!Clair)}
const handlForm = async (data) => {
        try {
                    const response = await Axios.get("http://localhost:6001/auth/login/"+data.email+"/"+data.password);
                    if (response.data.status) {
                        console.log(response);
                       Swal.fire("Login Successful!", "", "success");
                       window.localStorage.setItem("UserId", response.data.id);
                       window.localStorage.setItem("UserEmail", data.email);
                       window.localStorage.setItem("UserName", response.data.name);
                       navigate('/');
                    } else {
                      Swal.fire("Login Failed", response.data.message, "error");
                    }
                    }
                    catch (error) {
                    console.error("Error during the request:", error);
                    Swal.fire("An error occurred", "", "error");
                }
        };
 

return (<div>
<form onSubmit={handleSubmit(handlForm)} >
    <div className="all" >    
    <div className={'contain1'}>
            <div className='header1'>
            <div className='text1' >Sign in</div>
            <div className='underline1'></div>
            </div>

            <div className='inputs1'>
                <div className='input1' >
                <img src={email} alt=""></img>
                <input  type="email"  placeholder=' Enter email *' name="email"  style={{color:' #121312'}} {...register("email")}/>
                </div>
                <span style={{color:'rgb(255, 0, 0)' ,marginLeft:'111px',marginTop:'-23px'}}>{errors.email?.message}</span>
                <div className='input1'>
                <img  src={password} alt=""></img>
                <input  type={Clair?"text":"password"}  placeholder='Enter password *'  name='password' {...register("password")} style={{color:' #121312'}}/>
                {Clair?<FaEye  style={{marginRight:'20px'}} size={25} onClick={handleclair}/>:<FaEyeSlash  size={25} style={{marginRight:'20px'}} onClick={handleclair}/>}

                 </div>
                 <span style={{color:'rgb(255, 0, 0)' ,marginLeft:'111px',marginTop:'-23px'}}>{errors.password?.message}</span>
                 </div>
                 <div className='admin'>
                    <Link to="/fgp"><p className=''>forget password ?</p></Link>
                 <span><Link className="nav-link text-secondary" to="admin" onClick={handleAdmin} >are you admin ? </Link></span>
                 </div>


        <div  className='submit-container1'>
        <button className={"submit1 gray1"} onClick={()=>props.setbtn(false)}  >Sign Up</button>
        < button className={"submit1" }>Sign in</button>
        </div>
       </div></div>
        </form></div>
    
)
}


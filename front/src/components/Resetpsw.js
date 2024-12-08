import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import cat from "../resources/s.png";
import { Link } from "react-router-dom";



const Resetpsw=()=>{

    const schema = yup.object().shape({
        email: yup.string().required('Email is required').email("Invalid email format"),
        password: yup.string().required('Password is required').min(4, "Password should be at least 4 characters").max(20, "Password cannot exceed 20 characters")
    });
    const change=(email,psw)=>{
        axios.put("http://localhost:6001/auth/update/"+email+"/"+psw).then((res)=>{
            console.log(res.data);
            Swal.fire(
                res.data.message 
                );
        })
    }
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
    const handleForm=(data)=>{
      change(data.email,data.password);    
    }

    return(
<div className="bg-light py-3 py-md-5">
  <div className="container">
    <div className="row justify-content-md-center">
      <div className="col-12 col-md-11 col-lg-8 col-xl-7 col-xxl-6">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm">
          <div className="row gy-3 mb-3">
            <div className="col-12">
              <div className="text-center">
                  <img src={cat} alt="Logo" />
              </div>
            </div>
            <div className="col-12">
              <h2 className="fs-6 fw-normal text-center text-secondary m-0 px-md-5">Provide the email address associated with your account to recover your password.</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleForm)}>
            <div className="row gy-3 gy-md-4 overflow-hidden">
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
                  <input type="email" className="form-control" name="email" id="email"  {...register("email")} />
                </div>
                <br></br>
                <span className="text-danger">{errors.email?.message}</span>
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Password <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                    </svg>
                  </span>
                  <input type="password" className="form-control" name="password" id="password"  {...register("password")} />
                </div>
                <br></br>
                <span className="text-danger">{errors.password?.message}</span>
              </div>
              <div className="col-12">
                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit">Reset Password</button>
                </div>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-12">
              <hr className="mt-5 mb-3 border-secondary-subtle" />
              <div className="d-flex gap-4 justify-content-center">
                <Link to="/auth" className="link-secondary text-decoration-none">Log In</Link>
                <Link to="/sign" className="link-secondary text-decoration-none">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> )
}
export default Resetpsw;
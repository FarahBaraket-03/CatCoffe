import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CatCardForm from "./CatCardForm";


const CatAdmin=()=>{

    const [cats,setcats]=useState([]);

    const schema = yup.object().shape({
        name: yup
          .string()
          .required("Nom de cat is required")
          .min(3, "Nom de cat must be at least 3 characters")
          .max(45, "Nom de cat cannot exceed 45 characters"),
        type: yup
          .string()
          .required("Type is required (female or male)")
          .matches(/^(female|male)$/, "Type must be 'female' or 'male'"),
        image: yup
          .string()
          .required("Nom d'image is required")
          .min(3, "Image name must be at least 3 characters")
          .max(45, "Image name cannot exceed 45 characters"),
        age: yup
          .number()
          .required("age is required")
          .min(1, "age must be at least 1")
          .max(10, "age cannot exceed 10,000"),
        description: yup
        .string()
        .required("description is required")
        .min(3, "description must be at least 3 characters")
        .max(75, "decription cannot exceed 75 characters"),
        dop: yup
        .boolean()
        .required("Adoption status is required"),
      });
    
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({ resolver: yupResolver(schema) });
    
      const handleForm = (data) => {
        axios
          .post(`http://localhost:6001/catadmin/chat/add`, data)
          .then((res) => {
            if (res.data.status) {
              Swal.fire("cat added successfully", "", "success");
            }
          })
          .catch((err) => {
            Swal.fire("Error adding cat", err.message, "error");
          });
      };
    
    
    useEffect(()=>{
        axios.get("http://localhost:6001/catadmin/chat/all").then((res)=>{
            console.log(res.data);
            if(res.data.status){
                console.log(res.data.data)
                setcats(res.data.data);
            }
        })
    })

    return(<>
    <div className="mt-4">
        <h1 className="fw-bold border-bottom border-3 border-dark-subtle p-1 d-flex justify-content-between"><span>Our Cats</span> 
            <span className="ms-5"><button className="btn btn-outline-success ms-5" data-bs-toggle="modal"
              data-bs-target='#addcat'>+</button></span>
        </h1>
        <div className="row d-flex justify-content-around align-items-center gy-2  mt-5">
            {cats.map((item)=>{
                return(
                    <CatCardForm cat={item}/>
                )
            })}
        </div>
    </div>  




    {/* MODAL DE FORM */}
      <div
        className="modal fade"
        id="addcat"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                add menu
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(handleForm)}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom (e.g., Namnam)"
                    {...register("name")}
                  />
                  <span className="text-danger">{errors.name?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="gender (female or male)"
                    {...register("type")}
                  />
                  <span className="text-danger">{errors.type?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image name"
                    {...register("image")}
                  />
                  <span className="text-danger">{errors.image?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="age"
                    {...register("age")}
                    
                  />
                  <span className="text-danger">{errors.age?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    {...register("description")}
                   
                  />
                  <span className="text-danger">{errors.description?.message}</span>
                </div>
                <div className="mb-3">
                <label> Adoption Status:
                    <select {...register("dop")}>
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                        </select>
                    </label>
                  <span className="text-danger">{errors.dop?.message}</span>
                </div>
                <button type="submit" className="btn btn-primary">
                  add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </>)

}

export default CatAdmin;
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MenuCardForm from "./MenuCardForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const MenuAdmin=()=>{

    const [menu,setmenu]=useState([]);

    const schema = yup.object().shape({
        name: yup
          .string()
          .required("Nom de menu is required")
          .min(3, "Nom de menu must be at least 3 characters")
          .max(45, "Nom de menu cannot exceed 45 characters"),
        type: yup
          .string()
          .required("Type is required (drink or food)")
          .matches(/^(food|drink)$/, "Type must be 'food' or 'drink'"),
        image: yup
          .string()
          .required("Nom d'image is required")
          .min(3, "Image name must be at least 3 characters")
          .max(45, "Image name cannot exceed 45 characters"),
        price: yup
          .number()
          .required("Price is required")
          .min(1, "Price must be at least 1")
          .max(10000, "Price cannot exceed 10,000"),
      });
    
      const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({ resolver: yupResolver(schema) });
    
      const handleForm = (data) => {
        axios
          .post(`http://localhost:6001/menuadmin/menu/add`, data)
          .then((res) => {
            if (res.data.status) {
              Swal.fire("Menu addes successfully", "", "success");
            }
          })
          .catch((err) => {
            Swal.fire("Error adding menu", err.message, "error");
          });
      };
    
    
    useEffect(()=>{
        axios.get("http://localhost:6001/menuadmin/menu/all").then((res)=>{
            console.log(res.data);
            if(res.data.status){
                console.log(res.data.data)
                setmenu(res.data.data);
            }
        })
    })

    return(<>
    <div className="mt-4">
        <h1 className="fw-bold border-bottom border-3 border-dark-subtle p-1 d-flex justify-content-between"><span>Our Menu</span> 
            <span className="ms-5"><button className="btn btn-outline-success ms-5" data-bs-toggle="modal"
              data-bs-target='#addmenu'>+</button></span>
        </h1>
        <div className="row d-flex justify-content-around align-items-center gy-2  mt-5">
            {menu.map((item)=>{
                return(
                    <MenuCardForm menu={item}/>
                )
            })}
        </div>
    </div>  




    {/* MODAL DE FORM */}
      <div
        className="modal fade"
        id="addmenu"
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
                    placeholder="Nom (e.g., cookies)"
                    {...register("name")}
                  />
                  <span className="text-danger">{errors.name?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type (drink or food)"
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
                    placeholder="Price"
                    {...register("price")}
                  />
                  <span className="text-danger">{errors.price?.message}</span>
                </div>
                <button type="submit" className="btn btn-success">
                  add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>  
    </>)

}

export default MenuAdmin;
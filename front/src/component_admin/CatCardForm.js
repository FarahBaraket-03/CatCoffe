import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CatCardForm = (props) => {
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
      .put(`http://localhost:6001/catadmin/chat/update/${props.cat.id_chat}`, data)
      .then((res) => {
        if (res.data.status) {
          Swal.fire("cat updated successfully", "", "success");
        }
      })
      .catch((err) => {
        Swal.fire("Error updating menu", err.message, "error");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:6001/catadmin/chat/delete/${id}`).then((res) => {
      if (res.data.status) {
        Swal.fire("Delete success", "", "success");
      }
    });
  };

  return (
    <div className="col-lg-3 col-md-5 col-sm-12">
      <div className="card w-75">
        <img
          src={`${process.env.PUBLIC_URL}/resource/cats/${props.cat.image}`}
          className="card-img-top h-50"
          alt={props.cat.nom}
        />
        <div className="card-body">
          <h5 className="card-title">{props.cat.nom}</h5>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-outline-primary fs-6"
              data-bs-toggle="modal"
              data-bs-target={`#cat${props.cat.id_chat}`}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger fs-6"
              onClick={() => handleDelete(props.cat.id_chat)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE FORM */}
      <div
        className="modal fade"
        id={`cat${props.cat.id_chat}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update {props.cat.nom}
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
                    defaultValue={props.cat.nom}
                  />
                  <span className="text-danger">{errors.name?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="gender (female or male)"
                    {...register("type")}
                    defaultValue={props.cat.gender}
                  />
                  <span className="text-danger">{errors.type?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image name"
                    {...register("image")}
                    defaultValue={props.cat.image}
                  />
                  <span className="text-danger">{errors.image?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="age"
                    {...register("age")}
                    defaultValue={props.cat.age}
                  />
                  <span className="text-danger">{errors.age?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    {...register("description")}
                    defaultValue={props.cat.description}
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
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCardForm;
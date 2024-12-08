import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const MenuCardForm = (props) => {
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
      .put(`http://localhost:6001/menuadmin/menu/update/${props.menu.id_menu}`, data)
      .then((res) => {
        if (res.data.status) {
          Swal.fire("Menu updated successfully", "", "success");
        }
      })
      .catch((err) => {
        Swal.fire("Error updating menu", err.message, "error");
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:6001/menuadmin/menu/delete/${id}`).then((res) => {
      if (res.data.status) {
        Swal.fire("Delete success", "", "success");
      }
    });
  };

  return (
    <div className="col-lg-3 col-md-5 col-sm-12">
      <div className="card w-75">
        <img
          src={`${process.env.PUBLIC_URL}/resource/img/${props.menu.image}`}
          className="card-img-top h-50"
          alt={props.menu.nom_menu}
        />
        <div className="card-body">
          <h5 className="card-title">{props.menu.nom_menu}</h5>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-outline-primary fs-6"
              data-bs-toggle="modal"
              data-bs-target={`#Menu${props.menu.id_menu}`}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger fs-6"
              onClick={() => handleDelete(props.menu.id_menu)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DE FORM */}
      <div
        className="modal fade"
        id={`Menu${props.menu.id_menu}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update {props.menu.nom_menu}
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
                    defaultValue={props.menu.nom_menu}
                  />
                  <span className="text-danger">{errors.name?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type (drink or food)"
                    {...register("type")}
                    defaultValue={props.menu.type}
                  />
                  <span className="text-danger">{errors.type?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image name"
                    {...register("image")}
                    defaultValue={props.menu.image}
                  />
                  <span className="text-danger">{errors.image?.message}</span>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    {...register("price")}
                    defaultValue={props.menu.price}
                  />
                  <span className="text-danger">{errors.price?.message}</span>
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

export default MenuCardForm;

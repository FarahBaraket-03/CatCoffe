import { useEffect, useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import person from './LOGIN/img/person.png';
import email from './LOGIN/img/email.png';
import password from './LOGIN/img/password.png';
import { BiSolidCoffeeTogo} from "react-icons/bi";
import { useAuth } from "./AuthContext";
import Axios from 'axios';
import Swal from 'sweetalert2';
import cat from '../assets/im4/a.jpg';

function Example(props) {
  const refname=useRef()
  const refemail=useRef()
  const refpassword=useRef();

    const { user, setUser} = useAuth();
    const [originalValues, setOriginalValues] = useState({ name: user.name, email: user.email });
    useEffect(() => {
    setOriginalValues({ name: user.name, email: user.email});
    }, []);
    const [values, setValues] = useState({ name: "", email: "", password: "" });
    const handle = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value.trim() }));
    };

    const handleClose = () => {
        props.onHide();
    };
    const reset=()=>{
      refname.current.value = '';
      refemail.current.value = '';
      refpassword.current.value='';
    }

    const handleUpdate = (e) => {
        e.preventDefault();
         // const validationErrors = Validation(values); valider avec expression reguliere
         //const hasChanges = Object.values(values).some(value => value!== ""); : ynjm ykoun d5lhom lkol nfshom nooooooo
         // !! au moins ybdl champ w lo5rin 3adi kn 3dhom nfshom
         const hasChanges = Object.keys(values).some(key =>( values[key]!=="" && values[key]!== originalValues[key]));
         if (hasChanges) {
            // Créez un objet vals avec uniquement les champs modifiés
                const vals = {
                ID: window.localStorage.getItem("UserId"),
                USER: values.name || user.name, // Utilisez la valeur actuelle si non modifiée
                PASS: values.password ,
                EMAIL: values.email || user.email
                };
         
            // Affichez les valeurs dans console
            console.log("ID:", vals.ID);
            console.log("USER:", vals.USER);
            console.log("PASS:", vals.PASS);
            console.log("EMAIL:", vals.EMAIL);

            Axios.post("http://localhost:6001/auth/update", vals)
                .then(res => {
                    if (res.data.status) {
                        Swal.fire(res.data.message, "", "success");
                        setUser(vals);
                        reset();
                        setValues({ name: "", email: "", password: "" });

                        ;
                    } else{
                        Swal.fire(res.data.message, "", "error");
                    }
                })
                .catch((error) => console.log(error));
        } else {
            Swal.fire({
                title: 'Validation Error',
                text: "Please modify at least one field.",
                imageUrl: cat,
                imageWidth: 150,
                imageHeight: 150,
                confirmButtonText: 'OK'
            });
        }
       };
 
  return (
    <>
      <Modal {...props} size="lg" backdrop='static' centered>
      {/* BiSolidCat */}
        <Modal.Header closeButton>
           < BiSolidCoffeeTogo size={50}/> <h4 className="mt-3">Update your profile<br/></h4>
        </Modal.Header>
        <Modal.Body>


        <div  style={{position:"relative" ,color:'white',fontFamily:"cursive",fontSize:"20px",backgroundColor:"#aeb014"}}>
            <ul className="d-flex flex-column justify-content-center align-items-center">
              <li>Your name :   {user.name}</li>
              <li>Your email :  {user.email}</li>
            </ul>
           </div>


               <div className='inputs' >
                <div className="col-12">
                <label htmlFor="email" className="form-label">User Name <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                  <img src={person} alt="person" className='img img-fluid' height={16}></img>
                  </span>
                  <input type="text" className="form-control" name="name" id="name"  onChange={handle} ref={refname} />
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                  <img src={email} alt="email"></img>
                  </span>
                  <input type="email" className="form-control" name="email" id="email" ref={refemail} onChange={handle} />
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="psw" className="form-label">Password <span className="text-danger">*</span></label>
                <div className="input-group">
                  <span className="input-group-text">
                  <img  src={password} alt="pasw"></img>
                  </span>
                  <input type="password" className="form-control" name="password" id="psw" ref={refpassword} onChange={handle} />
                </div>
              </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
            Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}

export default Example;
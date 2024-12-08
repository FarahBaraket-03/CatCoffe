import {useEffect, useState}from "react";
import ReviewCard from "./ReviewCard"; // Assurez-vous que ce composant est compatible avec Bootstrap
import cat from "../assets/im4/nocat.jpg"
import cat1 from "../resources/emptybox.jpg";
import Button from "./Button"
import { useAuth } from "./AuthContext";
import Comment from "./commentaire";
import Swal from 'sweetalert2';
import Axios from "axios"


const Review = () => {
const { user} = useAuth();
const [show, setShow] = useState(false);
const [DATA,setdata]=useState([]);
const [nbclient,setnbclient]=useState(0);
const [nbchat,setnbchat]=useState(0);
const [load,isLoading]=useState(true);

const handleAdd=()=>
{
  if (user.id != undefined){setShow(true);}
  else{ Swal.fire({
     text: "You have to sign in first",
    imageUrl: cat,
    imageWidth: 160,
    imageHeight: 160,
    confirmButtonText: 'OK'});
     }
}


useEffect(() =>{
  Axios.get("http://localhost:6001/com/getcomment").then(res=>{
   if (res.data.status){ setdata(res.data.message)}
  }).catch(err=>{console.log(err)});
  Axios.get("http://localhost:6001/auth/getnbclient").then(res=>{
    if (res.data.status){setnbclient(res.data.message)}}).catch(err=>{console.log(err)});
    Axios.get("http://localhost:6001/cat/getnbchat").then(res=>{
      if (res.data.status){setnbchat(res.data.message)}}).catch(err=>{console.log(err)});

    isLoading(false);
},[])

  return (
    // <div className="min-vh-100 d-flex flex-column justify-content-center bg-backgroundColor p-5">
    <div className="justify-content-center text-light  p-5" style={{backgroundColor:" #1f1a1a",marginBottom:"200px"}}>
        <h5 className="font-weight-bold text-center display-4 mt-5" style={{color:"white" , fontfamily: "PT Serif",letterSpacing:"1px"}}>
          Customer's Reviews
        </h5>

        {load ?
          (<div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p>Loading comments section ...</p>
            </div>):
          (
            <>
            <div className="d-flex flex-column flex-lg-row justify-content-center py-5 my-4" style={{ position: 'relative', left: "35px" }}>
        {DATA.length > 0 ? (DATA.map((data, index) => (
        <div className="col-lg-4 col-md-6 mb-4" key={index}>
         <ReviewCard comment={data.comments} react={data.reaction} title={data.username} />
        </div>))) : 
        (<div className="d-flex flex-column"> <p className="text-center text-white">No comments available.</p>
        </div>)}
        </div>
           <div className="row counter-row" style={{position :'relative'}}>
						<div className="col-lg-3 col-md-6 col-sm-12 single-counter">
							<center><h1 className="counter">{nbclient}</h1>
							<p>Our  client </p>
						</center></div>
						<div className="col-lg-3 col-md-6 col-sm-12 single-counter">
							<center><h1 className="counter">{nbchat}</h1>
							<p>Our cats</p>
						</center></div>
             <div className="col-lg-3 col-md-6 col-sm-12 single-counter " style={{marginTop:'20px'}}>
              <button onClick={handleAdd} style={{backgroundColor:"transparent" , border:"none"}}><Button title="Add your comment"/></button>
              <Comment show={show} id={user.id} name={user.name} onHide={()=>setShow(false)}/>
							</div>		
					</div>
            </>
          )
        }

    </div>
  );
};

export default Review;
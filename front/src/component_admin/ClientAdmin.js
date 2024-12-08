import Axios from 'axios';
import Swal from "sweetalert2";
import {useState,useEffect} from "react";
import cat from "../resources/emptybox.jpg";
const ClientAdmin=()=>{
    const [hist,setHist]=useState(null);
    const handeldelete=(id)=>{
        Axios.delete(`http://localhost:6001/clientadmin/delete/${id}`).then((res) => {
            console.log(id);
            if (res.data.status) {
              Swal.fire("Delete success", "", "success");
            }
          });
    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        Axios.get("http://localhost:6001/clientadmin/all")
        .then((res)=>{
            if(res.data.status){
                console.log(res.data.data)
            setHist(res.data.data);}
            setIsLoading(false);
        });
    },[hist])
    return(
        <>
        <div class="container">
        <h1 className="fw-bold border-bottom border-3 border-dark-subtle p-1 d-flex justify-content-between mt-4 mb-3"><span>Clients</span>
        </h1>
        { isLoading ? (
            <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p>Loading clients ...</p>
            </div>
        ) :
        hist.length==0 ? (<div className='text-center'>
            <img src={cat} alt="cat" className='img-fluid w-25'/>
            <p className='text-secondary'>None Clients</p>
        </div>) :
        
        (<div class="table-responsive mt-3">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr className='table_titre'>
                        <th>N°</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {hist.map((item,index)=>{
                        return(<tr key={index}>
                            <td>{index +1 }</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td><button className='btn btn-danger' onClick={()=>handeldelete(item.ID)}>x</button></td>
                        </tr>)
                    })} 
                </tbody>
            </table>
        </div>)
        }
    </div>
        </>
    )
}

export default ClientAdmin;
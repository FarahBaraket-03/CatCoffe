import Axios from 'axios';
import Swal from "sweetalert2";
import {useState,useEffect} from "react";
import cat from "../resources/emptybox.jpg";
const ResAdmin=()=>{
    const [hist,setHist]=useState(null);
    const handeldelete=(id)=>{
        Axios.delete(`http://localhost:6001/resadmin/delete/${id}`).then((res) => {
            if (res.data.status) {
              Swal.fire("Delete success", "", "success");
            }
          });
    }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        Axios.get("http://localhost:6001/resadmin/all")
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
        <h1 className="fw-bold border-bottom border-3 border-dark-subtle p-1 d-flex justify-content-between mt-4 mb-3"><span>History</span>
        </h1>
        { isLoading ? (
            <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <p>Loading menu ...</p>
            </div>
        ) :
        hist.length==0 ? (<div className='text-center'>
            <img src={cat} alt="cat" className='img-fluid w-25'/>
            <p className='text-secondary'>You didn't do any reservation before</p>
        </div>) :
        
        (<div class="table-responsive mt-3">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr className='table_titre'>
                        <th>res</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>table</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {hist.map((item,index)=>{
                        const month=new Date(item.date_chosen).getMonth()+1;
                        const year=new Date(item.date_chosen).getFullYear();
                        const d=new Date(item.date_chosen).getDate();
                        const date=year+'-'+String(month).padStart(2, "0")+'-'+String(d).padStart(2, "0");
                        return(<tr key={index}>
                            <td>{index +1 }</td>
                            <td>{date}</td>
                            <td>{item.hour}</td>
                            <td>{item.id_table ==4 ? "big table" : item.id_table<4 ? "table "+item.id_table : "table "+(item.id_table-1)}</td>
                            <td>{new Date()>=new Date(`${date}T${item.hour}`) ? "Passed" : "Still"}</td>
                            <td><button className='btn btn-danger' onClick={()=>handeldelete(item.Id_res)}>x</button></td>
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

export default ResAdmin;
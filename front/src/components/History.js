import Axios from 'axios';
import {useState,useEffect} from "react";
import cat from "../resources/emptybox.jpg";
const History=()=>{
    const [hist,setHist]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        let id=localStorage.getItem("UserId");
        Axios.get("http://localhost:6001/res/get/"+id)
        .then((res)=>{
            if(res.data){
                console.log(res.data)
            setHist(res.data);}
            setIsLoading(false);
        });
    },[hist])
    return(
        <>
        <div class="container">
        { isLoading ? (
            <div className="text-center">
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
        
        (<div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr className='table_titre'>
                        <th>res</th>
                        <th>Reservation Date</th>
                        <th>Reservation Time</th>
                        <th>table</th>
                        <th>Status</th>
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

export default History;
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import {useState} from "react";
import Carousel from '../components/Carousel';
import Table from '../components/Table';
import cat1 from "../resources/cat (2).png";
import c from "../resources/credit-card.png";
import PaymentModel from '../components/PaymentModel';
import History from '../components/History';
import { useNavigate } from 'react-router-dom';
import Navbar from "../component/nav";
import Footer from '../component/Footer';

function Reservation(){
  const [sh,setshow]=useState(false);
  const [obj,setobj]=useState({});
  const user=localStorage.getItem("UserId");
  const navigate = useNavigate();
  const schema=yup.object().shape({
    cin: yup.string()
        .matches(/^[0-9]{8}$/, 'CIN must be exactly 8 digits')
        .required('Cin is required'),
    phone:yup.string().matches(/^[0-9]{8}$/, 'Phone number must be exactly 8 digits').required('Phone is required'),
    message:yup.string().min(0).max(100,'Message must be at most 100 characters long'),
    
});
const {handleSubmit,register,formState:{errors}}=useForm({resolver:yupResolver(schema)});

    const days=['Sunday',"Monday","Tuesday","Wensday","Thursday","Friday","Saturday"]
    const [tablesToRes,setTablesToRes]=useState([]);
    
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const month=currentDate.getMonth()+1;
    const day=currentDate.getDay();
    const year=currentDate.getFullYear();
    const d=currentDate.getDate();

    const [hour,setHour]=useState("09:00");
    const [selectHour,setSelectHour]=useState([true,false,false,false,false,false,false]);
    const changeselectHour=(i,time)=>{
      setHour(time);
      const newselectHour=selectHour.map((item,index)=>{
        return (index===i ? true : false);
      })
      setSelectHour(newselectHour);
    }
    
    const goToPreviousDay = () => {
      const previousDay = new Date(currentDate);
      console.log(previousDay.getDate());
      if(previousDay.getDay()==2){previousDay.setDate(currentDate.getDate() - 2)}
      else{previousDay.setDate(currentDate.getDate() - 1)};

      if (previousDay > new Date()) {  // Ensure it doesn’t go to past
        setCurrentDate(previousDay);
      }
    };
    const goToNextDay = () => {
      const nextDay = new Date(currentDate);
      if(nextDay.getDay()===0){nextDay.setDate(currentDate.getDate() + 2);}
      else{nextDay.setDate(currentDate.getDate() + 1)};
      setCurrentDate(nextDay);
    };

    const receiveDataFromChild = (data) => {
      let newTbale=[...data.keys()].filter(index => data[index] === 1)
     setTablesToRes(newTbale);
    };

    const handleForm=(data)=>{
      if(!user){
        Swal.fire({
          title:"you should login", 
          imageUrl:cat1,
          imageAlt: "cat image"});
          navigate("/auth");
      }
      else{
      const date=year+'-'+String(month).padStart(2, "0")+'-'+String(d).padStart(2, "0");
      let message=data.message;
      if(!data.message){
         message=" ";
      }
      const selectedHourDate = new Date(`${date}T${hour}`);
       // Convert to UTC before saving
      if(tablesToRes.length===0){
        Swal.fire({
          title:"choose Table first", 
          imageUrl:cat1,
          imageAlt: "cat image"});
      }
      else{
      if(today<=selectedHourDate){
        setobj({
          "date_chosen":date,
          "hour":hour,
          "message":message,
          "id":user,
          "cin":data.cin,
          "phone":data.phone
        });
        setshow(true);
        console.log(sh)
      }
      else{
          Swal.fire({
            title:"already passed Time", 
            imageUrl:cat1,
            imageAlt: "cat image"});

        };
      }}
  }

    return(
        <div className='text-dark'>
          <Navbar/>
      <Carousel/>
    <div className='m-4'>
      <div className='row rowrow'>
        <h1 className='text-center big_text'>Reservation</h1>
      </div>
      <div className="row rowrow  g-3">
      <div className=" col-md-auto-6 col-lg-6 col-sm-12 cont text-center">

        {/*~~ Time of reservation */}
        <div className='row rowrow'>
          <h2 className='text-center mt-4'>
          <button className='arrow me-4' onClick={goToPreviousDay}></button>{days[day]}<button className='arrow ms-3' onClick={goToNextDay}></button>
            </h2>
        </div>
        <div className='row rowrow'>
          <h5 className='col'>{days[day]} {d} / {month} / {year}  </h5>
        </div>
        <div className='row rowrow text-center'>
          <div className={selectHour[0] ? 'col  time colorTime':'col  time'}  onClick={() => changeselectHour(0,"9:00")} >09:00  10:00</div>
          <div className={selectHour[1] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(1,"10:00")}>10:00  11:00</div>
          <div className={selectHour[2] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(2,"11:00")}>11:00  12:00</div>
          <div className={selectHour[3] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(3,"12:00")}>12:00  13:00</div>
          <div className={selectHour[4] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(4,"14:00")}>14:00  15:00</div>
          <div className={selectHour[5] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(5,"15:00")}>15:00  16:00</div>
          <div className={selectHour[6] ? 'col  time colorTime':'col  time'}   onClick={() => changeselectHour(6,"16:00")}>16:00  17:00</div>
        </div>

        {/* End of time reservation */}

        {/* table de reservation */}
        
        <Table date={year+'-'+month+'-'+d} hour={hour} sendDataToParent={receiveDataFromChild} />

      </div>

      {/* Form of reservation */}
      <div className='col-lg-5 col-md-12 '>
      <div className="form">
        <h2 className="mb-3 text_table">Book a Table</h2>
        <form action="#" onSubmit={handleSubmit(handleForm)} className="appointment-form">
          <div className="d-md-flex">
            <div className="form-group col-12">
              <input type="text" className="form-control" placeholder="CIN" {...register("cin")} />
              <span className="text-danger">{errors.cin?.message}</span>
            </div>
          </div>
          <div className="d-md-flex">
            <div className="form-group col-12">
              <input type="text" className="form-control" placeholder="Phone" {...register("phone")} />
              <span className="text-danger">{errors.phone?.message}</span>
            </div>
          </div>
          <div className="d-md-flex">
            <div className="form-group mb-3 me-3">
              <textarea  cols={30} rows={2} className="form-control" placeholder="Message" defaultValue={""} {...register("message")}/>
            </div>
            <div className="form-group ml-md-4">
              <button type="submit" value="Appointment" className="py-3 px-4 bt"  >Appointment</button>
            </div>
          </div>
        </form>
      </div>
      <div className='affiche_time'>
      <div className="container">
        <div className="card">
          <h1 className="card-title">TIME OPEN</h1>
          <h2 className="card-subtitle">Thuesday-Sunday</h2>
          <div className="hours">9 am - 13 pm<br />
          14 pm - 17 pm 
          </div>
          <h2 className="card-subtitle">Monday</h2>
          <div className="hours fw-bold">CLOSED<br />
          </div>
        </div>
      </div>
      </div>

      </div>
    </div>
    {/* END OF Form of reservation */}

    {/* History of reservation */}
{user &&
(<>
<div className='row'>
  <h1 className='text-center big_text mt-5'>History</h1>
</div>
<History/>
</>)
}
{/* Payement MOdel */}

{sh &&
(<div className="custom-modal d-flex justify-content-center align-items-center">
  <div className="custom-modal-box p-4 rounded shadow">
    <h3 className="mb-3"><img src={c} alt="credit" className='me-2'/>Pay for reservation</h3>
    <div className="mb-4 modal-content">
      <PaymentModel obj={obj} tablesToRes={tablesToRes} />
    </div>
    <button className="btn btn-secondary" onClick={()=>{setshow(false);}}>Close</button>
  </div>
</div>)
}
   </div>
   <Footer/>
    </div>
    )

}


export default  Reservation;
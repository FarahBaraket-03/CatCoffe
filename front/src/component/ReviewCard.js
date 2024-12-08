
import { BsStarHalf, BsStarFill  } from "react-icons/bs";
import happycat from "../assets/im4/f.jpg"



const ReviewCard = (props) => {
      return (
      <div className="card  mb-4 " style={{backgroundColor:"white",width:"400px" , height:"300px"}}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center">
          <div className="me-3">
             <img className="rounded-circle" src={happycat} alt="img" style={{ width: '80px', height: '80px' }} />
          </div>
          <div>
            <h2 className="card-title font-weight-bold">{props.title}</h2>
            <div className="d-flex">
              <BsStarFill className="text-brightColor" />
              <BsStarFill className="text-brightColor" />
              <BsStarFill className="text-brightColor" />
              <BsStarFill className="text-brightColor" />
              <BsStarHalf className="text-brightColor" />
            </div>
          </div>
           
        </div>
        <p className="m-5">
         {props.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
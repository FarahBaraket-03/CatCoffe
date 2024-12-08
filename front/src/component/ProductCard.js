import React from "react"; // Assurez-vous que ce composant est compatible avec Bootstrap
import { BsStarHalf, BsStarFill } from "react-icons/bs";

const ProductCard = (props) => {
  return (
    <div className="card w-75 mb-4">
      <img className="card-img-top rounded-lg" src={props.img} alt="img" />
      <div className="card-body text-center">
        <h2 className="card-title font-weight-bold">{props.title}</h2>
        <div className="d-flex flex-lg-row gap-4 justify-content-center">
        <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarFill className="text-brightColor" />
          <BsStarHalf className="text-brightColor" />
        </div>
          
      </div>
    </div>
  );
};

export default ProductCard;


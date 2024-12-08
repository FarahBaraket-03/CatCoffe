import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
// import CR from "./carrousl"


const MenuCard = (props) => {


  const [showPrice, setShowPrice] = useState(false);

  const handleCartClick = () => {
    setShowPrice(!showPrice);
  };

  return (
 
    <div className="card mx-3 my-3">
      <img className="img card-img-top rounded img-fluid w-75 h-75 m-4 "  src={props.img} alt={props.title} />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{props.title}</h5>
          <h5 className="card-title">{props.value}</h5>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <button className="btn btn-outline-danger me-2">Hot</button>
            <button className="btn btn-outline-primary">Cold</button>
          </div>
          <span className=" border-dark p-2 rounded-circle d-flex align-items-center justify-content-center cursor-pointer" onClick={handleCartClick}>
            <FaShoppingCart size={20} />
          </span>
        </div>
        {showPrice && (
          <p className="text-center mt-3">Price : {props.price}$</p>
        )}
      </div>
    </div> 
  );
};

export default MenuCard;
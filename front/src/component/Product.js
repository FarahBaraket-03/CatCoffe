import React from "react";
import img1 from "../assets/img/product1.jpg";
import img2 from "../assets/img/product2.jpg";
import img3 from "../assets/img/product3.jpg";
import ProductCard from "./ProductCard"; // Assurez-vous que ce composant est compatible avec Bootstrap

const Product = () => {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center bg-backgroundColor p-5">
      <h1 className="font-weight-bold text-center display-4 mt-5 mb-4">
        Our Products
      </h1>

      <div className="row d-flex  justify-content-center ml-2" style={{position:'relative',marginLeft:"60px" , top:'40px' , marginBottom:'40px'}}>
        <div className="col-lg-4 col-md-6 mb-4">
          <ProductCard img={img1} title="Nespresso" price="19.9" />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <ProductCard img={img2} title="AeroPress" price="17" />
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <ProductCard img={img3} title="Chemex"  price="20"/>
        </div>
      </div>
    </div>
  );
};

export default Product;
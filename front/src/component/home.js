import React from 'react';
import Header from '../assets/img2/header-bg.jpg';
import Button from "./Button"; 
 

const Home = () => {
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center " style={{ backgroundImage: `url(${Header})`,backgroundSize: 'cover' , height:"700px", marginBottom:"100px ",color :'white' }}>
      <div className="container d-flex flex-column flex-lg-row justify-content-between align-items-center gap-4 px-5">
        <div className="w-100 w-lg-50 mt-4">
          <h1 className="font-weight-bold display-4 text-center text-lg-start">
            Start your day with a steaming <br/>cup of coffee
          </h1>
          <p >
            Boost your productivity and build your mood with <br/>
            a glass of coffee in the morning with the most cute kitten
          </p>

          <div className="d-flex gap-5 ml-5">
            <Button title="COMING SOON" id="coming"/>
           </div>
        </div>

        
      </div>
    </div>
  );
};

export default Home;
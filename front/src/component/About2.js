import B2 from "../assets/img3/d.png";
import M from "../assets/img3/m.jpg";
import K from "../assets/img3/a.png";
import coffe from "../assets/img/about.jpg";
import React from "react";
import { FaDiceTwo } from 'react-icons/fa';
import Button from "./Button";

function About2() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: " #1f1a1a",
      marginTop: "100px",
      width: "100%",
      height: "100%",
      paddingBottom: "170px",
      paddingTop: "80px"
    }}>
      <main className="container">
        <h1 className='text-light text-center display-5 mb-5'>ABOUT US</h1>
        {/* row1 */}
        <div className="row  g-sm-3">
          <div className=" col-lg-3 col-md-5 col-sm-12" id="SCALE">
          <img src={K} alt="Cat with Butterfly" style={{ borderRadius: "20px", width: "90%", height: "250px" }} />
          </div>
          <div className="col-md-6 col-sm-12 col-lg"  id="SCALE" style={{backgroundColor:"#ffff",borderRadius: "20px" ,padding: "70px" ,width:'80%'}}>
            <h2 >Lac <FaDiceTwo/></h2>
            <p> Located in Lac 2</p>
            <Button  title="Coming Soon" />
          </div>
        </div>
        {/* //fin row 1 */}

        {/* row2 */}
        <div className="row mt-5 g-sm-3">
          <div className="col-md-3 col-sm-12" id="SCALE">
            <img src={M} alt="Cat with Butterfly" style={{ borderRadius: "20px", width: "100%", height: "300px" }} />
          </div>
          <div className="col-md-6 col-sm-12 "  id="SCALE">
            <div style={{  borderRadius: "20px",padding: "10px" , backgroundColor:"#ffff" ,width:"100%", height:"300px"}}>
              <p className="fs-sm-1 fs-md-1 fs-lg-6 p-1" >
              Esresso & Purrs offers a cozy setting with 10 seats
              where you can enjoy delicious coffee and snacks alongside friendly,
              lounging cats. Convenient parking and easy access make it simple to
              visit whether you're looking to enjoy some peaceful reading time or
              want to relax with friends. Some of our cats are available for
              adoption, providing a warm, transitional home for kittens
              seeking a new family. Experience close interactions with our cats
              during your visit, and you might just find your new furry family
              member!
              </p>
            </div>
          </div>
          <div className="col-md-3"  id="SCALE">
            <img src={B2} alt="Cat with Butterfly" style={{ borderRadius: "20px", width: "100%", height: "300px" }} />
          </div>
        </div>
        {/* //fin row2 */}

        {/* row3 */}
        <div className="row mt-5">
          <div className="col-md-12"  id="SCALE">
            <img src={coffe} alt="Cat with Butterfly" className='img img-fluid' style={{ borderRadius: "20px", width: "100%", height: "300px" }} />
          </div>
        </div>
        {/* //fin row 3 */}
      </main>
    </div>
  );
}

export default About2;
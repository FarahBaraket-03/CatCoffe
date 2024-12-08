
import React from "react";
import img from "../assets/img2/footer-bg.png"; 
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaTwitter ,FaDribbble } from "react-icons/fa"; // Importer des icônes

const Footer = () => {
 
  return (
    <div
      className="  text-white rounded-top mt-8 y-50 "
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingBottom: '200px',
        // marginTop :"250px",
       
      }}
    >
      <div className="container" style={{ position :'relative'}} >
        <div className="row justify-content-around ">
          <div className="col-md-3 mb-4 col-sm-12 " style={{position :"relative" ,top:"170px",marginRight :'50px'}}>
            <h5>Espresso and purrs</h5>
            <p className="text-sm">
              Welcome to our coffee haven! Explore our aromatic brews, savor
              artisanal flavors, and discover the perfect roast to elevate your
              daily ritual.
            </p>
          </div>
          
           
          <div className="col-md-3 mb-1 col-sm-12" style={{position :"relative" ,marginRight :'50px',marginLeft :'100px',top:"170px"}}>
            <h5>Contact Us</h5>
            <nav className="flex flex-column">
              <a className="text-white hover:text-warning transition-all" href="/">
                <FaEnvelope className="me-2" /> EspressoAndPurrs@email.com
              </a><br/>
              <a className="text-white hover:text-warning transition-all" href="/">
                <FaPhone className="me-2" /> +84 958 248 966
              </a>
              </nav>
              </div>

                
              <div className="col-md-3 mb-1 mt-4 col-sm-12"  style={{position :"relative" ,marginLeft :'50px',top:"170px"}}>
              <h5>Follow Us</h5>
              <p>Let us be social</p>
              < div className="d-flex">
                <a className="text-white hover:text-warning transition-all me-3" href="/">
                  <FaFacebook />
                </a>
                <a className="text-white hover:text-warning transition-all me-3" href="/">
                  <FaInstagram />
                </a>
                <a className="text-white hover:text-warning transition-all me-3" href="/">
                  <FaTwitter />
                </a>
                <a className="text-white hover:text-warning transition-all me-3" href="/">
                  <FaDribbble/>
                </a>
               </div>
           
              </div>       
        </div>
      </div>
      
      <div className="text-center py-4" style={{position :"relative" ,top:"130px"}}>
      <center> <p>
          &copy; {new Date().getFullYear()}  
          <span className="text-warning" > Espresso & purrs  </span>
          | All rights reserved
        </p></center> 
      </div>
    </div>
  );
};

export default Footer;
































// import React from "react";
// import img from "../assets/img/pic1.png" 

// const Footer = () => {
//   return (
//     <div id='footer' className="bg-gradient text-black rounded-top mt-8 md:mt-0" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//       <div className="container p-4">
//         <div className="row">
//           <div className="col-md-3 mb-4">
//             <h1 className="font-weight-bold text-xl pb-4">CafePulse</h1>
//             <p className="text-sm">
//               Welcome to our coffee haven! Explore our aromatic brews, savor
//               artisanal flavors, and discover the perfect roast to elevate your
//               daily ritual.
//             </p>
//           </div>
//           <div className="col-md-3 mb-4">
//             <h1 className="font-weight-medium text-xl pb-4">Links</h1>
//             <nav className="flex flex-column">
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Menu</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">About Us</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Products</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Reviews</a>
//             </nav>
//           </div>
//           <div className="col-md-3 mb-4">
//             <h1 className="font-weight-medium text-xl pb-4">Menu</h1>
//             <nav className="flex flex-column">
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Cappuccino</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Latte</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Americano</a>
//             </nav>
//           </div>
//           <div className="col-md-3 mb-4">
//             <h1 className="font-weight-medium text-xl pb-4">Contact Us</h1>
//             <nav className="flex flex-column">
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">CafePulse@email.com</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">+84 958 248 966</a>
//               <a className="text-dark hover:text-backgroundColor transition-all" href="/">Social media</a>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="text-center py-4">
//         <p>
//           @copyright developed by
//           <span className="text-backgroundColor"> champion programmers </span>
//           | All rights reserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
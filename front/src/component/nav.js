import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link  as Lili}  from 'react-router-dom';
import { SiCoffeescript } from "react-icons/si";
import Button from './Button.js';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import img from './LOGIN/img/person.png'
import Mymodal from './modalmodif.js';
import { useAuth } from './AuthContext';

 

const Navbar = () => {
 const { login, setLogin, user, setUser}= useAuth();

  const [menu, setMenu] = useState(false);

  const [show , setShow] = useState(false);


useEffect(()=>{
  if(window.localStorage.length>1){
    setLogin(true);
    setUser({
      name: window.localStorage.getItem("UserName"), email:window.localStorage.getItem("UserEmail") ,
      id:window.localStorage.getItem("UserId")
  });
  }
  else{
    setLogin(false);
  }
})

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="home" smooth={true} duration={500}>
          <SiCoffeescript size={25} />
          <span className="ms-2">Espresso & Purrs</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleChange}
          aria-controls="navbarNav"
          aria-expanded={menu ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          {menu ? <AiOutlineClose size={25} /> : <AiOutlineMenuUnfold size={25} />}
        </button>
        <div className={`collapse navbar-collapse ${menu ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Lili className="nav-link" to="/" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Home
              </Lili>
              </li>
           
            <li className="nav-item">
              <Link className="nav-link" to="menu" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Menu
              </Link>
            </li>
            <li className="nav-item">
              <Lili className="nav-link" to="/cat" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Cat Gallery
              </Lili>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="about" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                About Us
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="products" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="review" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Lili className="nav-link" to="/res" spy={true} smooth={true} duration={500} onClick={closeMenu}>
                Reservation
              </Lili>
            </li>
          </ul>
         {!login
           ?
          <div className="d-lg-block">
          <Lili className="nav-link" to="/auth">
          <Button title="Sign in"/>
          </Lili>
           </div>
           :
           <>
           <div className="d-lg-block">
             <button onClick={()=>setShow(true)} style={{border:"none" ,backgroundColor:"transparent"}}><img alt="" src={img} className="me-2 small-img"></img>
             </button>
         
             <Mymodal show={show} onHide={()=>setShow(false)}/>
            </div>

           <button  style={{border:"none" , backgroundColor:"transparent"}} onClick={()=>{setLogin(false);setUser({});window.localStorage.clear()}}><Button title="Log out" /></button>
           </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/CatGallery.css";
import "aos/dist/aos.css";
import Aos from "aos";
import Navbar from "../component/nav";
import Footer from "../component/Footer";

const CatGallery = () => {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        Aos.init({duration:2000});
        axios.get("http://localhost:6001/cat/all")
            .then((response)=>{console.log(response);setCats(response.data);
                setIsLoading(false)
            })
            // .then(response => setCats(response.data))
            .catch(error => console.error("Error fetching cats:", error));
    }, []);
        

    return (
        <>
        <Navbar/>
        <div className="allcat mt-5">
        <div class="hh mt-5">
        <h1>Meet our Cats!</h1>
      </div>
        {
            isLoading ?  (
                <div className="text-center mt-5">
            <div className="spinner-border  text-primary" role="status">
                <span className="sr-only"></span>
            </div>
            <p className="text-primary fw-bold display-5">Loading cats ...</p>
            </div>
            ) :(
                <div className="cat-gallery">
            {cats.map((cat) => 
            {let a=100*cat.id_miaw
                return (    
                <div className="cat-card" key={cat.id_chat} data-aos="fade-up" data-aos-delay={String(a)}>
                    <img src={process.env.PUBLIC_URL+"\\resource\\cats\\"+cat.image}  alt={cat.nom} className="cat-image" />
                    <h3>{cat.nom}</h3>
                    <p><b>Age:</b> {cat.age}</p>
                    <p><b>Type:</b> {cat.gender}</p>
                    <p>{cat.description}</p>
                    {cat.dop ? <p className="adopted">Adopted!</p> : <p className="available">Available for Adoption</p>}
                </div>
            )})}
        </div>
            )
        }
        <Footer/>
        </div>
        
        </>
    );
};

export default CatGallery;

import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Axios from "axios";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("tab1"); 
  const [isLoading, setIsLoading] = useState(true);
  const [drinks,setDrinks]=useState([]);
  const [food,setFood]=useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:6001/menu/getdrink").then(res => {
      if (res.data.status) {
        setDrinks(res.data.data);
        }
       }).catch((error) => {
       });
    Axios.get("http://localhost:6001/menu/getfood").then(res => {
        if (res.data.status) {
          setFood(res.data.data);
          }
         }).catch((error) => {
         });
       setIsLoading(false);
  },[])
  return (
    <div className="container">
      <h1 className=" font-semibold text-center text-4xl mt-24 mb-8">
        Our Menu
      </h1>
      <div className="d-flex justify-content-center">
        {/* Tab 1 */}
        <button
          className={`btn btn-link ${activeTab === "tab1" ? "text-secondary mt-3 fs-4 fw-bold border-bottom border-3" : "text-dark mt-3 fs-4"}`}
          style={{ textDecoration: "none" }}
          onClick={() => setActiveTab("tab1")}
        >
          Drinks
        </button>

        {/* Spacer */}
        <div className="mx-4"></div>

        {/* Tab 2 */}
        <button
          className={`btn btn-link ${activeTab === "tab2" ? "text-secondary mt-3 fs-4 fw-bold border-bottom border-3" : "text-dark mt-3 fs-4"}`}
          style={{ textDecoration: "none" }}
          onClick={() => setActiveTab("tab2")}
        >
          Food
        </button>
      </div>
      { isLoading ? (
            <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only mt-5"></span>
            </div>
            <p>Loading menu ...</p>
            </div>
        ) :(<>

        {activeTab === "tab1" ? (
          <div className="row d-flex justify-content-around align-items-center">
          {drinks.map((item)=>{
            return(<div className="col-lg-4 col-md-6 col-sm-12">
            <MenuCard  img={process.env.PUBLIC_URL+"\\resource\\img\\"+item.image}  title={item.nom_menu} price={item.prix} id=" hajer"/></div>)
          })}
         
        </div>
        ) : 
        (<div className="row d-flex justify-content-around align-items-center">
          {food.map((item)=>{
              return(<div className="col-lg-4 col-md-6 col-sm-12">
              <MenuCard  img={process.env.PUBLIC_URL+"\\resource\\img\\"+item.image}  title={item.nom_menu} price={item.prix} id=" hajer"/></div>)
            })}
          </div>)
      }
      
      
      </>)
      }
    </div>
  );
};

export default Menu;
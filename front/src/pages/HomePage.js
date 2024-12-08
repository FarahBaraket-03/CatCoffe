import Navbar from "../component/nav";
import Home from "../component/home";
import Menu from "../component/menu";
import About from "../component/About2";
import Product from "../component/Product";
import Review from "../component/Review";
import Footer from "../component/Footer";
import Cat from "../component/commentaire";

const HomePage=()=>{
    return(<>
     <div>
     <Navbar/>
     <main>
       <div id="home">
         <Home />
       </div>
 
       <div id="menu">
         <Menu />
       </div>
     <div id="catfood">
         <Cat />
       </div>
        <div id="about">
         <About />
       </div>

         <div id="products">
         <Product />
       </div>

       <div id="review">
         <Review />
       </div>
     </main>

     <Footer/>
   </div>
        </>)
}

export default HomePage;
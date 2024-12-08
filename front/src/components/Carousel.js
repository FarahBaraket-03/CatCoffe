import bg1 from "../resources/bg_1.jpg";
import bg2 from "../resources/bg_2.jpg";
import bg3 from "../resources/bg_3.jpg";


function Carousel(){
    return(
        <>
        <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
  <ol className="carousel-indicators">
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" />
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} />
    <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} />
  </ol>
  <div className="carousel-inner mt-5">
    <div className="carousel-item active">
        <div className="textOnCarsousel col-md-8 col-sm-12 d-block w-100">
            <h3 className="subheading text_car">Welcome</h3>
            <h1 className="mb-4">Bonjour</h1>
        </div>
      <img src={bg3} className="d-block w-100 img3" alt="first slide" />
    </div>
    <div className="carousel-item">
    <div className="textOnCarsousel col-md-8 col-sm-12 d-block w-100">
            <h3 className="subheading text_car">Welcome</h3>
            <h1 className="mb-4">Bonjour</h1>
        </div>
      <img src={bg1} className="d-block w-100" alt="second slide" />
    </div>
    <div className="carousel-item">
    <div className="textOnCarsousel col-md-8 col-sm-12 d-block w-100">
            <h3 className="subheading text_car">Welcome</h3>
            <h1 className="mb-4">Bonjour</h1>
        </div>
      <img src={bg2} className="d-block w-100" alt="third slide" />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="sr-only"></span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="sr-only"></span>
  </a>
      </div>
        </>
    )
}

export default Carousel
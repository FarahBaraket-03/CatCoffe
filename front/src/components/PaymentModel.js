import '../style/style.css';
import Axios from 'axios';
import cat2 from "../resources/smile (1).png";
import Swal from 'sweetalert2';
const PaymentModel=(props)=>{

  const tablesToRes=props.tablesToRes;
  const n=tablesToRes.length;
  const obj=props.obj;
  const confirmRes=(event)=>{
    event.preventDefault();
    tablesToRes.forEach((id_tab)=>{
      Axios.post("http://localhost:6001/res/add/"+obj.date_chosen+"/"+obj.hour+'/'+obj.cin+'/'+obj.phone+'/'+(id_tab+1)+"/"+obj.message+"/"+obj.id)
      .then((result)=>{
      });
    });
    Swal.fire(
      {title:"Thank you",
      imageUrl :cat2})
      .then((result)=>{
        if(result.isConfirmed){
          window.location.reload();
        }
      });

      
  }


    return(
        <>  
         <div className=" page payment-page">
        <section className="payment-form dark">
          <div className="container">
            <div className="block-heading">
              <h2>Payment</h2>
              <p>You should pay for reservation a table</p>
            </div>
            <form onSubmit={confirmRes}>
              <div className="products">
                <h3 className="title">Checkout</h3>
                {tablesToRes && tablesToRes.map((id_tab,index)=>{
                  return(
                    <div className="item"><span className="price">$2</span>
                    <p className="item-name">ticket {index+1}</p>
                    <p className="item-description">{id_tab == 3? "big table" : id_tab<3 ? "table "+(id_tab+1) : "table "+id_tab}</p>
                    </div>
                  )
                })}
          <div className="total">Total<span className="price">${n*2}</span></div>
        </div>
        <div className="card-details">
          <h3 className="title">Credit Card Details</h3>
          <div className="row">
            <div className="form-group col-sm-7">
              <label htmlFor="card-holder">Card Holder</label>
              <input id="card-holder" type="text" className="form-control" placeholder="Card Holder" aria-label="Card Holder" aria-describedby="basic-addon1" required/>
            </div>
            <div className="form-group col-sm-5">
              <label htmlFor>Expiration Date</label>
              <div className="input-group expiration-date">
                <input type="text" className="form-control" placeholder="MM" aria-label="MM" aria-describedby="basic-addon1" required />
                <span className="date-separator">/</span>
                <input type="text" className="form-control" placeholder="YY" aria-label="YY" aria-describedby="basic-addon1" required/>
              </div>
            </div>
            <div className="form-group col-sm-8">
              <label htmlFor="card-number">Card Number</label>
              <input id="card-number" type="text" className="form-control" placeholder="Card Number" aria-label="Card Holder" aria-describedby="basic-addon1" required />
            </div>
            <div className="form-group col-sm-4">
              <label htmlFor="cvc">CVC</label>
              <input id="cvc" type="text" className="form-control" placeholder="CVC" aria-label="Card Holder" aria-describedby="basic-addon1" required />
            </div>
            <div className="form-group col-sm-12">
              <button type="submit" className="btn btn-outline-primary p-2" >Proceed</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</div>
        </>
    )
}

export default PaymentModel;


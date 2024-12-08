import Swal from 'sweetalert2';
import '../App.css';
import cat1 from "../resources/question.png";
import Axios from 'axios';
import {useState ,useEffect} from "react";
import cat2 from "../resources/cat (2).png";


const Table=(props)=>{

    const [table1,setTable1]=useState([0,0,0,0,0,0]);
    const [tabcolor,settabcolor]=useState(["","","","","",""]);
      const color=(newcolor,etat,index)=>{
        switch (etat) {
          case false:
              newcolor[index]=" ball_yours";
              break
          case true:
              newcolor[index]=" ball_full";
              break;
          case 1:
              newcolor[index]=" ball_temp";
              break;
          case 0:
            newcolor[index]=" ball_vide";
            break;
          default:
              break;
        }
      }

      useEffect(()=>{
        const fetchData = async () => {
          try {
            const newtabcolor=new Array(6).fill(" ball_vide");
            const result = await Axios.get(`http://localhost:6001/res/select/${props.date}/${props.hour}`);
            const data = result.data;
            const id_client = localStorage.getItem("UserId");
            const table = new Array(6).fill(0);
            data.forEach((item) => {
                table[item.Id_table - 1] = (id_client == item.id_client)?false:true;
                color(newtabcolor,table[item.Id_table - 1], item.Id_table - 1);
            });
            setTable1(table);
            settabcolor(newtabcolor);
          } catch (error) {
            console.error("Error fetching table data: ", error);
          }
        };
        fetchData();
      },[props.date,props.hour]);

      const changestattable=(index)=>{
        const newtable=[...table1];
        if(newtable[index]===true){
          Swal.fire({
            title: "don't!",
            text: "You can't reserve place!",
            imageUrl:cat2
          });
        }
        else 
        {if(newtable[index]===false){
            Swal.fire({
                title: "Sure ?",
                text: "do you want cancel reservation ?",
                imageUrl:cat1,
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: `no`
              })
              .then((resultat)=>{
                if (resultat.isConfirmed) {
                  Axios.delete("http://localhost:6001/res/delete/"+props.date+"/"+props.hour+'/'+localStorage.getItem('UserId')+'/'+(index+1))
                  .then((result)=>{
                    if(result.data.status){
                      newtable[index]= 0;
                      setTable1(newtable);
                      color(tabcolor,newtable[index],index);
                      Swal.fire(result.data.message,"", "success");
                      
                    }
                    else{
                      Swal.fire("there's problem", "", "error");
                    }
                  })
                    
                    }
              });
             
            }
            else{
                newtable[index]= (newtable[index]===1 ? 0 : 1);
                setTable1(newtable);
                
            }
        }
        props.sendDataToParent(newtable);
        color(tabcolor,newtable[index],index);
      }

      

    return(
        <>
        <div className="row rowrow">

<div className="col-4  g" onClick={()=>changestattable(0)}>
    <button key={1} name="table1" className={"ball g-col-6"+tabcolor[0]} ></button>
    <button key={2} name="table1" className={"ball g-col-6"+tabcolor[0]} ></button>
    <button key={3} name="table1" className={"ball g-col-6"+tabcolor[0]} ></button>
    <button key={4} name="table1" className={"ball g-col-6"+tabcolor[0]} ></button>
   <div className='row '><p className='text-center'>Table 1</p></div>
</div>

<div className="col-4  g" onClick={()=>changestattable(1)}>
    <button  name="table2"className={"ball g-col-6"+tabcolor[1]}></button>
    <button  name="table2" className={"ball g-col-6"+tabcolor[1]}></button>
    <button  name="table2"className={"ball g-col-6"+tabcolor[1]}></button>
    <button  name="table2" className={"ball g-col-6"+tabcolor[1]}></button>
   <div className='row '><p className='text-center'>Table 2</p></div>
</div>

<div className="col-3 g" onClick={()=>changestattable(2)}>
    <button  name="table3"className={"ball g-col-6"+tabcolor[2]}></button>
    <button  name="table3" className={"ball g-col-6"+tabcolor[2]}></button>
   <div className='row '><p className='text-center'>Table 3</p></div>
</div>

</div>

<div className="row rowrow">

<div className="col-5 g" onClick={()=>changestattable(3)}>
    <button  name="table3"className={"ball g-col-6"+tabcolor[3]}></button>
    <button  name="table3" className={"ball g-col-6"+tabcolor[3]}></button>
    <button  name="table1" className={"ball g-col-6"+tabcolor[3]}></button>
    <button  name="table3" className={"ball g-col-6"+tabcolor[3]}></button>
    <button  name="table3" className={"ball g-col-6"+tabcolor[3]}></button>
    <button name="table1" className={"ball g-col-6"+tabcolor[3]}></button>
   <div className='row '><p className='text-center'>Big Table</p></div>
</div>


<div className="col-4 g" onClick={()=>changestattable(4)}>
    <button  name="table1"className={"ball g-col-6"+tabcolor[4]}></button>
    <button  name="table1" className={"ball g-col-6"+tabcolor[4]}></button>
    <button  name="table1"className={"ball g-col-6"+tabcolor[4]}></button>
    <button  name="table1" className={"ball g-col-6"+tabcolor[4]}></button>
   <div className='row '><p className='text-center'>Table 4</p></div>
</div>

<div className="col-2 g" onClick={()=>changestattable(5)}>
    <button name="table1" className={"ball g-col-6"+tabcolor[5]}></button>
    <button name="table1" className={"ball g-col-6"+tabcolor[5]}></button>
   <div className='row '><p className='text-center'>Table 5</p></div>
</div>

</div>

<div className='row rowrow'>
<div className='circles '>
    <div className="circle-text-container">
    <div className="circle" style={{backgroundColor: ' rgb(245, 213, 164)'}} />
    <span className="circle-text">Table is reserved</span>
    </div>
    <div className="circle-text-container">
    <div className="circle" style={{backgroundColor: ' rgb(139, 141, 143)'}} />
    <span className="circle-text">Your reserved Table</span>
    </div>
    <div className="circle-text-container">
    <div className="circle" style={{backgroundColor: '#d28b3e'}} />
    <span className="circle-text">Selected Table </span>
    </div>
    <div className="circle-text-container">
    <div className="circle" style={{border:'rgb(245, 213, 164) 1px solid'}} />
    <span className="circle-text">Empty</span>
    </div>
  </div>
</div>
        </>
    )
}

export default Table;
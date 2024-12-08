const express=require("express");
const routerReservation=express.Router();
const db=require("../connexion");

//get ALL Tables that aleardy reserved
routerReservation.get("/select/:date/:hour",(req,res)=>{
    let date1=req.params.date;
    let hour1=req.params.hour;
    db.query("select Id_table,id_client from reservation where date_chosen = ? and hour = ?",[date1,hour1],(err,resultat)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(resultat);
        }
    })
})

//get your history reservation that aleardy reserved
routerReservation.get("/get/:id",(req,res)=>{
    let id_client=req.params.id;
    db.query("select * from reservation where id_client = ? ",[id_client],(err,resultat)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(resultat);
        }
    })
})


// add reservation
routerReservation.post("/add/:date/:hour/:cin/:phone/:num/:message/:id",(req,res)=>{
    let date1=req.params.date;
    let hour1=req.params.hour;
    let cin=req.params.cin;
    let phone=req.params.phone;
    let num_table=req.params.num;
    let message=req.params.message;
    let id_client=req.params.id;
    let date_res=new Date();

    db.query("insert into reservation (cin, Id_table, date_res, date_chosen,hour,message,id_client,phone) values(?,?,?,?,?,?,?,?)",[cin,num_table,date_res,date1,hour1,message,id_client,phone],(err,resultat)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(resultat);
            console.log("insert success");
        }
    })
})

//supprimer reservation
routerReservation.delete("/delete/:date/:hour/:id/:num",(req,res)=>{
    let date1=req.params.date;
    let hour1=req.params.hour;
    let id_client=req.params.id;
    let num_table=req.params.num
    db.query("delete from reservation where id_client=? and Id_table=? and date_chosen=? and hour=?",[id_client,num_table,date1,hour1],(err,resultat)=>{
        if(err){
            console.log(err)
        }
        else{
            return (res.json({
                status:true,
                message:"Saved"
            }))
        }
    })
})

module.exports=routerReservation;
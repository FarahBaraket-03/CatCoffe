import { useState } from "react";
import SignUp from "./signup"
import Login from "./signin"
import "./loginsign.css"


export default function User(){
    const [btn,setbtn]=useState(false)

  return (
    <div id='body'>
    {!btn ? (<SignUp setbtn={setbtn} />) : (<Login setbtn={setbtn}/>) }</div>)
 }
const express=require('express');
const mysql=require("mysql");
const cors= require('cors');
const dotenv=require('dotenv');

dotenv.config();

const db=mysql.createConnection({
    user:"root",
    password:process.env.PSW,
    host:'localhost',
    database:"res"
});
db.connect(err => {
    if (err) {
      console.error('error connecting to db: ' + err.stack);
      return err;
    }
    console.log('connected to db  ' );
  });

module.exports=db;
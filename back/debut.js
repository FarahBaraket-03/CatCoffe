
const express=require('express');
const cors= require('cors');
const bodyParser=require('body-parser');
const routerReservation=require('./routes/reservation');
const routerUser=require('./routes/User');
const routerComment=require('./routes/comment');
const routerMenu=require('./routes/menu');
const routerCats=require('./routes/cats');
const routermenu=require('./routes_admin/routermenu');
const routerreservation=require("./routes_admin/routerReservation");
const routerclient=require('./routes_admin/routerclient');
const routerchat=require('./routes_admin/routerchat');
const app= express();
const dotenv=require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/res',routerReservation);
app.use('/auth',routerUser);
app.use('/com',routerComment);
app.use('/menu',routerMenu);
app.use('/cat',routerCats);
app.use('/menuadmin',routermenu);
app.use('/catadmin',routerchat);
app.use('/resadmin',routerreservation);
app.use('/clientadmin',routerclient);

app.listen(process.env.PORT,()=>{
    console.log('work on port '+process.env.PORT)
})
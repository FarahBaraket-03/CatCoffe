
const express=require("express");
const bcrypt=require("bcrypt");
const db=require("../connexion");
const routerUser=express.Router();


// Forgot Password Endpoint
routerUser.put('/update/:email/:psw',async(req, res) => {
    const email = req.params.email;
    const password = req.params.psw;
    try {
        await db.query('SELECT * FROM personne WHERE email = ?', [email],async(err,result)=>{
            const l=result.length;
            if (l<=0) {
                return (res.json({
                message: "User doesn't exists",
                status: false}));
            }
                const hashedPassword= await bcrypt.hash(password,8);
                const query1 = `update personne set  password = ? where email = ?;`;
                await db.query(query1,[hashedPassword,email],(err,result)=>{
                if(err){
                    console.log(err);
                    return (res.status(500).json({ message: "Error while querying the database", status: false }));
                }
                return (res.json({
                    message: "changed successfully",
                    status: true}));
            });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            status: false
        });
    }
});
  


// Route for Sign Up
routerUser.post('/register/:username/:email/:psw', async (req, res) => {
    const email = req.params.email;
    const password = req.params.psw;
    const username = req.params.username;
    try {
        // Check if the user already exists using req SQL
        await db.query('SELECT * FROM personne WHERE email = ?', [email],async(err,result)=>{
            const l=result.length;
            if (l>0) {
                return (res.json({
                message: "User already exists",
                status: false}));
            }
            await db.query('SELECT * FROM user WHERE username = ?', [username],async(err,result)=>{
                if (result.length>0) {
                return (res.json({
                message: "Username already used",
                status: false}));}

                const hashedPassword= await bcrypt.hash(password,8);
                // Insert the new user into the database using raw SQL
                const query1 = `INSERT INTO personne (email, password) VALUES (?, ?);`;
                await db.query(query1, [email,hashedPassword],(err,result)=>{
                if(err){
                    console.log(err);
                    return (res.status(500).json({ message: "Error while querying the database", status: false }));
                }});
                const query2='INSERT INTO user (username, id) VALUES (?, LAST_INSERT_ID())';
                await db.query(query2, [username],(err,result)=>{
                    if(err){
                    console.log(err);
                    return (res.status(500).json({ message: "Error while querying the database", status: false }));}
                    const res_q=db.query("select id from user where username="+username);
                    console.log(res_q);
                    return (res.json({
                    message: "Registered successfully",
                    idUser:res_q[0].id,
                    status: true}));

            });
            })
            
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            status: false
        });
    }
});


// Route pour la connexion
routerUser.get("/login/:email/:psw", async (req, res) => {
    const email = req.params.email;
    const password = req.params.psw;
    // Requête à la base de données pour récupérer l'utilisateur
    db.query("SELECT p.id as ID,password,username FROM personne as p , user as u WHERE p.id=u.id and email = ?", [email], async (err, resultat) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error while querying the database", status: false });
        }

        // Vérification si l'utilisateur existe
        if (resultat.length === 0) {
            return res.json({ message: "Email doesn't exist", status: false });
        }
        // Récupération du mot de passe stocké
        const storedPassword = resultat[0].password;
        const id= resultat[0].ID;
        const username=resultat[0].username;
        // Vérification du mot de passe avec bcrypt
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (!isPasswordValid) {
            return res.json({ message: "password is incorrect", status: false });
        }
else{
        return(res.json({status:200,id:id,name:username}))}
    });
});


//update profil User
routerUser.post('/update', (req, res) => {
    // const [  ID, NEWNAME, NEWPASS, NEWEMAIL ] = req.body; matemchich with sql2 why ???
    const NEWNAME=req.body.USER;
    const NEWEMAIL=req.body.EMAIL;
    const NEWPASS=req.body.PASS;
    const ID=req.body.ID;
    console.log(ID, NEWNAME, NEWPASS, NEWEMAIL )
    try { // Check if the user already exists using req SQL
                db.query('SELECT * FROM personne WHERE email = ?', [NEWEMAIL],async(err,result)=>{
                const l=result.length;
                console.log(l)
                
                if (l>0 && (result[0].id!=ID)){
                    return (res.json({
                    message: "Email already used",
                    status: false}));}  
                
                    db.query('select * from user where username = ?', [NEWNAME],async(err,result2)=>{
                        const l2=result2.length;
                    
                        if (l2>0 && (result2[0].id!=ID)) {
                            return (res.json({
                            message: "Username already used",
                            status: false}));}  
                      
                        const sql = "UPDATE personne SET email = ?, password = ? WHERE id = ?;";
                        const sql2 = "UPDATE user SET username = ? WHERE id = ?;"; // Assurez-vous que la clé étrangère est correcte
    
                      // Exécutez les requêtes SQL
                      const p=await bcrypt.hash(NEWPASS,8);
                        db.query(sql, [NEWEMAIL,p, ID], (err, result) => {
                        if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Erreur lors de la mise à jour de la personne", status: false });
                             }
        
                        // Vérifiez si la mise à jour de la personne a réussi
                        if (result.affectedRows === 0) {
                            return res.status(404).json({ message: "Personne non trouvée", status: false });
                        }
                
                            // Mettez à jour l'utilisateur
                            db.query(sql2, [NEWNAME, ID], (err2, result2) => {
                                if (err2) {
                                    console.error(err2);
                                    return res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", status: false });
                                }
        
                            // Vérifiez si la mise à jour de l'utilisateur a réussi
                            if (result2.affectedRows === 0) {
                                return res.status(404).json({ message: "Utilisateur non trouvé", status: false });
                            }
        
                        // Si tout s'est bien passé
                            return res.status(200).json({ message: "Your profile id updated successfully", status: true });
                            });
                         });
                        
                        
                      });

               
            });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur du serveur",
            status: false
        });
    }
});


// Route pour nb client 
routerUser.get('/getnbclient', (req, res) => {
    try {
        const sql ="SELECT count(*) as nb from user ;"
              db.query(sql,(err,result)=>{
            if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erreur ", status: false });
             }
            else{ 
                 return res.status(200).json({ message:result[0].nb, status: true });
 
                }
                });
          
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur du serveur",
            status: false
        });
    }
 });


 // Route For admin

 routerUser.get("/admin/:code/:psw", async (req, res) => {
    const email = req.params.code;
    const password = req.params.psw;
    // Requête à la base de données pour récupérer l'utilisateur
    db.query("SELECT code,password FROM personne as p , admin as u WHERE p.id=u.id and code = ?", [email], async (err, resultat) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error while querying the database", status: false });
        }
        if (resultat.length !== 0) {
        const storedPassword = resultat[0].password;
        const isPasswordValid = await bcrypt.compare(password, storedPassword);
        if (isPasswordValid) {return(res.json({status:200,message:"welcome"}))}
        }
        return(res.json({status:false,message:"Wrong"}))
        
    });
}); 

module.exports = routerUser;

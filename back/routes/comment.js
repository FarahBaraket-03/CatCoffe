const express=require("express");
const db=require("../connexion");
const routerComment=express.Router();


// Route pour commentaire : droit ; un seul commentaire
routerComment.post('/commenter', (req, res) => {
    const commentaire=req.body.Comment;
    const ID=req.body.ID;
    const REACT =req.body.Reaction

   try {
           db.query("select id_rev as a from reviews where id=?;" ,[ID],(err,result)=>{
                      if (err) {
                       console.error(err);
                       return res.status(500).json({ message: "Erreur 1", status: false });
                       }
                   // USER HAS ALREADY COMMENT
                      else if (result.length > 0) {
                       const ident=result[0].a;
                       db.query('UPDATE reviews set comments=?,reaction=? where id_rev=?;',[commentaire,REACT,ident],(err,result)=>{
                       if (err) {
                       console.error(err);
                       return res.status(500).json({ message: "Erreur 2", status: false });
                        }
                        else{
                           return res.status(200).json({ message: "Comment and react updated", status: true });
           
                           }
                       
                       })}
                          // first comment 
                             else{
                               db.query('INSERT INTO reviews (comments,reaction,id) VALUES(?,?,?);',[commentaire,REACT,ID],(err,result)=>{
                               if (err) {
                               console.error(err);
                               return res.status(500).json({ message: "Erreur", status: false });
                                }
                               else{
                                   return res.status(200).json({ message: "Comment added", status: true });
                   
                                   }
                                   });

                       }

           })

      
   } 
   catch (error) {
       console.error(error);
       res.status(500).json({
           message: "Erreur du serveur",
           status: false
       });
   }
});




// Route pour get comment
routerComment.get('/getcomment', (req, res) => {


  try {
      const sql ="SELECT u.id, u.username , r.comments , r.reaction  FROM user u JOIN reviews r ON u.id = r.id ORDER BY RAND()  LIMIT 3;"
            db.query(sql,(err,result)=>{
          if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erreur lors de l acces aux commentaires", status: false });
           }
          else{
               return res.status(200).json({ message:result, status: true });

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


module.exports = routerComment;
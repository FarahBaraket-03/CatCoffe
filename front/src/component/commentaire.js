import React, { useEffect, useRef, useState } from 'react';
import { AiFillLike, AiOutlineLike, AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import Axios  from 'axios';
import Swal from 'sweetalert2';
import cat from "../assets/im4/b.jpg"


export default function CommentSection(props) {
 
  const refcomment =useRef()
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isnotempty, setIsnoempty] = useState(true);
  
  useEffect(() =>{setIsnoempty(comment.length===0)},[comment])

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    setIsLiked(false);
  };

   const handleSubmit = () => {
    let etat ="neutre";
    if (isDisliked){etat="dislike"}
    else {if (isLiked){etat="like"}}
     const values={Comment:comment,ID:props.id,Reaction:etat};
     console.log(values)
     Axios.post("http://localhost:6001/com/commenter",values).then(res => {
                       if (res.data.status) {
                        Swal.fire({
                           text:res.data.message,
                           imageUrl: cat,
                           imageWidth: 200,
                           imageHeight: 200,
                           confirmButtonText: 'OK'
                        });
                         setComment('')
                         refcomment.current.value="";
                        setIsLiked(false);
                        setIsDisliked(false);} 
                        else{
                        Swal.fire(res.data.message, "", "error");
                        setComment("")
                         }
                        }).catch((error) => {
                        console.log(error)
                        setComment("")});};

  return (
    <Modal show={props.show} size="lg" backdrop="static" centered>
        <Modal.Header >
             <FaUserCircle size={24} />
             <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control as="textarea" rows={6} placeholder="Write a comment..."  ref={refcomment} onChange={(e) => setComment(e.target.value.trim())} />
                    </Form.Group>
                    
                    <div className="ml-3">
                    {isLiked ? (
                        <AiFillLike size={24} className='m-2' color="red" onClick={handleLike} />
                    ) : (
                        <AiOutlineLike size={24} className='m-2' onClick={handleLike} />
                    )}
                    {isDisliked ? (
                        <AiFillDislike size={24} className='m-2' color="red" onClick={handleDislike} />
                    ) : (
                        <AiOutlineDislike size={24} className='m-2'onClick={handleDislike} />
                    )}

                        <div className="d-flex align-items-back">
                        <Button  disabled={isnotempty}  variant="primary" id="hello" type="submit" >Post Comment</Button> </div>
                    </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
            Close
            </Button>
        </Modal.Footer>
    </Modal>
  );
}

 
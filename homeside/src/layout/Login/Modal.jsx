import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ShowLoginPart } from './ShowLoginPart';
import {  Typography,} from '@mui/material'
import 'bootstrap/dist/css/bootstrap.min.css'; 


export default function ModalPage({Key,Changekey}) {
    console.log(Key);
    const [show, setShow] = useState(false);

    const handleClose = () =>{setShow(false) 
        console.log('workinh');
        document.body.style.overflow= 'inherit'; 
        } ;
    const handleShow = () => setShow(true);
    const [email,setEmail] =useState('')
    const ChangeEmail = (emil)=>{
    setEmail(emil)
    }
    const Heading =['Login or Signup','UserDetails','otpVerifaction','Mobno']

    return (
        <>
           
            <Typography textAlign="center" onClick={handleShow}> Login </Typography>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} style={{marginTop:'100px'}}>
                {/* <Modal.Header   style={{ textAlign: 'center',marginLeft:'50px' }} closeButton>
                    <Modal.Title style={{ margin: 'auto' }}>{Heading[Key]}</Modal.Title>
                </Modal.Header> */}
                <Modal.Body><ShowLoginPart  keyValue={Key} Changekey={Changekey} ChangeEmail={ChangeEmail} email={email} handleClose={handleClose}></ShowLoginPart>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

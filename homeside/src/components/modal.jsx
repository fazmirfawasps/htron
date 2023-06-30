// import React from 'react'
// import { Modal, } from 'react-bootstrap'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// // import { MuiOtpInput } from 'mui-one-time-password-input'
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { FcGoogle } from 'react-icons/fc'
// import SendIcon from '@mui/icons-material/Send';

// import Signin from './signin';
// import {
//   MDBContainer,
//   MDBInput,
//   // MDBCheckbox,
//   // MDBBtn,
//   // MDBIcon
// }
//   from 'mdb-react-ui-kit'
// import { auth } from '../firebase/firebase';
// import { useState } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// function ModalDialog() {
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handlePhoneNumberChange = (value,) => {
//     console.log(value);
//     setPhoneNumber(value);
//   }

//   const [showotp, setshowotp] = useState(true)

//   const [otp, setotp] = useState('')
//   const [confirm, setConfirm] = useState('')


//   // const [otp,setOtp] = useState('')
//   const sentotp = async () => {
//     try {
//       const recaptchaVerifier = await new RecaptchaVerifier('recaptcha', {}, auth)
//       const mob = '+' + phoneNumber
//       console.log(mob);
//       const confirmation = await signInWithPhoneNumber(auth, mob, recaptchaVerifier)
//       console.log('working');
//       setshowotp(!showotp)
//       console.log(confirmation);
//       setConfirm(confirmation)

//     }
//     catch (err) {
//       console.log(err);
//     }

//   }
//   const otpconfirm = (code) => {
//     console.log();
//     confirm.confirm(code).then((result) => {
//       // User signed in successfully.
//       // const user = result.user;
//       // ...
//       console.log(result);
//       initModal()
//       console.log('working otp succes');
//     }).catch((error) => {
//       // User couldn't sign in (bad verification code?)
//       console.log(error);
//       // ...
//     });


//   }

//   console.log(auth.currentUser);


//   const [isShow, invokeModal] = React.useState(false)
//   React.useEffect(() => {
//     if (isShow) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isShow]);
//   const initModal = () => {
//     return invokeModal(!isShow)
//   }
//   return (
//     <div>
//       <Typography textAlign="center" onClick={initModal}> Login </Typography>

//       {/* <Button variant="success" onClick={initModal}>
//         Open Modal
//       </Button> */}
//       <Modal show={isShow} style={{ marginTop: '0vw' }} >


//         {showotp ? <div><Modal.Header closeButton onClick={initModal} style={{ marginLeft: '130px' }}>
//           <Modal.Title  >Login or Signup</Modal.Title>
//         </Modal.Header><Modal.Body>
//             <MDBContainer className="p-3  d-flex flex-column w-90" button={false}
//               onKeyDown={e => e.stopPropagation()}>

//               {/* <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='phonr' onChange={(e) => { setPhone(e.target.value) }} /> */}
//               <div className="mb-4">
//                 <label htmlFor="phone-number">Phone Number:</label>
//                 <PhoneInput
//                   id="phone-number"
//                   country={'us'}
//                   value={phoneNumber}
//                   onChange={handlePhoneNumberChange}
//                   inputStyle={{ width: '435px' }}

//                 />
//               </div>
//               <Button variant="outlined" color='inherit' style={{ color: 'grey' }} onClick={sentotp}>
//                 sent otp<SendIcon style={{ marginLeft: '5px', color: 'grey' }} />
//               </Button>
//               {/* <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' />

//             <div className="d-flex justify-content-between mx-3 mb-4">
//               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
//               <a href="!#">Forgot password?</a>
//             </div> */}

//               {/* <MDBBtn className="mb-4" style={{ backgroundColor: 'red',transition:'none' }}>Sign in</MDBBtn> */}
//               <div id='recaptcha' ></div>

//               <div className="text-center ">

//                 <p>we will text your mobile  number to confirm<a href="#!">Register</a></p>
//                 <p>or sign up with:</p>



//               </div>
//               <Button variant="outlined" style={{ backgroundColor: 'black' }} >
//                 <FcGoogle style={{
//                   fontSize: 'x-large',
//                 }} />
//                 <Signin handleModal={initModal}></Signin>
//               </Button>
//               {/* <MDBBtn className="mb-4" style={{ backgroundColor: 'red' }}></MDBBtn> */}


//             </MDBContainer>
//           </Modal.Body></div> : <div><Modal.Header closeButton onClick={initModal} style={{ marginLeft: '130px' }}>
//             <Modal.Title  >ENTER YOUR OTP</Modal.Title>
//           </Modal.Header><Modal.Body button={false}
//             onKeyDown={e => e.stopPropagation()}>  <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={(e) => setotp(e.target.value)} /> <Button variant="outlined" color='inherit' style={{ color: 'grey' }} onClick={() => otpconfirm(otp)}>
//               sent otp<SendIcon style={{ marginLeft: '5px', color: 'grey' }} />
//             </Button></ Modal.Body></div>}

//         <Modal.Footer>
//           <Button variant="outlined" color="error" onClick={initModal}>
//             Close
//           </Button>
//           {/* <Button  variant="outlined" color="primary" onClick={initModal}>
//             Store
//           </Button> */}
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }
// export default ModalDialog
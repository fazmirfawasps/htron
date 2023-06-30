import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styled from '@emotion/styled';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const StyledComponent = styled.div`
  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
`;


export default function Modaldiv(props) {

  const [show, setShow] = useState(false);
  const [value, setValue] = useState('')

  const [edit, setEdit] = useState(false)
  const [file, setFile] = useState(null);
  const [imag, setImg] = useState(null)
  useEffect(() => {
    console.log('nthey vallathum nadanna');

    console.log(file);
  }, [file]);

  const showfile = () => {
    console.log(file);
  }
  

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);
    setFile(selectedFile);
    props.imageChange(event.target.files[0])

    console.log(file);
    showfile()

    const objectUrl = URL.createObjectURL(event.target.files[0]);
    setImg(objectUrl)
    // set the URL as the background image for the div

  };
//   if(props.id){
// console.log(props.id.image);
// setImg(props.id.image)
//     console.log('editil matram ullu');
//   }
useEffect(() => {
  if (props.id) {
    console.log(props.id.image);
    setImg(props.id.image);
    console.log('editil matram ullu');
  }
}, [props.id])

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   // send the formData object to the server
  // };

  console.log(props);
  
  const Close = () => { return setShow(false); }

  const handleClose = () => { setEdit(false); console.log('jnesdd'); console.log(value); console.log(file); props.onClick(); return setShow(false); }
  const handleShow = () => setShow(true);
  const onput = (e) => {
    if (props.id) {
      props.onChange(e.target.value, props.id._id)
      setEdit(true)
      setValue(e.target.value)

    }
    else {
      props.onChange(e.target.value)
      setValue(e.target.value)
    }
  }

  return (
    <StyledComponent>
      <Button variant="secondary" onClick={handleShow}>
        {props.id ? props.icon : props.data.title}
      </Button>

      <Modal show={show} onHide={Close} style={{ marginTop: '10vw' }}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              {props.id ? <Form.Control
                type="name"
                value={edit ? value : props.id.Category}

                onChange={onput}
              /> : <Form.Control
                type="name"
                value={value}

                onChange={onput}
              />}

              <p>{props.error ? props.error : ""}</p>

            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            {imag && (
              <img src={imag} style={{ width: '100px' }} alt="uploaded file preview" />
            )}
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={Close}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </StyledComponent>
  );
}
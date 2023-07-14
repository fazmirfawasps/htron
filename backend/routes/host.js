const express = require('express');
const router = express.Router();
const upload = require ('../multer/multer')
const adminHelpers = require('../helper/adminHelper')
const HostHelper = require('../helper/hostHelper');
const hostHelper = require('../helper/hostHelper');

// router.post('/addproperty', upload.array("image", 6),(req,res)=>{
//     console.log('working host');
//     console.log(req.files);
//     console.log(req.body);
//     console.log(req.body.images);
//     console.log(req.file);

// })

router.post('/addproperty', upload.array('images'), (req, res) => {
    console.log('working ui add');
    const formData = req.body; // Access the form fields sent in the request body
    console.log(formData);
  
    const images = req.files; // Access the uploaded files
    console.log(images);
    const filenames = images.map(file => file.filename);
    formData.imageFilenames = filenames
    console.log(formData);
  HostHelper.Addproperty(formData).then(()=>{
    res.status(200).json('ok')

  })
    // Perform operations with the received data
    // ...
  
    // res.status(200).json({ message: 'Property added successfully' });
  });
router.get('/getvehicleType',(req,res)=>{
    const url = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
    console.log(url);
    console.log('workd category');
  adminHelpers.findAllCategory().then((response)=>{
  console.log(response);
  res.status(200).json(response)
})})


router.post('/getHostedproperty',(req,res)=>{
    console.log('working of getHosted');
    console.log(req.body);
   
    HostHelper.GethostProperty(req.body).then((response)=>{
        const updatedResponse = response.map(item => {
            const updatedImageFilenames = item.imageFilenames.map(filename => {
              return `https://htron.site/api/images/${filename}`;
            });
            return { ...item, imageFilenames: updatedImageFilenames };
          });
       console.log(updatedResponse);
        res.status(200).json(updatedResponse)

    })
})


router.post('/EditHostedproperty',upload.array('images'),(req,res)=>{
  console.log( 'working of /EditHostedproperty');
  console.log(req.body);
  console.log(req.files);
  console.log(req.body.oldimage);
  let data ={}
  data.PropertyName =req.body.PropertyName
  data.Description=req.body.Description
  data.VehicleType=req.body.VehicleType
  data.Address = req.body.Address
  data.Price = req.body.Price
  data.Available = req.body.Available
  
  
  if(!req.files.length ==0){
  const matchedElements = req.body.oldimages.filter(element => req.body.images.includes(element));
  console.log(matchedElements);
  const modifiedUrls = matchedElements.map(url => url.substring("https:/htron.site/api/images/".length));
  console.log(modifiedUrls);
  req.files.map(file => {
    const modifiedFilename = file.filename
    modifiedUrls.push(modifiedFilename);
  });
  console.log(modifiedUrls);
  data.imageFilenames=modifiedUrls

}
hostHelper.editProperty(req.body.Propertid,data).then(()=>{
  console.log('working properlu');
  res.status(200).json('ok')

})
  

})
module.exports = router;
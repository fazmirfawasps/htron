// routes/controllers/userController.js

const userHelper = require('../helper/userHelper');
const hostHelper = require('../helper/hostHelper');
const stripe = require('stripe')('sk_test_51NHbVVSFTJEFvJs0Typp7VDhjfWWKzKoMHRWjalsTO0Tnmu0B4L5MbImMsNN8RGYqd1o74DvPlxPPz4veut5LPwe00Eg6pgAsi');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../jwt/jwt')
const getAllBookedDates = require('../Controllers/Logic');
const { Session } = require('express-session');
const BookingHelper =require('../helper/bookingHelpers')
const db =require('../helper/wishListHelper');
const wishListHelper = require('../helper/wishListHelper');
const bookingHelpers = require('../helper/bookingHelpers');
const conversationHelpers =require('../helper/conversationHelper')
const messageHelpers =require('../helper/messageHelper');
const { use } = require('../routes');

// Handle GET / route
exports.getIndex = (req, res, next) => {
    console.log(req.query);

    try {
        if (req.query.email) {
            console.log('working user /side');

            userHelper.addUser(req.query)
                .then((response) => {
                    console.log('acees token');
                    console.log(response);
                    console.log(response.details[0].Email);
                    
               const token = this.authenticateUser(response.details[0].Email,response.details[0]._id)
               console.log(token);
               response.details[0].token = token
                    res.json(response);
                })

                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: 'Failed to add user' });
                });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// handle refresh token
exports.authenticateUser= (user,id)=> {
    console.log('what');
    console.log(user);
    

   
        const accessToken = generateAccessToken(user,id);
        const refreshToken = generateRefreshToken(user,id);
        console.log(`${accessToken}hello${refreshToken}`);
        console.log('working');
       return({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    
},
exports.refresh = (req, res, next) => {
    console.log('refresh working');
    const refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided.' });
    }

    try {
        const user = verifyToken(refreshToken);
        const accessToken = generateAccessToken(user);

        res.status(200).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token.' });
    }
},
exports .authenticateToken =(req, res, next) =>{
    const authHeader = req.headers.authorization;
    console.log('authentoken');
    console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token);
        if (payload) {
            req.user = payload;
            next();
            return;
        }
    }
    res.sendStatus(401);
},




    // Handle POST /updateUser route
    exports.postUpdateUser = (req, res, next) => {
        console.log(req.body);

        userHelper.editUser(req.body)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Failed to update user' });
            });
    };

// Handle POST /checkMobNo route
exports.postCheckMobNo = (req, res, next) => {
    console.log(req.body);

    userHelper.checkNum(req.body)
        .then((response) => {
            res.json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to check mobile number' });
        });
};

// Handle GET /getAllproperty route
exports.getAllProperty = (req, res, next) => {
    userHelper.GetAllProperty()
        .then((response) => {
            const updatedResponse = response.map((item) => {
                const updatedImageFilenames = item.imageFilenames.map((filename) => {
                    return `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${filename}`;
                });
                return { ...item, imageFilenames: updatedImageFilenames };
            });
            console.log(updatedResponse);
            res.status(200).json(updatedResponse);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to get all properties' });
        });
};

// Handle DELETE /removeProperty/:id route
exports.deleteProperty = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    console.log('working delete');

    userHelper.removeProperty(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to remove property' });
        });
};
// Handle POST /hostdetails
exports.hostdetails = (req, res) => {
    console.log('hostdetails');
    console.log(req.body);
    let hostdetails = req.body;
    hostdetails.image = req.file.filename;
    hostdetails.Verified = false;
    hostHelper
        .AddHostdetails(hostdetails)
        .then((response) => {
            console.log(response);
            res.status(200).json();
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to add host details' });
        });
};
let SessionVerifyid = ''
// Handle POST /create-checkout-session
exports.createCheckoutSession = async (req, res) => {
    console.log('1000bbb');
    console.log(req.body);
    const {
        _id,
        PropertyName,
        hostid,
        Price,
        Address,
        checkin,
        checkOut,
        userid,
        totalAmount
    } = req.body.property;

    console.log(PropertyName);
    console.log(userid);
    console.log(Price);
    console.log(`helooo${checkin}`);
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: PropertyName,
                            description: Address,
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userid: userid,
                propertyId: _id,
                hostid,
                checkin,
                checkOut,
            },
            mode: 'payment',
            success_url: 'http://htron.site/success',
            cancel_url: 'http://htron.site/cancel',
        });
        console.log(session.url);
        const sessionData = req.session;

        // Access cookie data
        const cookieData = req.cookies;

        console.log('Session data:', sessionData);
        console.log('Cookie data:', cookieData)
        console.log('fazmire');
        req.session.verifyid = session.id;
        console.log(req.session.verifyid);
        console.log('fawas');
        console.log(session);
        SessionVerifyid = session.id

        res.status(200).json(session);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};

// Handle POST /placeOrder

exports.placeOrder = async (req, res) => {

    console.log('placeOrder');
    console.log(req.session.verifyid);
    console.log('fwas');

    try {
        const updatedSession = await stripe.checkout.sessions.retrieve(req.session.verifyid);
        req.session.verifyid =null
        console.log(updatedSession);
        const { propertyId, checkOut, checkin, hostid, userid } = updatedSession.metadata;

        const document = {
            propertyid: propertyId,
            hostid,
            userid,
            checkin: new Date(checkin),
            checkOut: new Date(checkOut),
            createdAt:new Date(),
            Paymentstatus: updatedSession.payment_status,
            totalprice: updatedSession.amount_total.toString().slice(0, -2),
            OrderStatus: 'Booking pending',
        };
        console.log(document);

          const unavailableDates = getAllBookedDates(checkin, checkOut);
          console.log(unavailableDates);
          userHelper.addUnavailableDates(propertyId, unavailableDates);
        BookingHelper.addBooking(document).then(()=>{

            setTimeout(() => {
                res.sendStatus(200);
              }, 3000);
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};
exports. getUserDetail= (req, res) => {
    console.log('working getauserdetail');
    console.log(req.params.id);

    userHelper.getauser(req.params.id)
      .then((user) => {
        // Handle the retrieved user details
        res.json(user);
      })
      .catch((error) => {
        // Handle any errors that occurred during the retrieval
        res.status(500).json({ error: 'An error occurred' });
      });}


exports.managewishlist=(req,res)=>{
    console.log(req.body);
    console.log('working whislis');
    try{
  wishListHelper.addWishlist(req.body).then(()=>{
    res.status(200).json('ok')

  })}
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
    
}
exports.removeFromWishlist=(req,res)=>{
    console.log('working  REMOVE whislis');
    try{
        wishListHelper.removeWishlist(req.params).then(()=>{
            res.status(200).json('ok')

        })
    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }

}

exports.getWishlist=(req,res)=>{
    try{
        console.log('working  getiing REMOVE whislis');
        wishListHelper.getWishlist(req.params.userid).then((respone)=>{
            res.status(200).json(respone)
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
   

}
exports.CancelBooking=async(req,res)=>{
    console.log(req.params.orderid)
    try{
        bookingHelpers.cancelBooking(req.params.orderid).then(()=>{
            res.status(200).json()
    
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);

    }
}
exports.addConverstaion = async(req,res)=>{

console.log(req.body);
conversationHelpers.addConversation(req.body).then(()=>{
    res.status(200).send('ok')

})
}
exports.getConversation = async(req,res)=>{

    console.log(req.params);
    console.log('working params');
    conversationHelpers.getAllConversation(req.params).then((resp)=>{
        res.status(200).send(resp)
  
    })
}

exports.addMessages = (req,res)=>{
console.log(req.body);

messageHelpers.addMessages(req.body).then((result)=>{
    res.status(200).json(result);

})
}
exports.getMessage=(req,res)=>{
    messageHelpers.getMessages(req.params.conversationid).then((response)=>{
        res.status(200).json(response);

    })
}
exports.editProfile=(req,res)=>{
    console.log('editprofile');
    console.log(req.body);
   const data  ={}
   data.FullName=req.body.FullName
   data.MobileNumber=req.body.MobileNumber
   userHelper.editProfile(req.body.id,data).then(()=>{
    res.status(200).json('ok')
   })
   
  }
module.exports = exports;

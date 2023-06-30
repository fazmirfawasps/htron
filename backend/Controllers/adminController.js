const { verify } = require('jsonwebtoken');
const adminHelpers = require('../helper/adminHelper');
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../jwt/jwt');
const bookingHelpers = require('../helper/bookingHelpers');


const admin = 'fazmir@gmail.com';
const password = 4640;

const adminController = {
    authenticateToken(req, res, next) {
        const authHeader = req.headers.authorization;
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

    refreshToken(req, res, next) {
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

    authenticateUser(req, res, next) {
        console.log('what');
        console.log(req.query);

        if (req.query.email == admin && req.query.pass == password) {
            const user = req.query;
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            console.log(`${accessToken}hello${refreshToken}`);
            console.log(req.query);
            console.log('working');
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        } else {
            res.status(400).json({ err: 'invalid user' });
        }
    },

    addCategory(req, res, next) {
        console.log(req.body);
        console.log(req.file);
        const image = `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${req.file.filename}`;
        console.log('addcategory');
        adminHelpers.addCategory(req.body.name, image)
            .then((response) => {
                console.log('ivde ethi');
                res.status(201).json();
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllCategories(req, res) {
        console.log(req.headers.authorization.split(' ')[1]);
        const url = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
        console.log(url);
        console.log('getCategories');
        adminHelpers.findAllCategory()
            .then((response) => {
                console.log(response);
                res.status(200).json(response);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    deleteCategory(req, res) {
        console.log('deletion');
        console.log(req.body);
        adminHelpers.deleteAcategory(req.body.id)
            .then(() => {
                adminHelpers.findAllCategory()
                    .then((response) => {
                        console.log('workingprop');
                        console.log(response);
                        res.json(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    editCategory(req, res) {
        console.log(req.body);
        console.log(req.file);
        const data={
            Category:'',
            image:''
        }
        if( req.body.Category ){
            data.Category = req.body.Category
        }
        else{
            data.Category = req.body.oldname
        }
        if(req.file){
          data.image =  `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${req.file.filename}`
        }
        else{
          data.image=req.body.old
        }
        console.log(data);
        adminHelpers.Editcategory(req.body.id, data)
            .then(() => {
                adminHelpers.findAllCategory()
                    .then((response) => {
                        console.log('workingprop');
                        console.log(response);
                        res.json(response);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllUsers(req, res) {
        console.log('working of get user');
        adminHelpers.getAlluser()
            .then((user) => {
                console.log(user);
                res.json(user);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    blockUser(req, res) {
        console.log(req.query);
        adminHelpers.blockUser(req.query.action, req.query.user)
            .then(() => {
                res.json();
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllPropertyList(req, res) {
        console.log('working of admin get all property');
        adminHelpers.GetAllProperty()
            .then((property) => {
                console.log(property);
                res.json(property);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAllHostDetails(req, res) {
        console.log('working of host detail get all property');
        adminHelpers.GetAllHostdetail()
            .then((property) => {
                console.log(property);
                res.json(property);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },

    getAHostDetail(req, res) {
        console.log(req.body);
        console.log('working of A host detail get all property');
        adminHelpers.GetAhostDetail(req.body)
            .then((property) => {
                console.log(property);
                property[0].image = `${req.protocol}://${req.hostname}:${req.socket.localPort}/images/${property[0].image}`;
                console.log(property);

                res.json(property);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ error: 'Internal server error' });
            });
    },


    verifyHostdetail: (req, res) => {
        console.log(req.query);
        console.log(req.body);
        console.log('woring of A host  VERIFY detail get all property');
        adminHelpers.verifyHost(req.body).then((response) => {
            res.status(200).json()
        })



    },

    getallOrders: (req, res) => {
        try {
            bookingHelpers.getAllorders().then((orders) => {
                res.status(200).json(orders)

            })
        }catch(err) {
            res.status(500).json({ error: 'Internal server error' });

        }
},

CancelBooking:async(req,res)=>{
    console.log(req.params.orderid)
    console.log('cancel booking admin sid');
    try{
        bookingHelpers.cancelBooking(req.params.orderid).then(()=>{
            res.status(200).json()
    
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);

    }
},
getallDashboard:async(req,res)=>{

console.log('dashBord')
let booking = await adminHelpers.totalBookingPerDay()
console.log(booking);
let nofp = await adminHelpers.totalNumberOfProperty()
console.log(nofp);
let moneyperweek= await adminHelpers.moneyGeneratedPerWeek()
console.log(moneyperweek);

let moneypToday= await adminHelpers.calculateTodayAmount()
let totalmoney = await adminHelpers.getTotalBookingAmount()

const data ={}   
data.totalBookingPerDay = booking
data.moneyGeneratedPerWeek = moneyperweek
data.totalNumberOfProperty=nofp
data.TodayAmount= moneypToday
data.totalAmount = totalmoney
console.log(data);
res.status(200).json(data)
 
},
deleteProperty : (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    console.log('working delete');

    adminHelpers.removeProperty(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Failed to remove property' });
        });
}

        
};

module.exports = adminController;

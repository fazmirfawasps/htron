const { response } = require('../app');
const db = require('../config/connection')
const { ObjectId } = require('mongodb');
module.exports = {
    addUser: (user) => {


        return new Promise(async (resolve, reject) => {
            console.log('1st');
            const isUser = await db.get().collection('user').find({ Email: user.email }).toArray()
            console.log(isUser);
            if (isUser.length != 0) {
                console.log('2st');
                const res = {
                    details: isUser,
                    data: true
                }
                resolve(res)
            }
            else {
                console.log('3st');
                db.get().collection('user').insertOne({
                    Email: user.email,
                    block: false
                }).then(async(response) => {
                    console.log('1st');
                    const isUser = await db.get().collection('user').find({ Email: user.email }).toArray()
                    console.log(isUser);
                    if (isUser.length != 0) {
                        console.log('2st');
                        const res = {
                            details: isUser,
                            data: false
                        }
                        resolve(res)
                    }
                })
            }

        })


    }
    ,
    editUser: (user) => {
        return new Promise(async (resolve, reject) => {
            const isNumexisted = await db.get().collection('user').find({ MobileNumber: user.MobileNumber }).toArray()
            console.log(isNumexisted);
            if (isNumexisted.length != 0) {

                resolve(true)
            }
            else {
                console.log('num undonn check');
                db.get().collection('user').updateOne({ Email: user.email }, { $set: { FullName: user.FullName, MobileNumber: user.MobileNumber } })
                resolve(false)

            }


        })
    }
    ,
    checkNum: ({ MobileNumber }) => {
        return new Promise(async (resolve, reject) => {
            const isNumexisted = await db.get().collection('user').find({ MobileNumber: MobileNumber }).toArray()
            console.log(isNumexisted);
            if (isNumexisted.length != 0) {
                console.log('2st');

                resolve(isNumexisted)
            }
            else {
                console.log('3st');
                resolve(false)

            }

        })


    },
    getauser: (id) => {
        return new Promise(async (resolve, reject) => {
            const user = await db.get().collection('user').find({ _id: new ObjectId(id) }).toArray()
            console.log(user);
            resolve(user)

        })

    },
    GetAllProperty: () => {

        console.log('whowwww');
        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList')
                .find()
                .toArray()
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    console.error('Error querying MongoDB:', error);
                    reject(error);
                });
        })

    },

    removeProperty: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList').deleteOne({ _id: new ObjectId(id) }).then((respone) => {
                    const filter = {
                        wishlist: id
                    }

                    const update = {
                        $pull: { wishlist: id }
                    };
                    db.get().collection('WishList').updateMany(filter, update).then(() => {
                        resolve(respone)
                        console.log('delered wishlist from ');

                    })
                    console.log(respone);
                })
        }
        )
    }
    , addUnavailableDates: (id, dates) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection('PropertyList').updateOne(
                    { _id: new ObjectId(id) },
                    { $addToSet: { NotAvailable: { $each: dates } } }
                ).then((response) => {
                    console.log(response);
                })
        }
        )
    }
    , editProfile: (id, data) => {

        return new Promise((resolve, reject) => {
            db.get().collection('user').updateOne({ _id: new ObjectId(id) }, { $set: data })
            resolve(false)
        })
    }

}
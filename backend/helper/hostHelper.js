const db = require('../config/connection')
const { ObjectId } = require('mongodb');
module.exports = {

  Addproperty: (Data) => {

    console.log('evde eyhi');
    return new Promise((resolve, reject) => {
      db.get().collection('PropertyList').insertOne(Data).then((response) => {
        console.log(response);
        resolve()
      })
    })



  },

  GethostProperty: ({ hostid }) => {
    console.log(hostid)

    const id = hostid

    return new Promise((resolve, reject) => {
      db.get()
        .collection('PropertyList')
        .find({ hostid: id })
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

  GetAhostProperty: ({ Propertid }) => {
    console.log(Propertid)
    console.log('evde ethi');

    return new Promise((resolve, reject) => {
      db.get()
        .collection('PropertyList')
        .find({ _id: new ObjectId(Propertid) })
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
  AddHostdetails: (Data) => {

    const hostid =Data.hostid
    return new Promise((resolve, reject) => {
      db.get().collection('HostDetails').insertOne(Data).then((response) => {
        console.log(response);
      }).then(() => {

        db.get().collection('user').updateOne(
          { _id: new ObjectId(hostid) },
          { $set: { Hostapplied: true } }
        ).then((response) => {
          console.log(response)
          resolve()
        })
      })
    })
  },

  editProperty:(id,data)=>{

    return new Promise((resolve, reject) => {
      db.get().collection('PropertyList').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      ).then((response) => {
        console.log(response)
        resolve()
      })
    })
  }


}
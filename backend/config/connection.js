// const MongoClient=require("mongodb")

// module.exports.connect=function(done){
//     console.log('ommbi');
//     const url='mongodb+srv://fazmirfawas:fazmirfawasps%405354@cluster0.peuhz9z.mongodb.net/?retryWrites=true&w=majority'
//     const dbname="heavyVehicle"
// console.log(url+dbname);
//     MongoClient.connect(url,(err,data)=>{
//         console.log('working');
//         if (err)  return done(err)
//         state.db=data.db(dbname)
//         done()
//     })
   
// }


const { MongoClient } = require('mongodb');
const state={
    db:null
}


const uri = 'mongodb+srv://fazmirfawas:fazmirfawasps%405354@cluster0.peuhz9z.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri);
 module.exports. connectToMongo =async function (done) {
  try {
    await client.connect();
    const db = client.db('heavyvehicle')
    console.log('Connected to MongoDB database');
   
    state.db =db
    done()
  } catch (err) {
    console.error(err);
  }
}
module.exports.get=function(){
    return state.db
}



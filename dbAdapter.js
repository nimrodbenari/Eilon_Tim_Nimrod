var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://EilonChabner:TimNimrodEilon1@cluster0.2978k.mongodb.net/test";
const client = new MongoClient(url);


async function SendUser(name,email,hashedPassword){
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const haiku = database.collection("customers");
    // create a document to insert
    const doc = { user_name: name, Email: email,password:hashedPassword }
    const result = await haiku.insertOne(doc);
    console.log(`A customer was inserted with the _id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


exports.sendUser = SendUser;

// async function main(){
//   try {
//       // Connect to the MongoDB cluster
//       await client.connect();

//       // func body

//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

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

async function insertProduct(productname,productprice,quantity,category){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("Products");
      // create a document to insert
      const doc = { product_name: productname, product_price: productprice,Quantity : quantity,Category : category}
      const result = await haiku.insertOne(doc);
      console.log(`A products was inserted `);
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}

async function checkUser(name,hashedPassword){
    let result;
    let titel;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const haiku = database.collection("customers");
    // create a document to insert
    const doc = { user_name: name,password:hashedPassword}
    result = await haiku.find(doc);
    console.log(`A customer was founded with the name: ${doc.user_name}`);
    } catch (e) {
        console.error(e);
        console.log(`A customer was'nt found`);
    } finally {
        await client.close();
    }
    return result;
}

exports.sendUser = SendUser;
exports.checkUser = checkUser;
exports.insertProduct = insertProduct;

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

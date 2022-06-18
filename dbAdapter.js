const bcrypt = require('bcrypt');

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

async function checkUser(name,password){
    let user;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const collection = database.collection("customers");
    // create a document to insert
    const doc = { user_name: name};
    user = await collection.findOne(doc);
    console.log(user);
    if (bcrypt.compare(password,user.password)){
        return user.user_name;
    } else {
        console.log(`password or username wrong`);
        return "";
    }
    // console.log(`A customer was founded with the name: ${doc.user_name}`);

    } catch (e) {
        console.error(e);
        console.log(`A customer was'nt found`);
    } finally {
        await client.close();
    }
}


async function getProducts(){
    let result;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

    const database = client.db("WaterSportCenter");
    const collection = database.collection("Products");
    // create a document to insert
     result = await collection.find({}).toArray();

    // console.log(`A customer was founded with the name: ${doc.user_name}`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return result;
}

async function getOrders(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        const database = client.db("WaterSportCenter");
      const collection = database.collection("Products");
      // create a document to insert
      const result = await collection.find({}).toArray();
      console.log(result);
  
      // console.log(`A customer was founded with the name: ${doc.user_name}`);
  
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
  }
exports.getProducts = getProducts;
exports.getOrders = getOrders;
exports.sendUser = SendUser;
exports.checkUser = checkUser;
exports.insertProduct = insertProduct;

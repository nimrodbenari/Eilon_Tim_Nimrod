const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://EilonChabner:TimNimrodEilon1@cluster0.2978k.mongodb.net/test";
const client = new MongoClient(url);

//---------- user managment section-----------------------
async function SendUser(name,email,rolle,hashedPassword){
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const haiku = database.collection("customers");
    // create a document to insert
    const doc = { user_name: name, Email: email,rolle:rolle,password:hashedPassword }
    const result = await haiku.insertOne(doc);
    console.log(`A customer was inserted with the _id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function checkUser(name,password){
    let result = false;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const collection = database.collection("customers");
    // create a document to insert
    const doc = {user_name: name};
    user = await collection.findOne(doc);
    if (bcrypt.compare(password,user.password)){
        console.log('password is correct')
        result = true;
    } else {
        console.log(`password or username wrong`);
    }
    console.log(`A customer was founded with the name: ${doc.user_name}`);
    } catch (e) {
        console.error(e);
        console.log(`A customer was'nt found`);
    } finally {
        await client.close();
    }
    
    return result;
    
}
async function sendNewsEmail(email){
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("newsletterUsers");
      // create a document to insert
      const doc = {Email: email}
      const result = await haiku.insertOne(doc);
      console.log(`A email was inserted `);
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
  }
//---------- products managment section-----------------------
async function insertProduct(productname,productprice,quantity,category,url){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("Products");
      // create a document to insert
      const doc = {model: productname, price: productprice,quantity: quantity,category: category,img: url}
      let result = await haiku.insertOne(doc);
      console.log(doc);
      } catch (e) {
          console.error(e);
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

async function updateQuantity(productmodel,quantity){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("Products");
    
    let unitInStock = await haiku.findOne({model: productmodel});
    let updateQuan = parseInt( unitInStock.quantity);
    updateQuan-=quantity;
    let result = await haiku.updateOne({model: productmodel}, {$set: {quantity:updateQuan }});
     
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}
//---------- orders managment section-----------------------
async function getOrders(){
    let result;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

    const database = client.db("WaterSportCenter");
    const collection = database.collection("orders");
    // create a document to insert
     result = await collection.find({}).toArray();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    return result;
}

async function insertOrder(order){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("orders");
    
      // create a document to insert
      const doc = order;
      let result = await haiku.insertOne(doc);
      let model = doc.productmodel;
      let quantity =  doc.quantity;
      await updateQuantity(model,quantity);
     
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}

async function updateStatus(id){
    var date = new Date(Date.now()).toLocaleString().split(',')[0]
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("orders");
      console.log('step 3:  ' + id)
    await haiku.updateOne({_id:ObjectId(id)}, {$set: {status:'Supplied',deliverDate: date}});
     console.log('order updated')
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}


async function newContact(Name,Email,Subject,Message){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("contactUs");
      // create a document to insert
      const doc = {Name: Name, Email: Email,Subject: Subject,Message: Message}
      let result = await haiku.insertOne(doc);
      console.log(doc);
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}

//----------  exports section-----------------------
exports.getProducts = getProducts;
exports.getOrders = getOrders;
exports.sendUser = SendUser;
exports.checkUser = checkUser;
exports.insertProduct = insertProduct;
exports.insertOrder = insertOrder;
exports.updateQuantity= updateQuantity;
exports.updateStatus= updateStatus;
exports.sendNewsEmail= sendNewsEmail;
exports.newContact= newContact;

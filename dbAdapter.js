const bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://EilonChabner:TimNimrodEilon1@cluster0.2978k.mongodb.net/test";
const client = new MongoClient(url);

//---------- user managment section-----------------------
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
async function checkUser(name,password){
    let user;
  try {
      // Connect to the MongoDB cluster
      await client.connect();

      const database = client.db("WaterSportCenter");
    const collection = database.collection("customers");
    // create a document to insert
    const doc = {user_name: name};
    user = await collection.findOne(doc);
    console.log(user);
    if (bcrypt.compare(password,user.password)){
        console.log('password is correct')
    } else {
        console.log(`password or username wrong`);
        return "";
    }
    console.log(`A customer was founded with the name: ${doc.user_name}`);

    } catch (e) {
        console.error(e);
        console.log(`A customer was'nt found`);
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

async function updateQuantity(productmodel){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("Products");
    
    let unitInStock = await haiku.findOne({model: productmodel});
    let updateQuan = parseInt( unitInStock.quantity);
    updateQuan-=1;
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

async function insertOrder(productmodel,customername,shipingaddres,phonenumber,email,cardnumber,cvv,expire,status){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("orders");
    
      // create a document to insert
      const doc = {Productmodel:productmodel,Customer_name:customername, shiping_addres:shipingaddres, phone_number:phonenumber,Email:email, card_number:cardnumber, Cvv:cvv,Expire:expire, Status:status};
      
      let result = await haiku.insertOne(doc);
     
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
}

async function updateStatus(id){
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const database = client.db("WaterSportCenter");
      const haiku = database.collection("orders");
      console.log('step 3:  ' + id)
    let result = await haiku.updateOne({_id:id}, {$set: {Status:'Supplied'}});
     
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


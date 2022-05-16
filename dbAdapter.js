var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://EilonChabner:TimNimrodEilon1@cluster0.2978k.mongodb.net/test";


var whatTodoNext = function(err, db) {
    if (err) throw err;
    var dbo = db.db("WaterSportCenter");
    var myobj = { Product: "shnorkel", price: "100" };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    }

function SendUser(name,email,hashedPassword) {
  var dbo = db.db("WaterSportCenter");
  var myobj = { user_name: name, Email: email,password:hashedPassword };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 customer inserted");
    db.close();
  });
}
  

MongoClient.connect(url, whatTodoNext);
MongoClient.connect(url, SendUser);
exports.sendUser = SendUser;


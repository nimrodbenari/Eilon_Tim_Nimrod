var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://EilonChabner:TimNimrodEilon1@cluster0.2978k.mongodb.net/test";


var whatTodoNext = function(err, db) {
    if (err) throw err;
    var dbo = db.db("Products");
    var myobj = { name: "Nimrod", Age: "29" };
    dbo.collection("Products2").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
    }




MongoClient.connect(url, whatTodoNext);
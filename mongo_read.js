var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/facebook_rgpvhub';

var LIMIT = 20;
var insertDocument = function( collection ,va , db, callback) {
   db.collection("coll_mix").update( {id : va.id} ,  va , {upsert : true}, function(err, result) {
  console.log("Entered");
    callback(result);

    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection." + collection);
    callback(result);
  });
};


var getDocument = function( collection ,p_key , db, callback) {

console.log( p_key ==-1)
if(p_key == -1)
{
console.log("NULL PKEY")
    db.collection('coll_mix').find( {} , {picture : 1 , full_picture: 1 , caption : 1 , name: 1}).sort({_id: 1}).limit(1).toArray(  function(err ,doc) {

  db.close();

if(err!=null)
{
callback(-1)

}
else
     callback(doc)
  });
}
else
{
  console.log("PKEY " + p_key)
    db.collection('coll_mix').find( {_id :{ $gt : new ObjectId(p_key)  } } , {picture : 1 , full_picture: 1,caption : 1 , name: 1}).limit(LIMIT).toArray(  function(err ,doc) {
        db.close();
if(err!=null)
{
callback(-1)
}
else
     callback(doc)
  });

  }






};



var mention = function( collection ,va , db, callback) {
   db.collection(""+collection).find( {}  ,function(err, result) {
    assert.equal(err, null);
   console.log(result);
    callback(result);
  });
};


exports.insert  =function insert(coll , va)
{
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  insertDocument(coll , va,db, function() {
      db.close();
  });
});
}

exports.REST  =function REST(coll , va)
{
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err  );

  getDocument(coll , va,db, coll);
});
}


var findDet = function(db, callback) {
   var cursor =db.collection('coll_9gag').find( {} );


  cursor.toArray(function(err, items) {
     if(err)
     	callback("[]")
else
 callback(items);

        db.close();
      });



};


var express = require("express");

var fs = require('fs');


var app = express();

app.get("/" , function(req, res){

 res.write('<html><head></head><body>');

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);



findDet(db , function(rr) { 
	console.log("" + rr);


rr.forEach(function(a){



	res.write("<img src="+a.picture+"/>");
})

res.end('</body></html>');


  } );

 // mention("rgpvhub" , "va",db, function(resu) {
     
  //	res.write( JSON.stringify(resu));

  
});




    


});








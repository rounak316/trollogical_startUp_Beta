var MongoClient = require('mongodb').MongoClient;
var assert = require('assert')
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/facebook_rgpvhub';


var insertDocument = function( collection ,va , db, callback) {
   db.collection("coll_mix").update( {id : va.id} ,  va , {upsert : true}, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection." + collection);
    callback(result);
  });
};


var getDocument = function( collection ,va , db, callback) {



  var cursor =db.collection('coll_mix').find( {} );
cursor.each(function(err, doc) {
     // assert.equal(err, null);
      if (doc != null) {
      callback(doc)
      } else {
         callback(null);
      }
   });


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








var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
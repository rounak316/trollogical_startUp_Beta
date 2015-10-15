var express = require("express");

var ins = require('./mongo_read.js');

var fs = require('fs');


var app = express();



app.get('/getTroll', function (req, res) {

p_key = req.param('Primary_key')

console.log(p_key)

 res.setHeader('Content-Type', 'application/json');

	ins.REST( function(data){ 

if(data==-1)
{
var respy = {};
respy.data = data;
respy.msg =200
 res.send(respy);
	// RETRY
}
else
{
	var respy = {};
respy.data = data;
respy.msg =400
	 res.send(respy);
}

	

	  } , p_key);

 
});


app.use(express.static('private'));





var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



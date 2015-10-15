var graph = require('fbgraph');



var ins = require('./mongo_insert.js')


 graph.setAccessToken("1672139283014584|87eaed75718a47d9392fbb1f35ecedf3");



var PAGE = "Radioonelebanon";





 // graph.extendAccessToken({
 //        "client_id":      "1672139283014584"
 //      , "client_secret":  "87eaed75718a47d9392fbb1f35ecedf3"
 //    }, function (err, facebookRes) {
 //       console.log(   facebookRes );
 //    });



graph.get(PAGE +"?fields=feed{full_picture,name,caption,picture}" , function(err, res2) {
if(err)
{
console.log("Shait happened "  + err.message);
	return;
}

    console.log(res2.feed.data.length); // { id: '4', name: 'Mark Zuckerberg'... }
 
var pass = res2.feed;
for ( var i = 0 ; i < pass.data.length ; i++)

	ins.insert(PAGE  , pass.data[i]);
repeatTask(pass);

  });



function repeatTask(pass)
{
 if(pass.paging && pass.paging.next)
 {

 graph.get(pass.paging.next, function(err, res) {
      // page 2
      

      if(err)
{
console.log("Shait happened "  + err.message);
	return;
}

    console.log(res.data); 

   

 for ( var i = 0 ; i < res.data.length ; i++)
 	 ins.insert(PAGE , res.data[i]);


repeatTask(res);
    });



}

}






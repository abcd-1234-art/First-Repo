/*const square = {
	area : (a) => (a*a),
	parameter : (a) => (4*a)
 }*/

 const square = require('./square.js');

const cal = (a) => { 
    console.log(`value ${a} and square parameter is ` + square.parameters(a) +
      ` value ${a} and square area is `+ square.area(a));
 }

 cal(5);

 const http = require('http');

 const fs = require('fs');
 const path = require('path');

	const hostname = "localhost";
	const port  =  5000;

	const server = http.createServer((req, res)  => {

		/*console.log(req.headers);*/

		console.log('request for' +req.url + 'by method ' + req.method);

   if(req.method == 'GET') {
   	var fileURL;
   	if(req.url == '/') {
   		fileURL = "/index.html"
   	} else {
   		fileURL = req.url
   	}
  var filePath = path.resolve('./public'+fileURL);

  const fileExt = path.extname(filePath);

  if (fileExt == '.html') {
  	fs.exists(filePath, (exists) => {
  		if(!exists) {
  			res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('<html> <body> <h1> error 404:' + fileURL+ ' does not exists </h1></body> </html>');
	
  		}

  		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
  	  fs.createReadStream(filePath).pipe(res);

  	})

  } else {
  	res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('<html> <body> <h1> error 200:' + fileURL + ' not html file </h1></body> </html>');

  }

   } else {
res.statusCode = 404;
		res.setHeader('Content-Type', 'text/html');
		res.end('<html> <body> <h1> error 404:' + fileURL + ' not suported </h1></body> </html>');
   }

	});
	
    server.listen(port, hostname, ()=> {
	   console.log(`server running at http://${hostname}:${port}`);
	});

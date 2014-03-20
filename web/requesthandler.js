var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var bs = require('./basic-server.js');
var qs = require('querystring');
// require more modules/folders here!

var postUrl = function(req, res, callback){
  var body ='';
  req.on('data', function (data){
    body+= data;
  });
  req.on('end', function(){
    var input = qs.parse(body);
    callback(input);
  });
};



exports.handleRequest = function (req, res) {
  // console.log(bs.sites);
  // console.log(req);




  res.writeHead(200);
  if (req.url === '/'){
    if (req.method === 'POST') {
      postUrl(req, res, function(data) {
        console.log(bs.sites[data.url]);
        console.log(data);
        if (bs.sites[data.url]) {
          fs.readFile('../archives/sites/www.google.com', function(error, dat) {
            if (!error) {
              console.log('send this back', dat);
              res.writeHead(200, 'Content-Type: text/html');
              res.end(dat);
            }
          });
        }
      });
    }
    //serve the index
    fs.readFile('./public/index.html', function(error, data) {
      if (!error) {
        res.end(data);
      }
    });
  }
  else if (req.url === '/styles.css') {
    fs.readFile('./public/styles.css', function(error, data) {
      if (!error) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  }
  else if (bs.sites[req.url]){
    /*do stuff*/
    // If we do, retrieve and serve relevant file
    console.log('request made for things');
    fs.readFile('../archives/sites/www.google.com', function(error, data) {
      if (!error){
        res.end(data);
      }
    });
  }
  else {
    res.writeHead(404);
    res.end();
  }
  //res.end(archive.paths.list);
};



// Get url from request
// Check if we have that url stored
// If not, go scrap site
// Discard bad input

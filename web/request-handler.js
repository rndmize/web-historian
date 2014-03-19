var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var bs = require('./basic-server.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log(bs.sites);
  res.writeHead(200);
  if (req.url==='/'){
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
    fs.readFile('./archives/sites/www.google.com', function(error, data) {
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

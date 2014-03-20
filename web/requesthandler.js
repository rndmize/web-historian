var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var bs = require('./basic-server.js');
var qs = require('querystring');
// require more modules/folders here!

var postUrl = function(req, res, callback){
  console.log('PostURL...');
  var body ='';
  req.on('data', function (data){
    body+= data;
  });
  req.on('end', function(){
    var input = qs.parse(body);
    callback(input);
  });
};


var getReq = function(req, res) {
  console.log('GetReq...');
  if (req.url === '/'){
    fs.readFile('./public/index.html', function(error, data) {
      if (!error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
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
};

var postReq = function(req, res){
  console.log('PostReq...')
  postUrl(req, res, function(data) {
    if (bs.sites[data.url]) {
      fs.readFile('../archives/sites/' + data.url, function(error, dat) {
        if (!error) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(dat);
        }
      });
    } else {
  //    scrape and write
     bs.sites[data.url] = true;
      fs.writeFileSync('../archives/sites.json', JSON.stringify(bs.sites));
    }
  });
};

var router = function(req, res) {
  console.log('Routing...');
  if (req.method === 'GET'){
    getReq(req, res);
  } else if (req.method === 'POST'){
    postReq(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
};

exports.handleRequest = function (req, res) {
  console.log(req.method, req.url);
  router(req, res);

};



// Get url from request
// Check if we have that url stored
// If not, go scrap site
// Discard bad input

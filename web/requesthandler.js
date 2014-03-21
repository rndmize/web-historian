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
    // fs.readFile('./public/index.html', function(error, data) {
    //   if (!error) {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end(data);
    //   }
    // });
    endReq('./public', '/index.html', res);
  }
  else if (req.url === '/styles.css') {
    fs.readFile('./public/styles.css', function(error, data) {
      if (!error) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
    // endReq('./public', req.url, res);
  } else if (req.url === '/loading.html') {
    endReq('./public', req.url, res);
  }
};

var postReq = function(req, res){
  var sites = JSON.parse(fs.readFileSync('../archives/sites.json'));
  postUrl(req, res, function(data) {
    if (sites[data.url]) {
      endReq('../archives/sites/', data.url, res);
    } else {
      console.log('scrape/write/redirect');
      res.writeHead(302,  { 'Location': 'loading.html' });
      res.end();
      if (sites[data.url] === undefined) {
        sites[data.url] = false;
        fs.writeFileSync('../archives/sites.json', JSON.stringify(sites));
      }
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

var endReq = function(location, reqUrl, res){
  fs.readFile(location + reqUrl, function(error, data){
    if (!error){
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
  return res;
}

exports.handleRequest = function (req, res) {
  console.log(req.method, req.url);
  router(req, res);
};


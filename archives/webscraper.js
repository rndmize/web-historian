// var util = require('util');
// var pro = require('child_process').exec;
// var bs = require('./basic-server.js');
var fs = require('fs');
var request = require('request');

var sites = JSON.parse(fs.readFileSync('./sites.json'));

// for (var i in sites){
//   var results = pro('ls');
//   console.log(results);
  // if (sites[i]===false){
  //   console.log(i);
  //   console.log(sites[i]);
  //   pro.spawn('wget', sites[i]);
  //   var args = ['index.html', 'sites/' + sites[i]];
  //   pro.spawn('mv', args);
  //   sites[i]=true;
  // }
// }

for (var i in sites) {
  if (sites[i] === false) {
    request('http://' + i, function(err, res, body) {
      console.log(err, res);
      fs.writeFileSync('./sites/' + i, body);
    });
    sites[i] = true;
    fs.writeFileSync('./sites.json', JSON.stringify(sites));
  }
}


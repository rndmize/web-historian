var fs = require('fs');
var request = require('request');

var sites = JSON.parse(fs.readFileSync('./sites.json'));


console.log(sites);
console.log(typeof sites);
for (var i in sites) {
  console.log('i an i ', i);
  if (sites[i] === false) {
    (function(address) {
      request('http://' + address, function(err, res, body) {
        console.log(address);
        fs.writeFile('./sites/' + address, body, function(){
          console.log('write file complete ', address);
        });
      });
    }(i));
    sites[i] = true;
    fs.writeFileSync('./sites.json', JSON.stringify(sites));
  }
}


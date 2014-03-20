var http = require('http');
var handler = require('./requesthandler');
var fs = require('fs');

var sites = JSON.parse(fs.readFileSync('../archives/sites.json'));
exports.sites = sites;

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);







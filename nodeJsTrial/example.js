var express = require('express');
var util = require('util')
var https = require('https')
var app = express();

var hostname = 'api.github.com';
var userAgent = 'GHLgh-MarkItDown'

app.get('/echo/:user/:repo/:file', function (req, res) {
    var filePath = util.format('repos/%s/%s/contents/%s',req.params.user,req.params.repo,req.params.file);
    var options = {
        host : hostname,
        path : filePath,
        headers : {
            'User-Agent' : userAgent,
            'content-type': 'application/json'
        }
    };
    console.log(options);
    var bodyChunks = [];
    var body;
    var gitReq = https.get(options, function(res){
        /*res.on('data', function(chunk) {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', function() {
        var body = Buffer.concat(bodyChunks);
        console.log('BODY: ' + body);
        // ...and/or process the entire body here.
      })*/
        res.on('data', function(data){
            console.log(data)
        });
        body = res;
    });

    gitReq.on('error',function(e){
        console.log('ERROR: ' + e.message);
    });
    res.send(body);
})

app.post('/merge', function(req, res){
    res.send("undefined");

}
)

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
   
    console.log("Example app listening at http://%s:%s", host, port)
})

var express = require('express');
var util = require('util')
var https = require('https')
var app = express();

var hostname = 'api.github.com';
var userAgent = 'GHLgh-MarkItDown'

app.get('/echo/:user/:repo/:file', function (req, res) {
    var filePath = util.format('/repos/%s/%s/contents/%s',req.params.user,req.params.repo,req.params.file);
    var options = {
        host : hostname,
        path : filePath,
        headers : {
            'User-Agent' : userAgent,
        }
    };

    console.log(options);
    var bodyChunks = [];
    var body = '';
    var gitReq = https.request(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function(data){
            body += data;
            //bodyChunks.push(data);
        }).on('end', function() {
        //body = JSON.parse(body);
        console.log('BODY: ' + body);
        // ...and/or process the entire body here.
      });
    });

    gitReq.on('error',function(e){
        console.log('ERROR: ' + e.message);
        //console.log(options)
    });
    gitReq.end();
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

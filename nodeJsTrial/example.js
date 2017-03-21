var express = require('express');
var util = require('util')
var https = require('https')
var app = express();

var hostname = 'api.github.com';
var userAgent = 'GHLgh-MarkItDown'

app.get('/echo/:user/:repo/:file', function (req, res) {
    var sendContent = function(content){
       res.send(content);
    }

    var content = getContentFromGitHub(req.params.user,req.params.repo,req.params.file, sendContent);
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

function getContentFromGitHub(user, repo, file, callback){
    var filePath = util.format('/repos/%s/%s/contents/%s',user,repo,file);
    var options = {
        host : hostname,
        path : filePath,
        headers : {
            'User-Agent' : userAgent,
        }
    };

    console.log(options);
    var rawBody = '';
    var body = null;
    var gitReq = https.request(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function(data){
            rawBody += data;
        }).on('end', function() {
        body = JSON.parse(rawBody);
        console.log(body);
        var content = Buffer.from(body.content,'base64').toString();
        callback(content);
      });
    });

    gitReq.on('error',function(e){
        console.log('ERROR: ' + e.message);
    });
    gitReq.end();
}

function generateContent(content, callback){


}

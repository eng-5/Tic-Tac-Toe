var http = require('http');
 fs = require('fs');
 serveStaticFile=(res,path, contentType,statusCode)=>{
     if(!statusCode) statusCode=200;
     fs.readFile(__dirname+path ,function(err,data){
        if(err){
            res.writeHead(400, {'content-type':'text/plain'});
            res.end('400 - Internal Error');
        }else{
            res.writeHead(statusCode,{'content-type' : contentType});
            res.end(data);
        }
     });
 }
http.createServer((req,  res)=>{
    var path=req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case "":serveStaticFile(res,"/index.html",'text/html',200)
                break;
        case "/about":serveStaticFile(res,"/about.html",'text/html',200)
                break;
        case "/contact":serveStaticFile(res,"/contact.html",'text/html',200)
                break;
    }
}).listen(3000);
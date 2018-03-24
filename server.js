const http = require('http');
const url = require('url');
const server = http.createServer(function (req,res) {

    /*url = localhost:4000?name=sandeep*/

    /*get the url*/
    console.log(req.url); // /?name=sandeep

    const parseUrl = url.parse(req.url,true);
    console.log(parseUrl);//is having many properties: query, path, pathname, hostname, port
    /*get the path*/
    /*get the query param*/
    /*get the req param*/
    /*get the HTTP verb*/
    console.log(req.method);
    /*get header as object*/
    console.log(req.headers);

    res.end('Thanks curl');
});

server.listen(4000, function () {
    console.log('listening at 4000');
});


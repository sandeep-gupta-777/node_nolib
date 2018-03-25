const http = require('http');
const url = require('url');
const qs = require('querystring');
const server = http.createServer(function (req,res) {

    /*url = localhost:4000?name=sandeep*/

    /*get the url*/
    console.log(req.url); // /?name=sandeep

    const parseUrl = url.parse(req.url,true);
    console.log(parseUrl);//is having many properties: query, path, pathname, hostname, port
    let pathname = parseURL.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');
    let method = req.method;
    let queryParamsObject = parseUrl.query;

    console.log(req.method, req.headers, req.body);

    /*following is one way to parse the request*/
    let tempBodyStr  = "";
    let body;

    /*We are able to look for data and end events because req is an instance of ReadableStream interface*/
    req
        .on('data', function (data) {//chunk emitted everytime is a BUFFER
        tempBodyStr  += data;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (tempBodyStr.length > 1e6) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
        }
    })
        .on('end', function () {

        console.log(tempBodyStr); //name=sandeep1
        body = qs.parse(tempBodyStr);
        console.log(body); //{name:sandeep}
        let tempChosenHandler = typeof handlers[trimmedPath] ==!undefined? handlers[trimmedPath]: handlers['notfound'];
        tempChosenHandler(incomingdata, function (statuscode, outgoingPayload) {


            statuscode = statuscode?undefined:200;
            res.writeHead(statuscode);
            res.end(outgoingPayload);
        });
    })
        .on('error', (err) => {
        // This prints the error message and stack trace to `stderr`.
        console.error(err.stack);
    });

    res.end('Thanks curl');
});

//this is controller
const handlers= {};

let sample = function (data, callback) {
    let statuscode =  200;
    callback(statusCode, data);
};
let notfound = function (data, callback) {
    let statusCode =  404;
    callback(statusCode, data);
};

let router = {
  sample,
  notfound
};

server.listen(5000, function () {
    console.log('listening at 5000');
});


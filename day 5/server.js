

const http = require('http');


const server = http.createServer((req, res) => { // this line set the content type to html 

    res.setHeader(`Content-type`, `text/html`);

    if (req.url === "/") {
                              // htis line of code handle different routes
        res.writeHead(200);

        res.end(`<h1>Home Page <h1><p> Welcome to our website </p>`);

    }
    else if (req.url === `/about`) {

        res.writeHead(200);

        res.end(`<h1>About Page <h1><p> We are a company that  does amazing things </p>`);


    }
    else if (req.url === `/contact`) {

        res.writeHead(200);

        res.end(`<h1>Contact Us <h1><p> email us at: contact@company.com </p>`);

    }

    else {

        res.writeHead(404);

        res.end(`<h1>404 Not Found <h1><p>this page you requested does not exist </p>`);

    }
    
});

const port = 3000;

server.listen(port, () => {

    console.log(`Server is running at http://localhost:${port}/`);
   // this excuted server h1 is running at http://localhost:3000 run to the node server.js
});
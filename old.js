const http = require('http'); // ES5
//import http from 'http'; // ES6

const server = http.createServer(function (req, res) {
        console.log('Request received from client!');
        console.log(req);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(greet('Carlos'));
    }
);

server.listen(3000, () => {
    console.log('Listening on port 3000');
})
//Arrow functions
//function greet() {
//    return 'Hello World from Greet method';
//}
//Arrow function V1
//const greet = () => {
//    return 'Hello World from Greet arrow method';
//}

//Arrow function V2. Si lo único que hace mi funcion es retornar algo, puedo omitir las llaves y el return
//const greet = (name) => 'Hello' + name + ' World from Greet arrow simplified method';

//Arrow function V3. Si mi funcion solo recibe un parametro, puedo omitir los parentesis
const greet = name => 'Hello ' + name + ' World from Greet arrow simplified method';
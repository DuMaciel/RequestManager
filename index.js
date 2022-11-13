const path = require('path')
const URL = require('url')
const fs = require('fs')
const http = require('http');
const hostname = '127.0.0.1';
port = 3000;

// const { exec } = require('child_process');
// let mensagem = req.url.slice('?', req.url.length);
// exec(`cowsay ${mensagem}\n`, (err, std, stderr) => {
//   res.end(std);
// });

const prepareResponse = (req,res) => {
  const url =  URL.parse(req.url).pathname
  if(url == '/'){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    let html = fs.readFileSync('public/index.html','utf-8')
    res.end(html)
  }else{
    fs.access('.'+url, fs.constants.F_OK, (err) => {
      if(err){
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Erro!</h1>');
      }else{
        res.statusCode = 200;
        res.setHeader('accept-ranges', 'bytes')
        let resposta = fs.readFileSync('.'+url)
        res.end(resposta);
      }
    })
  }};


const server = http.createServer(prepareResponse);

server.listen(port, hostname,() => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


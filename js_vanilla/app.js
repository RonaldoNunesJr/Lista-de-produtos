const express = require('express');
const path = require('path');
const app = express();

app.use('/files', express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res){
    res.sendFile(path.normalize(__dirname + '/public/data/products.json'));
});

app.listen('3000', function(){
    console.log('servidor escutando na porta 3000...');
});


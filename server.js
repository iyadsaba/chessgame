

const utils = require('./utils');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))


let jsonParser = bodyParser.json();
let movieOptions = [];


app.use(express.static(__dirname + '/chess'));


app.post('/dragStart',jsonParser, (req, res) => {
    const start = req.body.start;
    const name = req.body.name;
    movieOptions = utils.getOptions(start, name);
    res.send({movieOptions})
});


app.post('/dragend',jsonParser, (req,res)=>{
    const end = req.body.end;
    if(movieOptions.indexOf(end) > -1){
    res.json({isValidMove : true , end : end})
    }else { 
        res.json({isValidMove : false , end : end})
    }
});


app.listen(3000);

console.log('Running at Port 3000');
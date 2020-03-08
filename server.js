

const utils = require('./utils');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))


let jsonParser = bodyParser.json();
let movieOptions = [];


app.use(express.static(__dirname + '/chess'));


app.post('/dragStart',jsonParser, (req, res) => {
    let start = req.body.start;
    let type = req.body.name;
    console.log(`type : ${type}`)
    console.log(`start : ${start}`)
    movieOptions = utils.getOptions(start, type);
    res.send({movieOptions})
});


app.post('/dragend',jsonParser, (req,res)=>{
    if(movieOptions.indexOf(req.body.end) > -1){
    res.send({isValid : true})
    }else { 
        res.send({isValid : false})
    }
});


app.listen(3000);

console.log('Running at Port 3000');


const utils = require('./utils');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))


let jsonParser = bodyParser.json();


app.use(express.static(__dirname + '/chess'));


app.post('/claculateValidMoves',jsonParser, (req, res) => {
    const start = req.body.start;
    const name = req.body.name;
    utils.movieOptions = utils.getOptions(start, name);
    res.send({movieOptions :utils.movieOptions});
});


app.post('/validateCurrentPosition',jsonParser, (req,res)=>{
    const end = req.body.end;
    if(utils.movieOptions.indexOf(end) > -1){
    res.json({isValidMove : true , end : end})
    }else { 
        res.json({isValidMove : false , end : end})
    }
    utils.movieOptions  = [];
});


app.listen(3000);

console.log('Running at Port 3000');
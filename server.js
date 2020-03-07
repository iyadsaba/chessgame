
// import {Board} from '/board'
// import { format } from 'url';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }))


const path = require('path');
var jsonParser = bodyParser.json()

// const router = express.Router();

app.use(express.static(__dirname + '/chess'));
app.use(express.static(__dirname + '/chess'));




// const board = require('./board');
// let chessBoard = new board();
// chessBoard.addPiece({name :'Knight' , type : '&#9822;'},{x : 0 ,y:1 });


// app.get('/getdata', (req, res) => {
//     // res.json(chessBoard.board);
// });


app.get('/allowdrag', (req, res) => {
    res.json({ m: "test" });
});

app.get('/geteventdata', (req, res) => {
    console.log('severside');
    console.log(req);
    res.send({ data: 'event data object' })

});

app.post('/setposition',jsonParser, (req,res)=>{
    let options = getOptions(req.body.start);
    if(options.indexOf(req.body.end) > -1){
    res.send({isValid : true})
    }else { 
        res.send({isValid : false})
    }
    function getOptions(index){
        let x = Math.floor(index / 8);
        let y = index % 8;
        return getKnightOptions(x,y);
    }

    function getKnightOptions(x,y){
        let options = [];
        let knightRoles = [[2,1], [2,-1] , [-2,1] , [-2,-1] ,[1,2],[1,-2] , [-1,2] ,[-1,-2]];
        for(let role of knightRoles){
            tmpX = x  + role[0];
            tmpY = y + role[1];
            if(tmpX < 8 && tmpX >-1  && tmpY < 8 && tmpY> -1){
                let option = tmpX * 8  + tmpY;
                options.push(option)
            }
        }
        return options;
    }
});


app.listen(3000);

console.log('Running at Port 3000');
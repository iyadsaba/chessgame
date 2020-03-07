import { Board } from './chessBoard';
let Draggable = require('Draggable');
const axios = require('axios');

let chessBoard = new Board();
chessBoard.renderBoard();
chessBoard.addPiece(('&#9822;'), 1);


//API Calls 
//------------------------------------------


axios.get('/allowdrag').then(response => {
    console.log("allowdrag response ")
}).catch(error => {
    console.log(error);
});


//drag settings 
//-------------------------------------------------
let element = document.querySelector(".chessboard>div>div");
let option = {
    limit: document.querySelector("main"),
    onDragStart: startDragHandler,
    onDragEnd: endDragHandler,
    smoothDrag: true
}
let draggableElement = new Draggable(element, option);

let index = { 
    start : 0,
    end : 0
}

let position = {
    x: 0,
    y: 0
}
const board = document.querySelector(".chessboard");
const squares = [...board.children];

//events handler
//---------------------------------------------
function startDragHandler(element, x, y, event) {
    position.x = x;
    position.y =  y;
    const piece = event.target;
    index.start= getIndex(squares,piece);

}

function endDragHandler(element, x, y, event) {
    let piece = event.target;
     index.end = getIndex(squares,piece);
    axios.post('/setposition',index).then((response) => {
        if(!response.data.isValid){
            draggableElement.set(position.x,position.y);
        }
    })
}


//Helper Functions 
//---------------------------------------------------
function getIndex(squares, piece) {
    let index = -1;
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        let xDiff = Math.abs(square.offsetLeft - piece.offsetLeft);
        let yDiff = Math.abs(square.offsetTop - piece.offsetTop);
        if (isWrapper(xDiff,yDiff)) {
            index = i;
            break;
        }
    }

    function isWrapper(xDiff,yDiff){
        return (xDiff <= 40) && (yDiff <= 40) ;
    }
    return index;
}


//---------------------------------------------




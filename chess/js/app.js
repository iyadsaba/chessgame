import { Board } from './chessBoard';
let Draggable = require('Draggable');
const axios = require('axios');

let chessBoard = new Board();
chessBoard.renderBoard();
chessBoard.addPiece(('&#9822;'), 1, 'Knight');


//API Calls 
//------------------------------------------


// axios.get('/allowdrag').then(response => {
//     console.log("allowdrag response ")
// }).catch(error => {
//     console.log(error);
// });


//drag settings 
//-------------------------------------------------
let element = document.querySelector(".chessboard>div>div");
let option = {
    limit: document.querySelector("main"),
    onDragStart: startDragHandler,
    onDragEnd: endDragHandler,
}
let draggableElement = new Draggable(element, option);


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
    position.y = y;
    const piece = event.target;
    const start = getIndex(squares, piece);
    const name = piece.getAttribute('name');
    axios.post('/dragStart', { start, name }).then((response) => {
        console.log('dragStart', response.data)
    });
}

function endDragHandler(element, x, y, event) {
    let piece = event.target;
    const end = getIndex(squares, piece);
    axios.post('/dragend', { end }).then((response) => {
        console.log('dragEnd', response.data)
        if (!response.data.isValidMove) {
            resetPosition();
        }
    });
}


//Helper Functions 
//---------------------------------------------------
function getIndex(squares, piece) {
    let index = -1;
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        let xDiff = Math.abs(square.offsetLeft - piece.offsetLeft);
        let yDiff = Math.abs(square.offsetTop - piece.offsetTop);
        if (isWrapper(xDiff, yDiff)) {
            index = i;
            break;
        }
    }
    return index;
}

function isWrapper(xDiff, yDiff) {
    return (xDiff <= 40) && (yDiff <= 40);
}
function resetPosition() {
    draggableElement.set(position.x, position.y);
}

//---------------------------------------------




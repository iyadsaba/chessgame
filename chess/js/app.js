import { Board } from './chessBoard';
import { Piece } from './piece';

//render Board + Global variables 
//-------------------------------------------
let chessBoard = new Board();
chessBoard.renderBoard();

let pieceObj = {
    type : '&#9822;',
    position : 1,
    name : 'Knight'
}
// let pieceObj2 = {
//     type : '&#9822;',
//     position : 10,
//     name : 'Knight'
// }
const board = chessBoard.getBoardElement();
const piece = new Piece(`.piece${pieceObj.position}`,'main' , chessBoard , pieceObj);


// const piece2 = new Piece(`.piece${pieceObj2.position}`, 'main' , chessBoard , pieceObj2);
